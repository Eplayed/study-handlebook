import { grade4EnglishStudy } from "../src/data/grade4/english.js";

const errors = [];
const allWords = grade4EnglishStudy.units.flatMap((unit) => unit.words);
const wordIds = new Set();

for (const word of allWords) {
  if (!word.id || !word.english || !word.meaning) errors.push(`词汇资料不完整：${word.id || "未命名词汇"}`);
  if (wordIds.has(word.id)) errors.push(`词汇 ID 重复：${word.id}`);
  wordIds.add(word.id);
}

if (allWords.length !== 147) errors.push(`词汇总数应为 147，当前为 ${allWords.length}`);
if (grade4EnglishStudy.units.length !== 10) errors.push(`单元数应为 10，当前为 ${grade4EnglishStudy.units.length}`);

for (const unit of grade4EnglishStudy.units) {
  const item = unit.sentence;
  if (!item?.prompt || !item?.response || !item?.sourcePage) errors.push(`${unit.title} 的句型缺少提示、答案或教材页码`);
  const filledResponse = `${item?.before || ""}${item?.answer || ""}${item?.after || ""}`;
  if (filledResponse !== item?.response) errors.push(`${unit.title} 的填空无法拼出标准答案`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${grade4EnglishStudy.units.length} units, ${allWords.length} words, and ${grade4EnglishStudy.units.length} sentence exercises.`);
