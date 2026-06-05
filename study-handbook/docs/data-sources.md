# 数据来源策略

本项目目标是做一个可持续维护的小学学习手册。数据来源要真实、轻量、可追溯。

## 推荐来源

### 上海智慧教育平台·空中课堂

- 入口：https://basic.sh.smartedu.cn/airclassroom/
- 用途：同步课程视频、课时学习入口、官方资源链接。
- 建议保存方式：只保存入口链接、年级、学科、课时标题、对应复习卡关系。
- 不建议：批量下载视频或把视频资源提交到 Git。

### SteveTDX/shanghai_textbooks

- 仓库：https://github.com/SteveTDX/shanghai_textbooks
- 用途：上海教材目录、教材文件下载入口、教材版本核对。
- 建议保存方式：只抽取当前需要的目录、单元、课文/章节标题和复习映射。
- 不建议：把整套 PDF 教材提交到 Git。全量教材体积很大，也有版权和仓库体积问题。

## 项目内应该保存什么

- 年级、学期、学科。
- 单元和课文/章节标题。
- 考点卡。
- 例题、答案、易错提醒。
- 本地错题来源说明。
- 官方课程或教材的来源链接。

## 项目内不应该保存什么

- 大量教材 PDF。
- 视频文件。
- 未经整理的 OCR 全文。
- 无来源的网上试卷合集。

## 后续可迭代的数据结构

可以把 `content.js` 拆成：

- `src/data/grades.js`
- `src/data/subjects/math-grade3.js`
- `src/data/resources/official-links.js`
- `src/data/wrong-papers/math-grade3.js`

当前内容量还不大，先保留 `content.js`，等四年级内容变多后再拆分。
