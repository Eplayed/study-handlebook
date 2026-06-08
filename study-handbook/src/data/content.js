import { chineseSubject } from "./grade3/chinese.js";
import { englishSubject } from "./grade3/english.js";
import { mathSubject } from "./grade3/math.js";

export const handbookContent = {
  appName: "学习记事本",
  updatedAt: "2026-06-08",
  sourceNotes: [
    "语文：已按国家中小学智慧教育平台《义务教育教科书·语文三年级下册》电子教材目录核对；学校实际进度仍需按老师资料同步。",
    "数学：已按本地《数学三年级第二学期.pdf》目录核对；错题来自 /Users/zhangyajun/Documents/学习/数学/练习卷/作业 中已批改作业照片。",
    "英语：按上海教育出版社牛津上海版三年级下册 3B 模块目录整理，需与学校实际用书逐课校对。",
    "本地增量索引：在 study-handbook 目录运行 npm run index:learning，生成 .local/learning-assets-index.json，用来识别新增或变更资料。",
    "官方同步课程入口：上海智慧教育平台·空中课堂 https://basic.sh.smartedu.cn/airclassroom/",
    "教材索引参考：SteveTDX/shanghai_textbooks https://github.com/SteveTDX/shanghai_textbooks"
  ],
  grades: [
    {
      id: "grade3",
      label: "三年级",
      defaultSubject: "chinese",
      subjects: [chineseSubject, mathSubject, englishSubject]
    },
    {
      id: "grade4",
      label: "四年级",
      defaultSubject: "chinese",
      subjects: [
        {
          id: "chinese",
          label: "语文",
          title: "四年级语文学习记事本",
          textbook: "待补充学校实际教材",
          units: [],
          wrongQuestions: []
        }
      ]
    }
  ]
};
