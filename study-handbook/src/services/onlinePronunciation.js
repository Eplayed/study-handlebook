const cache = new Map();

const wikimediaFallbacks = {
  room: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/En-us-room.ogg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:En-us-room.ogg",
    licenseName: "CC BY-SA 3.0"
  },
  sports: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/En-us-sports.ogg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:En-us-sports.ogg",
    licenseName: "CC BY-SA 4.0"
  }
};

export async function findOnlinePronunciation(term) {
  const key = term.trim().toLowerCase();
  if (!key) return null;
  if (cache.has(key)) return cache.get(key);

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
    if (!response.ok) {
      const fallback = wikimediaFallbacks[key] || null;
      cache.set(key, fallback);
      return fallback;
    }
    const entries = await response.json();
    const phonetic = entries.flatMap((entry) => entry.phonetics || []).find((item) => item.audio && item.sourceUrl);
    if (!phonetic) {
      const fallback = wikimediaFallbacks[key] || null;
      cache.set(key, fallback);
      return fallback;
    }

    const pronunciation = {
      url: phonetic.audio.startsWith("//") ? `https:${phonetic.audio}` : phonetic.audio,
      sourceUrl: phonetic.sourceUrl,
      licenseName: phonetic.license?.name || ""
    };
    cache.set(key, pronunciation);
    return pronunciation;
  } catch {
    const fallback = wikimediaFallbacks[key] || null;
    cache.set(key, fallback);
    return fallback;
  }
}

export async function findOnlinePronunciations(term) {
  const direct = await findOnlinePronunciation(term);
  if (direct) return [direct];

  const words = term
    .replace(/…|\.\.\./g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, ""))
    .filter(Boolean);

  if (words.length < 2) return [];

  const pronunciations = await Promise.all(words.map((word) => findOnlinePronunciation(word)));
  return pronunciations.filter(Boolean);
}
