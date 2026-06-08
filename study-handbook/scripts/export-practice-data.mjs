import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mathSubject } from "../src/data/grade3/math.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputDir = path.join(projectRoot, "public", "practice");
const outputFile = path.join(outputDir, "math-practice.json");

const payload = {
  title: "三年级数学相似题练习",
  updatedAt: new Date().toISOString().slice(0, 10),
  sets: mathSubject.practiceSets
};

await mkdir(outputDir, { recursive: true });
await writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${path.relative(projectRoot, outputFile)}`);
