import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultLearningRoot = "/Users/zhangyajun/Documents/学习";
const learningRoot = process.env.LEARNING_ROOT || defaultLearningRoot;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputDir = path.join(projectRoot, ".local");
const outputFile = path.join(outputDir, "learning-assets-index.json");
const supportedExts = new Set([".pdf", ".jpg", ".jpeg", ".png", ".webp", ".heic", ".json"]);
const ignoredNames = new Set([".DS_Store"]);

function inferSubject(relativePath) {
  const [subject] = relativePath.split(path.sep);
  return subject || "未分类";
}

function inferCategory(relativePath) {
  if (relativePath.includes(`${path.sep}教材${path.sep}`)) return "textbook";
  if (relativePath.includes(`${path.sep}作业${path.sep}`)) return "homework";
  if (relativePath.includes(`${path.sep}错题${path.sep}`)) return "wrong-question";
  if (relativePath.includes(`${path.sep}答案${path.sep}`)) return "answer";
  if (relativePath.includes(`${path.sep}老师笔记${path.sep}`)) return "teacher-note";
  if (relativePath.includes(`${path.sep}练习卷${path.sep}`)) return "worksheet";
  return "other";
}

async function sha1(filePath) {
  const buffer = await readFile(filePath);
  return createHash("sha1").update(buffer).digest("hex");
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredNames.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!supportedExts.has(ext)) continue;
    files.push(fullPath);
  }

  return files;
}

async function readPreviousIndex() {
  try {
    return JSON.parse(await readFile(outputFile, "utf8"));
  } catch {
    return { files: [] };
  }
}

function buildPreviousMap(previousIndex) {
  return new Map((previousIndex.files || []).map((item) => [item.relativePath, item]));
}

function summarize(files) {
  const summary = {
    total: files.length,
    bySubject: {},
    byCategory: {},
    byStatus: {}
  };

  for (const item of files) {
    summary.bySubject[item.subject] = (summary.bySubject[item.subject] || 0) + 1;
    summary.byCategory[item.category] = (summary.byCategory[item.category] || 0) + 1;
    summary.byStatus[item.status] = (summary.byStatus[item.status] || 0) + 1;
  }

  return summary;
}

const previousIndex = await readPreviousIndex();
const previousMap = buildPreviousMap(previousIndex);
const filePaths = await walk(learningRoot);
const indexedFiles = [];

for (const filePath of filePaths) {
  const fileStat = await stat(filePath);
  const relativePath = path.relative(learningRoot, filePath);
  const hash = await sha1(filePath);
  const previous = previousMap.get(relativePath);
  const status = !previous ? "new" : previous.sha1 === hash ? "known" : "changed";

  indexedFiles.push({
    relativePath,
    absolutePath: filePath,
    subject: inferSubject(relativePath),
    category: inferCategory(relativePath),
    ext: path.extname(filePath).toLowerCase(),
    size: fileStat.size,
    mtimeMs: Math.round(fileStat.mtimeMs),
    sha1: hash,
    status
  });
}

indexedFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath, "zh-Hans-CN"));

const index = {
  version: 1,
  learningRoot,
  generatedAt: new Date().toISOString(),
  summary: summarize(indexedFiles),
  files: indexedFiles
};

await mkdir(outputDir, { recursive: true });
await writeFile(outputFile, `${JSON.stringify(index, null, 2)}\n`, "utf8");

const changed = indexedFiles.filter((item) => item.status !== "known");
console.log(`Indexed ${indexedFiles.length} files from ${learningRoot}`);
console.log(`New or changed files: ${changed.length}`);
for (const item of changed.slice(0, 20)) {
  console.log(`- [${item.status}] ${item.relativePath}`);
}
if (changed.length > 20) {
  console.log(`...and ${changed.length - 20} more`);
}
console.log(`Wrote ${outputFile}`);
