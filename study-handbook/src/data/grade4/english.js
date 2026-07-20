import { exam, lesson } from "../helpers.js";

const units = [
  {
    id: "g4-en-u1",
    title: "Unit 1 My school",
    theme: "认识校园场所，能说喜欢的地方和所在位置。",
    lessons: [lesson("g4-en-1", "Unit 1", "My school", "能介绍校园里的场所，并用完整句子说出地点和自己在那里做什么。", ["问地点：Where's ...?", "提出建议：Shall we ...?", "否定表达：have no = don't have any。"], [exam("g4-en-1-place", "地点介词", "in the library, on the sports field 等地点短语要整体记住。"), exam("g4-en-1-negative", "没有某物", "The reading room has no computers. = The reading room doesn't have any computers.")], { coreWords: ["classroom", "sports field", "hall", "library", "computer room", "school building", "art room"] })]
  },
  {
    id: "g4-en-u2",
    title: "Unit 2 My classmates",
    theme: "描述同学的特点，学会友善地介绍他人。",
    lessons: [lesson("g4-en-2", "Unit 2", "My classmates", "能用形容词介绍同学，也能说同学会帮助别人做什么。", ["介绍人物特点：He/She is ...", "帮助某人做事：help + 人 + 动词原形。"], [exam("g4-en-2-help", "help 的用法", "She helps me carry books. help 后面接人，再接动词原形。")], { coreWords: ["lovely", "different", "great", "polite", "interesting", "helpful"] })]
  },
  {
    id: "g4-en-u3",
    title: "Unit 3 Animals and their homes",
    theme: "认识动物和它们的家园，描述动物正在做的事。",
    lessons: [lesson("g4-en-3", "Unit 3", "Animals and their homes", "能介绍动物、它的家园和正在进行的活动。", ["现在进行时：be + 动词-ing。", "介绍动物时，注意单数动物用 it。"], [exam("g4-en-3-ing", "动词 ing 形式", "描述正在发生的事要用 be + 动词-ing，如 The elephants are walking.")], { coreWords: ["panda", "hometown", "monkey", "elephant", "family", "baby elephant", "polar bear"] })]
  },
  {
    id: "g4-en-u4",
    title: "Unit 4 Our birthday",
    theme: "了解生日活动和生日传统，学会写简单邀请。",
    lessons: [lesson("g4-en-4", "Unit 4", "Our birthday", "能说生日活动，也能用英语介绍一种传统。", ["表达传统：It's a tradition to + 动词原形。", "邀请卡要写清活动和时间。"], [exam("g4-en-4-tradition", "to 后的动词", "It's a tradition to share a cake. to 后面用动词原形。")], { coreWords: ["invitation", "party", "activity", "share a cake", "letter", "noodles", "egg"] })]
  },
  {
    id: "g4-en-u5",
    title: "Unit 5 Visiting places",
    theme: "介绍社区和参观的地方，询问那里有没有某物。",
    lessons: [lesson("g4-en-5", "Unit 5", "Visiting places", "能介绍社区里的地点，能用 there be 句型问答。", ["Is there ...? Yes, there is. / No, there isn't.", "Are there ...? Yes, there are. / No, there aren't."], [exam("g4-en-5-there-be", "there be 问答", "单数用 Is there，复数用 Are there；回答也要跟着变。")], { coreWords: ["neighbourhood", "park", "bakery", "museum", "cinema", "supermarket", "bridge", "shop"] })]
  },
  {
    id: "g4-en-u6",
    title: "Unit 6 It's autumn!",
    theme: "观察秋天的景色和活动，学会表达感叹。",
    lessons: [lesson("g4-en-6", "Unit 6", "It's autumn!", "能说出秋天常见的景物和活动，并读懂简单的秋天诗。", ["感叹句：How + 形容词 + 主语 + 谓语！", "季节前一般不用 the，如 in autumn。"], [exam("g4-en-6-how", "How 感叹句", "How beautiful the leaves are! 先说 How，再说形容词。")], { coreWords: ["autumn", "farm", "fall", "leaf", "fruit", "fly south", "apple"] })]
  },
  {
    id: "g4-en-u7",
    title: "Unit 7 My healthy breakfast",
    theme: "谈论健康早餐和一周吃某种食物的频率。",
    lessons: [lesson("g4-en-7", "Unit 7", "My healthy breakfast", "能介绍自己的早餐，也能问别人一周做几次某事。", ["How often do you ...?", "回答频率：Once/Twice/... times a week。"], [exam("g4-en-7-often", "频率问答", "How often 问“多久一次”；once 是一次，twice 是两次。")], { coreWords: ["breakfast", "bread", "porridge", "juice", "milk", "banana"] })]
  },
  {
    id: "g4-en-u8",
    title: "Unit 8 Be honest",
    theme: "理解诚实守信，学会给同学提出合适建议。",
    lessons: [lesson("g4-en-8", "Unit 8", "Be honest", "能说出诚实守信的做法，并用 should 给建议。", ["建议：主语 + should + 动词原形。", "keep one's word 表示守信用。"], [exam("g4-en-8-should", "should 的用法", "You should tell the truth. should 后面直接接动词原形。")], { coreWords: ["keep one's word", "give ... back", "trust each other", "honest", "honesty", "tell the truth", "never tell a lie"] })]
  },
  {
    id: "g4-en-u9",
    title: "Unit 9 What time is it?",
    theme: "认识钟面，用英语说整点、半点和差几分。",
    lessons: [lesson("g4-en-9", "Unit 9", "What time is it?", "能看钟表并用英语说时间。", ["问时间：What time is it?", "回答：It's ... o'clock. / It's half past ... / It's ... to ...。"], [exam("g4-en-9-time", "说时间", "seven o'clock 是七点整；half past eleven 是十一点半；ten to four 是差十分四点。")], { coreWords: ["time", "hour hand", "minute hand", "seven o'clock", "half past eleven", "ten to four"] })]
  },
  {
    id: "g4-en-u10",
    title: "Unit 10 Weather",
    theme: "描述天气，学做一段简单的天气预报。",
    lessons: [lesson("g4-en-10", "Unit 10", "Weather", "能用天气词描述不同城市的天气，并说出温度。", ["问天气：How's the weather ...?", "回答：It's sunny/rainy/cloudy/windy/snowy."], [exam("g4-en-10-weather", "天气句型", "How's the weather in Shanghai? It's rainy. 问句和回答都要完整。")], { coreWords: ["sunny", "rainy", "cloudy", "windy", "snowy", "weather", "weather report", "degree"] })]
  }
];

