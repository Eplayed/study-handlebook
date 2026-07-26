const pronunciationCache = new Map();

function normalizeTerm(term) {
  return term.trim().replace(/\s+/g, " ");
}

export function findOnlinePronunciations(term, { sentence = false } = {}) {
  const text = normalizeTerm(term);
  if (!text) return [];

  const cacheKey = `${sentence ? "sentence" : "word"}:${text}`;
  if (pronunciationCache.has(cacheKey)) return pronunciationCache.get(cacheKey);

  // Word and sentence endpoints are split because the dictionary endpoint rejects long sentences.
  const pronunciations = sentence
    ? [{
      url: `https://fanyi.baidu.com/gettts?lan=en&spd=3&source=web&text=${encodeURIComponent(text)}`,
      sourceUrl: "https://fanyi.baidu.com/",
      label: "国内句型音源",
      licenseName: ""
    }]
    : [{
      url: `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(text)}`,
      sourceUrl: `https://www.youdao.com/result?word=${encodeURIComponent(text)}&lang=en`,
      label: "国内快速音源",
      licenseName: ""
    }];

  pronunciationCache.set(cacheKey, pronunciations);
  return pronunciations;
}
