# 学习记事本

这是一个可持续维护的 Vue 网页项目，用来整理小学三年级、四年级的学习资料。

当前默认：

- 年级：三年级
- 学科：语文
- 结构：年级 -> 学科 -> 单元 -> 课文/课次 -> 知识要点 -> 高频考试要点 -> 错题关联

## 文件说明

- `src/data/content.js`：学习记事本总入口，组合年级和学科。
- `src/data/grade3/chinese.js`：三年级语文单元、课文、知识点、高频考点和错题关联。
- `src/data/grade3/math.js`：三年级数学单元、知识点、高频考点和错题关联。
- `src/data/grade3/english.js`：三年级英语模块、Unit、知识点、高频考点和错题关联。
- `src/App.vue`：页面编排层，负责年级/学科选择、单元展开和错题定位。
- `src/components/SubjectNotebook.vue`：学科记事本主视图。
- `src/components/UnitAccordion.vue`：单元折叠和课文详情。
- `src/components/WrongQuestionPanel.vue`：错题关联列表，点击后跳回对应课文和考点。
- `scripts/import-math-assets.mjs`：把本地数学练习卷、老师笔记图片导入网页资料库。
- `styles.css`：全局样式。

## 怎么维护教材内容

1. 打开 `src/data/grade3/` 下对应学科文件。
2. 找到对应年级，例如 `grade3`。
3. 找到对应学科，例如 `chinese`、`math`、`english`。
4. 在 `units` 中按单元维护课程。
5. 每课包含：
   - `title`：课文名或课次名
   - `center`：中心思想或本课目标
   - `knowledge`：知识要点
   - `examPoints`：高频考试要点，每个考点有独立 `id`
6. 在 `wrongQuestions` 中新增错题，并填写：
   - `lessonId`：关联到哪一课
   - `examPointId`：关联到哪一个高频考点
   - `question`：错题
   - `mistake`：错因
   - `fix`：订正方法

## 文件夹错题资料

新增错题图片、练习卷答案、老师笔记继续放在本地文件夹，不在网页里提交。

当前数学资料目录：

- `/Users/zhangyajun/Documents/学习/数学/练习卷`
- `/Users/zhangyajun/Documents/学习/数学/老师笔记`

导入图片资料：

```bash
cd /Users/zhangyajun/Documents/学习小助手/study-handbook
npm run import:math
```

导入生成目录是 `public/generated/`，已加入 Git 忽略，不会把孩子试卷照片上传到 GitHub。

## 本地运行

```bash
cd /Users/zhangyajun/Documents/学习小助手/study-handbook
npm install
npm run dev
```

构建检查：

```bash
npm run build
```

## 公网部署

项目已配置 GitHub Pages 自动部署工作流：`.github/workflows/deploy.yml`。

推送到 `main` 后，GitHub Actions 会自动：

1. 进入 `study-handbook` 目录。
2. 执行 `npm ci`。
3. 执行 `npm run build`。
4. 把 `dist/` 发布到 GitHub Pages。

预计公网地址：

```text
https://eplayed.github.io/study-handlebook/
```

如果第一次访问没有页面，需要到 GitHub 仓库设置里打开：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

## 教材来源策略

- 语文：按统编版小学语文三年级下册常用目录整理，需与学校实际用书逐课校对。
- 数学：按上海小学三年级下册常见沪教版单元和本地校内练习卷错题整理。
- 英语：按上海教育出版社牛津上海版三年级下册 3B 模块目录整理，需与学校实际用书逐课校对。
- 官方同步课程入口：上海智慧教育平台·空中课堂 https://basic.sh.smartedu.cn/airclassroom/
- 教材索引参考：SteveTDX/shanghai_textbooks https://github.com/SteveTDX/shanghai_textbooks

不要把整套教材 PDF 或孩子试卷照片提交到 GitHub。仓库里只放轻量结构化索引和网页代码。
