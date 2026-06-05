window.HANDBOOK_CONTENT = {
  updatedAt: "2026-06-05",
  grades: [
    {
      id: "grade3",
      label: "三年级",
      defaultSubject: "math",
      subjects: [
        {
          id: "math",
          label: "数学",
          theme: "math",
          title: "三年级下册数学期末复习",
          summary: "根据上海三年级下册教材重点，以及你整理的6张校内数学卷照片，把真实错题类型整理成孩子能照着复习的卡片。",
          tags: ["最后两周", "校内错题加入", "适合孩子读"],
          sources: [
            "本地资料：/Users/zhangyajun/Documents/学习/数学 中的6张数学卷照片",
            "上海三年级下册数学常见期末题型：计算、填空、选择判断、面积周长、分数、应用题",
            "官方同步学习入口：上海智慧教育平台·空中课堂 https://basic.sh.smartedu.cn/airclassroom/"
          ],
          plan: [
            ["第1-2天", "竖式乘除，每天12题。重点检查商的位置、余数、验算。"],
            ["第3-4天", "递等式和巧算，每天8题。重点练括号、乘法分配律。"],
            ["第5-6天", "面积单位、长方形/正方形周长面积表格。"],
            ["第7-8天", "组合图形面积和拼图周长。"],
            ["第9-10天", "分数意义和分数应用。先找平均分和单位1。"],
            ["第11-12天", "购物、路程、平均分应用题。先圈关键词再列式。"],
            ["第13-14天", "错题二刷，只做错过的同类题。"]
          ],
          cards: [
            {
              title: "竖式除法：商的位置和余数",
              level: "★★★ 经常考",
              source: "来自你的错题卷",
              childText: "除法竖式不是只算答案，还要看商写在哪一位。余数一定要比除数小。",
              how: ["先看被除数前几位够不够除。", "商写在哪一位，就表示几个百、几个十或几个一。", "每一步余数都要比除数小。", "有余数要验算：除数×商+余数=被除数。"],
              example: "3034÷82",
              answer: "3034÷82=37。验算：82×37=3034。",
              mistake: "商的位置写偏；余数比除数大；有余数时忘记写。"
            },
            {
              title: "递等式和巧算",
              level: "★★★ 经常考",
              source: "来自你的错题卷",
              childText: "有些题直接硬算很慢，要看能不能凑整或合并。",
              how: ["有括号先算括号。", "乘除连在一起，从左往右算。", "看到相同数字，想一想能不能合并。"],
              example: "87×99+87",
              answer: "87×99+87=87×(99+1)=87×100=8700。",
              mistake: "8670-(274-189) 不能算成 8670-274-189。括号外面是减号时要特别小心。"
            },
            {
              title: "面积单位换算",
              level: "★★★ 经常考",
              source: "来自你的错题卷",
              childText: "面积单位带平方，进率是100，不是10。",
              how: ["记住：1平方米=100平方分米。", "记住：1平方分米=100平方厘米。", "长度单位和面积单位不要混。"],
              example: "32m²=( )dm²；2000cm²=( )dm²",
              answer: "32m²=3200dm²；2000cm²=20dm²。",
              mistake: "把面积进率当成10；把cm和cm²混在一起。"
            },
            {
              title: "周长和面积不要混",
              level: "★★★ 经常考",
              source: "来自你的错题卷",
              childText: "周长是一圈边线，面积是里面一整块面。",
              how: ["长方形周长=(长+宽)×2。", "长方形面积=长×宽。", "正方形周长=边长×4。", "正方形面积=边长×边长。"],
              example: "长23dm、宽22dm的长方形，求周长和面积。",
              answer: "周长=(23+22)×2=90dm；面积=23×22=506dm²。",
              mistake: "周长单位是dm，面积单位是dm²。公式和单位都不能混。"
            },
            {
              title: "组合图形面积和拼图周长",
              level: "★★★ 经常考",
              source: "来自你的错题卷",
              childText: "拼在一起的图形，求面积和求周长的方法不一样。",
              how: ["求面积：能分成几个长方形，就分别算再相加。", "求周长：只数外面一圈。", "两个图形贴在一起的边，不算外周长。"],
              example: "两个12cm×4cm长方形拼成L形，求外周长。",
              answer: "外周长是48cm。",
              mistake: "把里面贴住的边也算进周长。"
            },
            {
              title: "分数：先找平均分",
              level: "★★★ 经常考",
              source: "来自你的错题卷",
              childText: "分数题第一步不是写答案，而是先看是不是平均分。",
              how: ["分母：平均分成几份。", "分子：取了几份。", "分数应用题：先求每份，再求几份。"],
              example: "25个星的3/5是多少个？",
              answer: "25÷5×3=15个。",
              mistake: "2/6表示取了6份中的2份，不是2个。"
            },
            {
              title: "购物够不够",
              level: "★★ 常考",
              source: "来自你的错题卷",
              childText: "问够不够时，先算实际一共多少钱，再比较。",
              how: ["先算单价×数量。", "再和带的钱比较。", "问实际需要多少，就不能只估算。"],
              example: "79元一个球拍，买13个，带1000元够吗？",
              answer: "79×13=1027元，1027>1000，所以不够。",
              mistake: "只估算不精算；把13个看成10个。"
            },
            {
              title: "路程图应用",
              level: "★★ 常考",
              source: "来自你的错题卷",
              childText: "路线图要先看清走的是哪几段路。",
              how: ["速度=路程÷时间。", "时间=路程÷速度。", "如果速度变了，要先把新速度算出来。"],
              example: "335m+250m走9分钟，返回420m，每分钟多走5m，返回要几分钟？",
              answer: "(335+250)÷9=65米/分；420÷(65+5)=6分。",
              mistake: "返回速度变了，要加5以后再算。"
            }
          ],
          practice: [
            ["87×99+87", "8700", "有没有用87×100？"],
            ["735÷(704-683)", "35", "括号先算了吗？"],
            ["3034÷82", "37", "商的位置对吗？"],
            ["32m²=( )dm²", "3200", "面积进率是100。"],
            ["25个星的3/5是多少？", "15个", "先25÷5，再×3。"],
            ["999只纸鹤，折好651只，剩下12人平均折，每人几只？", "29只", "先算999-651。"]
          ],
          unitMap: [
            ["复习与提高", "小括号计算、面积单位、组合面积", "括号先算；面积用平方单位。"],
            ["用两位数乘除", "两位数乘除、速度时间路程", "本册最重要，竖式和应用题都要练。"],
            ["统计", "条形统计图", "先看每格代表几。"],
            ["分数的初步认识", "平均分、几分之一、几分之几", "先找单位1。"],
            ["几何小实践", "周长、长方形和正方形周长", "周长是一圈，面积是一面。"]
          ],
          checklist: ["今天做了10道计算题", "今天改了2道错题", "今天检查了单位", "今天说清楚一道应用题为什么这样列式"]
        },
        {
          id: "chinese",
          label: "语文",
          theme: "chinese",
          title: "三年级下册语文期末复习",
          summary: "把字词、古诗、课内阅读、课外阅读和作文整理成孩子能照着看的复习卡。",
          tags: ["字词", "古诗", "阅读", "作文"],
          sources: [
            "统编版三年级下册常见期末复习范围",
            "上海小学三年级语文常见卷面题型",
            "官方同步学习入口：上海智慧教育平台·空中课堂 https://basic.sh.smartedu.cn/airclassroom/"
          ],
          plan: [
            ["第1-4天", "听写词语，默写古诗，复习第1-3单元。"],
            ["第5-8天", "每天做课内阅读和课外阅读各1篇。"],
            ["第9-12天", "作文列提纲，写1篇并修改。"],
            ["第13-14天", "只看古诗、易错字、阅读答题模板。"]
          ],
          cards: [
            {
              title: "看拼音写词语",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "先读拼音，再想课文里的词，最后检查有没有少一横、少一点。",
              how: ["读准拼音。", "想课本词语。", "写完后检查易错字。"],
              example: "jù lǒng、zī shì、ōu zhōu、mì fēng",
              answer: "聚拢、姿势、欧洲、蜜蜂。",
              mistake: "聚、姿、蜜要多写几遍。"
            },
            {
              title: "古诗背默和节日",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "默写要一字不错，理解题要知道诗写的节日或画面。",
              how: ["背题目、作者、诗句。", "知道《元日》春节，《清明》清明节，《九月九日忆山东兄弟》重阳节。"],
              example: "《元日》写什么节日？有哪些习俗？",
              answer: "春节。习俗有放爆竹、喝屠苏酒、贴桃符。",
              mistake: "《清明》不是春节，《九月九日忆山东兄弟》写思念亲人。"
            },
            {
              title: "课内阅读找中心句",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "中心句就是一段话里最重要、最能概括意思的句子。",
              how: ["先看开头和结尾。", "看后面的句子是不是都围绕它写。", "尽量用课文原句回答。"],
              example: "《海底世界》围绕哪句话写？",
              answer: "海底真是个景色奇异、物产丰富的世界。",
              mistake: "不要只写“海底很美”，要找原句。"
            },
            {
              title: "人物品质题",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "问一个人怎样，答案要有品质，也要有事情依据。",
              how: ["先写品质。", "再写从哪件事看出来。"],
              example: "宋庆龄是怎样的孩子？",
              answer: "她是守信用的孩子。因为她答应教小珍叠花篮，就坚持留下来等小珍。",
              mistake: "只写“她很好”不够。"
            },
            {
              title: "作文",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "三年级作文最怕跑题和没有细节。",
              how: ["先看题目要写什么。", "中间写2-3个具体细节。", "结尾写感受或发现。"],
              example: "写一次小实验。",
              answer: "开头写做什么实验；中间写材料、步骤、看到的变化；结尾写发现。",
              mistake: "不能只写“很好玩”。"
            }
          ],
          practice: [
            ["《元日》写什么节日？", "春节", "要写清节日。"],
            ["《海底世界》的中心句是什么？", "海底真是个景色奇异、物产丰富的世界。", "用课文原句。"]
          ],
          unitMap: [
            ["第一单元", "古诗、燕子、荷花", "景物特点、古诗背默、观察顺序。"],
            ["第二单元", "寓言故事", "寓意、人物性格、文言词义。"],
            ["第三单元", "中华传统文化", "传统节日、说明文中心句。"],
            ["第四单元", "观察与实验", "实验过程、观察记录。"],
            ["第七单元", "奇妙世界", "中心句、总分总、颜色变化描写。"]
          ],
          checklist: ["今天听写了词语", "今天背或默了一首古诗", "今天做了一篇阅读", "今天复习了一篇课文重点"]
        },
        {
          id: "english",
          label: "英语",
          theme: "english",
          title: "三年级下册英语期末复习",
          summary: "按牛津上海版3B常见词汇、句型和卷面题型整理，重点是听懂问句、看图写词、核心问答。",
          tags: ["牛津上海版3B", "听力", "看图写词", "核心问答"],
          sources: [
            "《英语（牛津上海版）》三年级第二学期",
            "上海小学英语常见期末评价题型",
            "官方同步学习入口：上海智慧教育平台·空中课堂 https://basic.sh.smartedu.cn/airclassroom/"
          ],
          plan: [
            ["第1-4天", "Module 1-2 单词和问答。"],
            ["第5-8天", "Module 3-4 单词和问答。"],
            ["第9-12天", "看图说话、阅读判断。"],
            ["第13-14天", "只看易错单词和核心答句。"]
          ],
          cards: [
            {
              title: "听问题选答句",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "听第一个关键词很重要。hear是听见，see是看见。",
              how: ["听到What can you hear，就回答I can hear...", "听到What can you see，就回答I can see..."],
              example: "What can you hear?",
              answer: "I can hear a bus.",
              mistake: "hear和see不要混。"
            },
            {
              title: "feel / taste / smell",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "feel问摸起来，taste问尝起来，smell问闻起来。",
              how: ["How does it feel? It is soft.", "How does it taste? It is sour.", "How does it smell? It is nice."],
              example: "How does the lemon taste?",
              answer: "It is sour.",
              mistake: "taste不是问颜色，不能答It is yellow。"
            },
            {
              title: "Do you like ...?",
              level: "★★★ 经常考",
              source: "期末卷常见",
              childText: "喜欢就答Yes, I do. 不喜欢就答No, I don't.",
              how: ["看清问的是不是like。", "用do来回答。"],
              example: "Do you like rabbits?",
              answer: "Yes, I do. / No, I don't.",
              mistake: "不要写Yes, I like。"
            },
            {
              title: "this / these",
              level: "★★ 常考",
              source: "期末卷常见",
              childText: "this是一个，these是多个。it指一个，they指多个。",
              how: ["What is this? It is...", "What are these? They are..."],
              example: "What are these? 图片是裤子。",
              answer: "They are trousers.",
              mistake: "trousers常用复数。"
            }
          ],
          practice: [
            ["What shape is it? 图片是圆形。", "It is a circle.", "shape问形状。"],
            ["Do you like kites?", "Yes, I do. / No, I don't.", "用do回答。"]
          ],
          unitMap: [
            ["M1U1", "see, hear, bus, car, train, ship", "What can you see/hear?"],
            ["M1U2", "hard, soft, rough, smooth, hot, cold", "How does it feel?"],
            ["M1U3", "sweet, sour, bitter, salty", "How does it taste/smell?"],
            ["M2U1-M2U3", "animals, toys, clothes", "Do you like...? What are these?"],
            ["M3U1-M3U3", "shapes, colours, seasons", "What shape/colour...? In summer..."],
            ["M4U1-M4U3", "body, Children's Day, story", "I have... I go to..."]
          ],
          checklist: ["今天读了1个Unit单词", "今天练了5组问答", "今天听读了15分钟", "今天看图说了3句话"]
        }
      ]
    },
    {
      id: "grade4",
      label: "四年级",
      defaultSubject: "math",
      subjects: [
        {
          id: "math",
          label: "数学",
          theme: "math",
          title: "四年级数学复习模板",
          summary: "四年级内容位已经留好。后续把四年级卷子或教材范围加入 content.js，就能自动生成同样的复习卡。",
          tags: ["待补充", "可维护模板"],
          sources: ["等待加入四年级教材范围和校内卷错题。"],
          plan: [["准备", "把四年级数学卷子或错题照片放入资料文件夹，再按三年级数学卡片格式补充。"]],
          cards: [],
          practice: [],
          unitMap: [],
          checklist: ["今天整理了1道四年级错题", "今天补充了1张复习卡"]
        },
        {
          id: "chinese",
          label: "语文",
          theme: "chinese",
          title: "四年级语文复习模板",
          summary: "四年级语文内容位已经留好，后续可以按字词、古诗、阅读、作文继续添加。",
          tags: ["待补充", "可维护模板"],
          sources: ["等待加入四年级教材范围和校内卷错题。"],
          plan: [["准备", "收集四年级语文期末范围、默写清单、阅读错题和作文题。"]],
          cards: [],
          practice: [],
          unitMap: [],
          checklist: ["今天整理了1个语文考点", "今天补充了1个作文题"]
        },
        {
          id: "english",
          label: "英语",
          theme: "english",
          title: "四年级英语复习模板",
          summary: "四年级英语内容位已经留好，后续可以按Module/Unit添加单词、句型、听力和阅读题。",
          tags: ["待补充", "可维护模板"],
          sources: ["等待加入四年级教材范围和校内卷错题。"],
          plan: [["准备", "收集四年级英语Unit清单、核心单词、核心问答和易错题。"]],
          cards: [],
          practice: [],
          unitMap: [],
          checklist: ["今天整理了1个Unit", "今天补充了1组问答"]
        }
      ]
    }
  ]
};