const word = (id, english, meaning, example) => ({ id, english, meaning, example });

export const grade4EnglishStudy = {
  source: "已按《义务教育教科书·英语 四年级上册》目录、Unit 1 第7-14页核对；其余单元的主题词和核心句型按教材目录页录入。",
  units: [
    {
      id: "g4-en-u1",
      title: "Unit 1 My school",
      page: "教材第7-14页",
      words: [
        word("g4u1-classroom", "classroom", "教室", "In the classroom I study."),
        word("g4u1-sports-field", "sports field", "运动场", "We play basketball on the sports field."),
        word("g4u1-hall", "hall", "礼堂", "In the hall I sing for all."),
        word("g4u1-library", "library", "图书馆", "The library is best of all."),
        word("g4u1-computer-room", "computer room", "电脑房", "The computer room is on the ground floor."),
        word("g4u1-school-building", "school building", "教学楼", "This school building is very special."),
        word("g4u1-art-room", "art room", "美术教室", "We draw pictures in the art room.")
      ],
      sentence: {
        title: "问地点，再说地点",
        chinese: "小浦在哪里？他在运动场上。",
        model: "Where's Xiaopu? He is on the sports field.",
        before: "He is ",
        answer: "on the sports field",
        after: "."
      }
    },
    {
      id: "g4-en-u2",
      title: "Unit 2 My classmates",
      page: "教材第15-22页",
      words: [word("g4u2-lovely", "lovely", "可爱的", "She is a lovely girl."), word("g4u2-different", "different", "不同的", "We are all different."), word("g4u2-great", "great", "很棒的", "You are a great friend."), word("g4u2-polite", "polite", "有礼貌的", "He is polite to everyone."), word("g4u2-interesting", "interesting", "有趣的", "Her story is interesting."), word("g4u2-helpful", "helpful", "乐于助人的", "My classmate is helpful.")],
      sentence: { title: "说同学能帮忙做什么", chinese: "她帮助我搬书。", model: "She helps me carry books.", before: "She helps me ", answer: "carry books", after: "." }
    },
    {
      id: "g4-en-u3",
      title: "Unit 3 Animals and their homes",
      page: "教材第23-30页",
      words: [word("g4u3-panda", "panda", "大熊猫", "The panda is eating bamboo."), word("g4u3-hometown", "hometown", "家乡", "Yunnan is the elephants' hometown."), word("g4u3-monkey", "monkey", "猴子", "The monkey is in the tree."), word("g4u3-elephant", "elephant", "大象", "The elephant has a long nose."), word("g4u3-family", "family", "家庭；家族", "This is an elephant family."), word("g4u3-baby-elephant", "baby elephant", "小象", "The baby elephant is with its mother."), word("g4u3-polar-bear", "polar bear", "北极熊", "The polar bear lives in a cold place.")],
      sentence: { title: "说动物正在做什么", chinese: "大象正在走路。", model: "The elephants are walking.", before: "The elephants are ", answer: "walking", after: "." }
    },
    {
      id: "g4-en-u4",
      title: "Unit 4 Our birthday",
      page: "教材第31-38页",
      words: [word("g4u4-invitation", "invitation", "邀请；请柬", "This is a birthday invitation."), word("g4u4-party", "party", "聚会", "We have a birthday party."), word("g4u4-activity", "activity", "活动", "The party activity is fun."), word("g4u4-share-cake", "share a cake", "分享蛋糕", "We share a cake together."), word("g4u4-letter", "letter", "信", "I write a letter to Mum."), word("g4u4-noodles", "noodles", "面条", "We eat noodles on birthdays."), word("g4u4-egg", "egg", "鸡蛋", "There is an egg in the bowl.")],
      sentence: { title: "介绍一种传统", chinese: "生日时吃面是一种传统。", model: "It's a tradition to eat noodles on birthdays.", before: "It's a tradition to ", answer: "eat noodles", after: " on birthdays." }
    },
    {
      id: "g4-en-u5",
      title: "Unit 5 Visiting places",
      page: "教材第39-46页",
      words: [word("g4u5-neighbourhood", "neighbourhood", "社区；街区", "My neighbourhood is nice."), word("g4u5-park", "park", "公园", "There is a park near my home."), word("g4u5-bakery", "bakery", "面包店", "The bakery has fresh bread."), word("g4u5-museum", "museum", "博物馆", "We visit the museum."), word("g4u5-cinema", "cinema", "电影院", "The cinema is next to the shop."), word("g4u5-supermarket", "supermarket", "超市", "Mum goes to the supermarket."), word("g4u5-bridge", "bridge", "桥", "There is a bridge over the river."), word("g4u5-shop", "shop", "商店", "The shop is open today.")],
      sentence: { title: "问某地有没有某物", chinese: "附近有博物馆吗？是的，有。", model: "Is there a museum nearby? Yes, there is.", before: "Yes, there ", answer: "is", after: "." }
    },
    {
      id: "g4-en-u6",
      title: "Unit 6 It's autumn!",
      page: "教材第47-54页",
      words: [word("g4u6-autumn", "autumn", "秋天", "Autumn is a beautiful season."), word("g4u6-farm", "farm", "农场", "We visit a farm in autumn."), word("g4u6-fall", "fall", "落下", "Leaves fall in autumn."), word("g4u6-leaf", "leaf", "叶子", "This leaf is yellow."), word("g4u6-fruit", "fruit", "水果", "The fruit is sweet."), word("g4u6-fly-south", "fly south", "飞往南方", "Some birds fly south."), word("g4u6-apple", "apple", "苹果", "The apple is red.")],
      sentence: { title: "用 How 表达感叹", chinese: "这些叶子多么漂亮啊！", model: "How beautiful the leaves are!", before: "How ", answer: "beautiful", after: " the leaves are!" }
    },
    {
      id: "g4-en-u7",
      title: "Unit 7 My healthy breakfast",
      page: "教材第55-62页",
      words: [word("g4u7-breakfast", "breakfast", "早餐", "Breakfast is important."), word("g4u7-bread", "bread", "面包", "I have bread for breakfast."), word("g4u7-porridge", "porridge", "粥", "Dad likes porridge."), word("g4u7-juice", "juice", "果汁", "I drink some juice."), word("g4u7-milk", "milk", "牛奶", "Milk is good for us."), word("g4u7-banana", "banana", "香蕉", "The banana is yellow.")],
      sentence: { title: "问一周做几次", chinese: "你一周喝几次牛奶？两次。", model: "How often do you drink milk? Twice a week.", before: "Twice ", answer: "a week", after: "." }
    },
    {
      id: "g4-en-u8",
      title: "Unit 8 Be honest",
      page: "教材第63-70页",
      words: [word("g4u8-keep-word", "keep one's word", "守信用", "We should keep our word."), word("g4u8-give-back", "give ... back", "归还……", "Please give the book back."), word("g4u8-trust", "trust each other", "彼此信任", "Friends trust each other."), word("g4u8-honest", "honest", "诚实的", "An honest child tells the truth."), word("g4u8-honesty", "honesty", "诚实", "Honesty is important."), word("g4u8-tell-truth", "tell the truth", "说实话", "You should tell the truth."), word("g4u8-never-lie", "never tell a lie", "从不说谎", "We should never tell a lie.")],
      sentence: { title: "用 should 给建议", chinese: "你应该说实话。", model: "You should tell the truth.", before: "You should ", answer: "tell the truth", after: "." }
    },
    {
      id: "g4-en-u9",
      title: "Unit 9 What time is it?",
      page: "教材第71-78页",
      words: [word("g4u9-time", "time", "时间", "What time is it?"), word("g4u9-hour-hand", "hour hand", "时针", "The hour hand is short."), word("g4u9-minute-hand", "minute hand", "分针", "The minute hand is long."), word("g4u9-seven", "seven o'clock", "七点整", "It is seven o'clock."), word("g4u9-half-eleven", "half past eleven", "十一点半", "It is half past eleven."), word("g4u9-ten-four", "ten to four", "差十分四点", "It is ten to four.")],
      sentence: { title: "说整点时间", chinese: "现在几点？七点整。", model: "What time is it? It's seven o'clock.", before: "It's ", answer: "seven o'clock", after: "." }
    },
    {
      id: "g4-en-u10",
      title: "Unit 10 Weather",
      page: "教材第79-86页",
      words: [word("g4u10-sunny", "sunny", "晴朗的", "It is sunny today."), word("g4u10-rainy", "rainy", "下雨的", "It is rainy in Shanghai."), word("g4u10-cloudy", "cloudy", "多云的", "It is cloudy this morning."), word("g4u10-windy", "windy", "有风的", "It is windy outside."), word("g4u10-snowy", "snowy", "下雪的", "It is snowy in winter."), word("g4u10-weather", "weather", "天气", "The weather is nice."), word("g4u10-report", "weather report", "天气预报", "Let's watch the weather report."), word("g4u10-degree", "degree", "度", "It is twenty degrees.")],
      sentence: { title: "问天气", chinese: "上海天气怎么样？下雨。", model: "How's the weather in Shanghai? It's rainy.", before: "It's ", answer: "rainy", after: "." }
    }
  ]
};

export const grade4EnglishSubject = {
  id: "english",
  label: "英语",
  title: "四年级英语学习记事本",
  textbook: "《义务教育教科书·英语 四年级上册》",
  units,
  wrongQuestions: [],
  study: grade4EnglishStudy
};
