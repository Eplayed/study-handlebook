import { exam, lesson } from "../helpers.js";

const units = [
    {
      id: "en-m1",
      title: "Module 1 Using my five senses",
      theme: "用五官感知颜色、味道和声音。",
      lessons: [
        lesson("en-1", "Unit 1", "Colours", "能描述颜色和看到的物品。", ["核心词：black, blue, green, red, white, yellow。", "句型：What colour is it? It is ...", "会用颜色词描述物品。"], [exam("en-1-word", "颜色词拼写", "颜色词大小写和拼写常考。"), exam("en-1-sentence", "问答句", "What colour is it? 回答 It is red.")]),
        lesson("en-2", "Unit 2", "Tastes", "能表达食物味道。", ["核心词：sweet, sour, bitter, salty。", "句型：How does it taste? It is ...", "能把食物和味道对应。"], [exam("en-2-taste", "味道判断", "lemon-sour, candy-sweet 这类搭配常考。")]),
        lesson("en-3", "Unit 3", "Sounds", "能描述听到的声音。", ["核心词：train, bus, car, ship。", "句型：What can you hear? I can hear ...", "区分 see 和 hear。"], [exam("en-3-hear", "五官动词", "听到用 hear，看到用 see。")])
      ]
    },
    {
      id: "en-m2",
      title: "Module 2 My favourite things",
      theme: "谈论喜欢的动物、玩具、食物和饮料。",
      lessons: [
        lesson("en-4", "Unit 4", "Animals in the zoo", "能介绍动物名称和特征。", ["核心词：lion, monkey, panda, tiger。", "句型：Do you like ...? Yes, I do. / No, I don't.", "会用 strong, cute 等描述动物。"], [exam("en-4-like", "like 问答", "Do you like monkeys? 肯定否定回答不能漏 do。")]),
        lesson("en-5", "Unit 5", "Toys", "能介绍玩具和喜好。", ["核心词：ball, kite, robot, toy bear。", "句型：I like this ...", "区分 this 和 that。"], [exam("en-5-this", "指示代词", "近处 this，远处 that。")]),
        lesson("en-6", "Unit 6", "Food and drinks", "能说食物饮料和简单需求。", ["核心词：biscuit, bread, egg, juice, milk, water。", "句型：What do you have? I have ...", "能区分可数和不可数的常见词。"], [exam("en-6-have", "have 句型", "I have some bread. 注意 some 的使用。")])
      ]
    },
    {
      id: "en-m3",
      title: "Module 3 My colourful life",
      theme: "谈论爱好、生日和农场生活。",
      lessons: [
        lesson("en-7", "Unit 7", "Hobbies", "能介绍自己的爱好。", ["核心词：dance, paint, read, sing, skate, swim。", "句型：I like ...ing.", "动词加 ing 要会拼。"], [exam("en-7-ing", "动名词", "swim 变 swimming，skate 变 skating。")]),
        lesson("en-8", "Unit 8", "Happy birthday!", "能表达生日祝福和年龄。", ["核心句：Happy birthday! How old are you?", "会说数字和年龄。", "会用 Here's a present for you."], [exam("en-8-age", "年龄问答", "How old are you? I am nine.")]),
        lesson("en-9", "Unit 9", "A day on the farm", "能说农场动物和简单活动。", ["核心词：cow, horse, pig, sheep。", "句型：What are they? They are ...", "注意 sheep 单复数同形。"], [exam("en-9-plural", "名词复数", "sheep 不加 s，horses/pigs/cows 加 s。")])
      ]
    },
    {
      id: "en-m4",
      title: "Module 4 Things we enjoy",
      theme: "读懂小故事和节日表达。",
      lessons: [
        lesson("en-10", "Unit 10", "Funny cartoons", "能描述卡通人物的身体部位。", ["核心词：head, body, arm, hand, leg, foot。", "句型：He has ... / She has ...", "单复数要对应。"], [exam("en-10-body", "身体部位", "one foot, two feet 是常见易错。")]),
        lesson("en-11", "Unit 11", "Mother's Day", "能表达节日祝福和感谢。", ["核心句：Happy Mother's Day!", "会说礼物和感谢。", "能写简单祝福语。"], [exam("en-11-card", "祝福语", "卡片书写常考大小写和标点。")]),
        lesson("en-12", "Unit 12", "Three little pigs", "能读懂故事人物和情节。", ["理解 three little pigs, wolf, house。", "会按顺序讲故事。", "能识别故事中的重复句。"], [exam("en-12-story", "故事顺序", "常考房子材料和狼做了什么。")])
      ]
    }
  ];

const wrongQuestions = [
              { id: "ew-1", lessonId: "en-1", examPointId: "en-1-sentence", title: "颜色问答漏 it is", question: "What colour is it? 回答 red。", mistake: "没有写完整句。", fix: "写 It is red.", source: "高频句型" },
              { id: "ew-2", lessonId: "en-7", examPointId: "en-7-ing", title: "动词 ing 拼写错误", question: "swim 写成 swiming。", mistake: "重读闭音节没有双写 m。", fix: "swim -> swimming。", source: "高频语法" },
              { id: "ew-3", lessonId: "en-9", examPointId: "en-9-plural", title: "sheep 复数加 s", question: "They are sheeps.", mistake: "不知道 sheep 单复数同形。", fix: "They are sheep.", source: "高频语法" }
            ];

export const englishSubject = {
  id: "english",
  label: "英语",
  title: "三年级英语学习记事本",
  textbook: "Oxford English Shanghai Edition 3B",
  units,
  wrongQuestions
};
