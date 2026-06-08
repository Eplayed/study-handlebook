# 数据来源策略

本项目目标是做一个可持续维护的小学学习手册。数据来源要真实、轻量、可追溯。

## 推荐来源

### 上海智慧教育平台·空中课堂

- 入口：https://basic.sh.smartedu.cn/airclassroom/
- 用途：同步课程视频、课时学习入口、官方资源链接。
- 建议保存方式：只保存入口链接、年级、学科、课时标题、对应课文和考点关系。
- 不建议：批量下载视频或把视频资源提交到 Git。

### SteveTDX/shanghai_textbooks

- 仓库：https://github.com/SteveTDX/shanghai_textbooks
- 用途：上海教材目录、教材文件下载入口、教材版本核对。
- 建议保存方式：只抽取当前需要的目录、单元、课文/章节标题和复习映射。
- 不建议：把整套 PDF 教材提交到 Git。全量教材体积很大，也有版权和仓库体积问题。

### 国家中小学智慧教育平台电子教材

- 语文三年级下册页面：https://basic.smartedu.cn/tchMaterial/detail?contentType=assets_document&contentId=8e107655-5128-451f-84e5-d158725c537b&catalogType=tchMaterial&subCatalog=dzjc&page=7
- 教材标题：义务教育教科书·语文三年级下册。
- 本地保存：`/Users/zhangyajun/Documents/学习/语文/教材/三年级下册_国家中小学智慧教育平台`
- 用途：核对目录、课文名称、页码、精读/略读标记。
- 不建议：把教材图片或合成 PDF 提交到 GitHub。

## 项目内应该保存什么

- 年级、学期、学科。
- 单元和课文/章节标题。
- 每课的知识要点、中心思想和高频考试要点。
- 错题、错因、订正方法，以及它关联到哪一课、哪一个高频考点。
- 本地错题来源说明。
- 官方课程或教材的来源链接。

## 项目内不应该保存什么

- 大量教材 PDF。
- 视频文件。
- 未经整理的 OCR 全文。
- 无来源的网上试卷合集。

## 当前数据结构

当前已经拆成模块化数据：

- `src/data/content.js`：总入口，组合年级和学科。
- `src/data/helpers.js`：创建课文和考点的小工具。
- `src/data/grade3/chinese.js`：三年级语文。
- `src/data/grade3/math.js`：三年级数学。
- `src/data/grade3/english.js`：三年级英语。

四年级内容增加时，新增 `src/data/grade4/`，保持同样结构。

## 本地资料增量索引

本地原始资料放在 `/Users/zhangyajun/Documents/学习/`，包括教材 PDF、作业照片、答案和老师笔记。原始资料不提交到 GitHub。

在 `study-handbook` 目录运行：

```bash
npm run index:learning
```

脚本会生成 `.local/learning-assets-index.json`。这个文件被 Git 忽略，只在本机使用。第一次运行时所有文件都会显示为 `new`；以后新增作业或老师笔记后再次运行，只需要查看 `new` 和 `changed` 文件，再整理对应错题和知识点关联。

可用环境变量切换资料路径：

```bash
LEARNING_ROOT=/Users/zhangyajun/Documents/学习 npm run index:learning
```
