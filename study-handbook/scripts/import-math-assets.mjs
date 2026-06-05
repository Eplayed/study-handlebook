import { copyFile, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const sourceRoots = [
  {
    type: "practice",
    typeLabel: "练习卷答案",
    root: "/Users/zhangyajun/Documents/学习/数学/练习卷"
  },
  {
    type: "teacher-note",
    typeLabel: "老师笔记",
    root: "/Users/zhangyajun/Documents/学习/数学/老师笔记"
  }
];

const outputRoot = path.join(projectRoot, "public/generated/math");
const manifestPath = path.join(outputRoot, "resources.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const manualKnowledgeMap = [
  {
    match: /IMG_0907|IMG_0908/i,
    knowledgeId: "perimeter-area",
    tags: ["周长", "面积", "固定周长", "正方形面积最大"]
  }
];

function isImage(filePath) {
  return imageExtensions.has(path.extname(filePath).toLowerCase());
}

function toDateFromPath(filePath) {
  const match = filePath.match(/20\d{2}[_-]\d{2}[_-]\d{2}/);
  return match ? match[0].replaceAll("_", "-") : "未标日期";
}

function safeSegment(value) {
  return value
    .normalize("NFKC")
    .replace(/[^\w.\-\u4e00-\u9fa5]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function classify(filePath) {
  const hit = manualKnowledgeMap.find((rule) => rule.match.test(filePath));
  return {
    knowledgeId: hit?.knowledgeId || "unclassified",
    tags: hit?.tags || ["待归类"]
  };
}

async function collectFiles(root) {
  const results = [];

  async function walk(current) {
    let entries = [];
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch (error) {
      console.warn(`跳过不存在的目录：${current}`);
      return;
    }

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else if (entry.isFile() && isImage(entryPath)) {
        results.push(entryPath);
      }
    }
  }

  await walk(root);
  return results;
}

async function run() {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  const resources = [];

  for (const source of sourceRoots) {
    const files = await collectFiles(source.root);

    for (const filePath of files) {
      const fileStat = await stat(filePath);
      const date = toDateFromPath(filePath);
      const fileName = path.basename(filePath);
      const safeName = safeSegment(fileName) || `asset-${resources.length + 1}${path.extname(fileName)}`;
      const targetRelative = path.posix.join(
        "generated/math",
        source.type,
        date,
        `${String(resources.length + 1).padStart(3, "0")}-${safeName}`
      );
      const targetPath = path.join(projectRoot, "public", targetRelative);
      const { knowledgeId, tags } = classify(filePath);

      await mkdir(path.dirname(targetPath), { recursive: true });
      await copyFile(filePath, targetPath);

      resources.push({
        id: `${source.type}-${date}-${resources.length + 1}`,
        subjectId: "math",
        type: source.type,
        typeLabel: source.typeLabel,
        date,
        title: `${source.typeLabel} ${date} ${fileName}`,
        fileName,
        sourcePath: filePath,
        assetUrl: `/${targetRelative}`,
        knowledgeId,
        tags,
        sizeKb: Math.round(fileStat.size / 1024)
      });
    }
  }

  resources.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.fileName.localeCompare(b.fileName);
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    sources: sourceRoots.map((source) => ({
      type: source.type,
      typeLabel: source.typeLabel,
      root: source.root
    })),
    resources
  };

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`已导入 ${resources.length} 个数学资料图片。`);
  console.log(`清单文件：${manifestPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
