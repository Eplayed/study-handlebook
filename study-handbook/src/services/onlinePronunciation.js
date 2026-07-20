const cache = new Map();

export async function findOnlinePronunciation(term) {
  const key = term.trim().toLowerCase();
  if (!key) return null;
  if (cache.has(key)) return cache.get(key);

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
    if (!response.ok) return null;
    const entries = await response.json();
    const phonetic = entries.flatMap((entry) => entry.phonetics || []).find((item) => item.audio && item.sourceUrl);
    if (!phonetic) return null;

    const pronunciation = {
      url: phonetic.audio.startsWith("//") ? `https:${phonetic.audio}` : phonetic.audio,
      sourceUrl: phonetic.sourceUrl,
      licenseName: phonetic.license?.name || ""
    };
    cache.set(key, pronunciation);
    return pronunciation;
  } catch {
    return null;
  }
}
