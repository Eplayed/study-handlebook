const pronunciationCache = new Map();

function normalizeTerm(term) {
  return term.trim().replace(/\s+/g, " ");
}

export function findOnlinePronunciations(term) {
  const text = normalizeTerm(term);
  if (!text) return [];

  if (pronunciationCache.has(text)) return pronunciationCache.get(text);

  // A single regional request avoids the previous dictionary lookup and word-by-word queue.
  const pronunciations = [{
    url: `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(text)}`,
    sourceUrl: `https://www.youdao.com/result?word=${encodeURIComponent(text)}&lang=en`,
    label: "国内快速音源",
    licenseName: ""
  }];

  pronunciationCache.set(text, pronunciations);
  return pronunciations;
}
