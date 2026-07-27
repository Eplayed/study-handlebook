import { grade4EnglishStudy } from "../src/data/grade4/english.js";

const errors = [];
const allWords = grade4EnglishStudy.units.flatMap((unit) => unit.words);
const wordIds = new Set();
const expectedWordCounts = [16, 10, 19, 14, 14, 13, 15, 18, 14, 16];
const expectedSentences = [
  ["Where's Xiaopu?", "On the sports field.", "教材第10-11页"],
  ["Who is helpful in Shenshen’s class?", "Xiaopu always helps teachers clean the blackboard.", "教材第18-19页"],
  ["Look, what are they doing?", "The elephant family are playing in the river.", "教材第26-27页"],
  ["What will they say?", "It's a tradition to read parents' letters at our group birthday party.", "教材第34-35页"],
  ["Is there a museum here?", "Yes, there is.", "教材第42-43页"],
  ["What did Shenshen and her classmates find about autumn?", "Look, how beautiful the leaves are!", "教材第50-51页"],
  ["How often do you have sandwiches?", "Two or three times a week.", "教材第58-59页"],
  ["What happened?", "You should tell her about it, anyway.", "教材第66-67页"],
  ["What time is it?", "It's seven o'clock.", "教材第72-73页"],
  ["How's the weather in Shanghai today?", "It's cold and rainy.", "教材第82-83页"]
];

for (const word of allWords) {
  if (!word.id || !word.english || !word.meaning) errors.push(`词汇资料不完整：${word.id || "未命名词汇"}`);
  if (wordIds.has(word.id)) errors.push(`词汇 ID 重复：${word.id}`);
  wordIds.add(word.id);
}

if (allWords.length !== 149) errors.push(`词汇总数应为 149，当前为 ${allWords.length}`);
if (grade4EnglishStudy.units.length !== 10) errors.push(`单元数应为 10，当前为 ${grade4EnglishStudy.units.length}`);

for (const unit of grade4EnglishStudy.units) {
  const index = grade4EnglishStudy.units.indexOf(unit);
  if (unit.words.length !== expectedWordCounts[index]) errors.push(`${unit.title} 的教材词汇数应为 ${expectedWordCounts[index]}，当前为 ${unit.words.length}`);
  const item = unit.sentence;
  if (!item?.prompt || !item?.response || !item?.sourcePage) errors.push(`${unit.title} 的句型缺少提示、答案或教材页码`);
  const filledResponse = `${item?.before || ""}${item?.answer || ""}${item?.after || ""}`;
  if (filledResponse !== item?.response) errors.push(`${unit.title} 的填空无法拼出标准答案`);
  const expected = expectedSentences[index];
  if (expected && [item?.prompt, item?.response, item?.sourcePage].some((value, itemIndex) => value !== expected[itemIndex])) {
    errors.push(`${unit.title} 的句型与教材核对记录不一致`);
  }
}

const wordsByUnit = new Map(grade4EnglishStudy.units.map((unit) => [unit.id, new Set(unit.words.map((word) => word.english))]));
for (const word of ["worker", "land"]) {
  if (!wordsByUnit.get("g4-en-u6").has(word)) errors.push(`Unit 6 缺少教材词汇：${word}`);
}
for (const word of ["the moon", "night"]) {
  if (wordsByUnit.get("g4-en-u8").has(word)) errors.push(`Unit 8 不应包含 Unit 9 词汇：${word}`);
  if (!wordsByUnit.get("g4-en-u9").has(word)) errors.push(`Unit 9 缺少教材词汇：${word}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${grade4EnglishStudy.units.length} units, ${allWords.length} textbook words, and ${grade4EnglishStudy.units.length} textbook sentence exercises.`);
