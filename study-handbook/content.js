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
          summary: "根据上海三年级下册教材重点，以及你整理的6张校内数学卷照片，把真实错题整理成知识点复习路径。",
          tags: ["最后两周", "校内错题加入", "适合孩子读"],
          sources: [
            "本地资料：/Users/zhangyajun/Documents/学习/数学 中的6张数学卷照片",
            "上海三年级下册数学常见期末题型：计算、填空、选择判断、面积周长、分数、应用题",
            "官方同步学习入口：上海智慧教育平台·空中课堂 https://basic.sh.smartedu.cn/airclassroom/"
          ],
          knowledgePoints: [
            {
              id: "division-vertical",
              title: "竖式除法：商的位置和余数",
              stage: "先补基础",
              priority: "最容易失分",
              source: "来自周二卷和第五六单元复习卷",
              childGoal: "我会判断商写在哪一位，余数一定比除数小，还会验算。",
              explain: "除法竖式不是只算答案。商写在十位还是个位，表示的意思不一样。每次除完剩下的数，都必须比除数小。",
              steps: ["先看被除数前几位够不够除。", "商写在对应数位上。", "每一步相乘、相减后，检查余数小于除数。", "最后用“除数×商+余数”验算。"],
              workedExamples: [
                { question: "3034÷82", answer: "37", explanation: "82×3=246，303-246=57，落下4得574；82×7=574，所以商是37。" },
                { question: "845÷26", answer: "32……13", explanation: "26×32=832，845-832=13，13小于26，所以余数正确。" }
              ],
              wrongQuestions: [
                { question: "3034÷82 竖式中商写错位置。", mistake: "没有先判断商是两位数，商的位置偏了。", fix: "先看303够除82，所以商的第一位写在十位；答案是37。" },
                { question: "2005÷15 写成133……10时不验算。", mistake: "答案可能看着对，但没有用除数×商+余数检查。", fix: "15×133+10=2005，余数10小于15，可以。" }
              ],
              practice: [
                { question: "3034÷82=", answer: "37", check: "商是两位数。" },
                { question: "845÷26=", answer: "32……13", check: "余数13小于26。" },
                { question: "3780÷36=", answer: "105", check: "中间的0不要漏写。" }
              ],
              mastery: ["能说出商为什么写在十位。", "每道除法都会验算。", "余数一定小于除数。"]
            },
            {
              id: "mixed-shortcuts",
              title: "递等式和巧算",
              stage: "再练计算",
              priority: "每天练",
              source: "来自周三、周四卷",
              childGoal: "我能看出先算什么，也能发现能不能凑整。",
              explain: "递等式不是一口气乱算，而是每一行只做一步。巧算题要找相同的数、能凑整的数、括号里的数。",
              steps: ["有括号先算括号。", "没有括号时，先乘除后加减。", "乘除同级或加减同级，从左往右。", "看到相同乘数，想一想能不能合并。"],
              workedExamples: [
                { question: "87×99+87", answer: "8700", explanation: "把后面的87看成87×1，所以87×99+87×1=87×100=8700。" },
                { question: "735÷(704-683)", answer: "35", explanation: "先算括号704-683=21，再735÷21=35。" }
              ],
              wrongQuestions: [
                { question: "8670-(274-189)", mistake: "把括号拆错，算成8670-274-189。", fix: "先算括号：274-189=85，再8670-85=8585。" },
                { question: "87×99+87 硬算出错。", mistake: "没有发现两个部分都有87。", fix: "用87×(99+1)，变成87×100。" }
              ],
              practice: [
                { question: "87×99+87=", answer: "8700", check: "有没有变成87×100？" },
                { question: "288÷4×25=", answer: "1800", check: "从左往右算，或先288÷4=72。" },
                { question: "8670-(274-189)=", answer: "8585", check: "括号先算。" }
              ],
              mastery: ["每行只做一步。", "能解释为什么可以凑整。", "括号外是减号时不会拆错。"]
            },
            {
              id: "area-units",
              title: "面积单位换算",
              stage: "补概念",
              priority: "高频错点",
              source: "来自周一卷和第五六单元复习卷",
              childGoal: "我知道面积单位带平方，平方米、平方分米、平方厘米之间进率是100。",
              explain: "面积是一个面的大小，所以单位带“平方”。长度单位进率常常是10，但面积单位相邻进率是100。",
              steps: ["先看单位有没有平方。", "记住1平方米=100平方分米。", "记住1平方分米=100平方厘米。", "大单位变小单位乘100，小单位变大单位除以100。"],
              workedExamples: [
                { question: "32m²=( )dm²", answer: "3200dm²", explanation: "1m²=100dm²，所以32m²=32×100=3200dm²。" },
                { question: "2000cm²=( )dm²", answer: "20dm²", explanation: "100cm²=1dm²，所以2000÷100=20dm²。" }
              ],
              wrongQuestions: [
                { question: "32m²写成320dm²。", mistake: "把面积单位进率当成10。", fix: "面积单位相邻进率是100，所以是3200dm²。" },
                { question: "房间面积填100cm。", mistake: "面积单位漏了平方。", fix: "面积要写cm²、dm²或m²，房间一般用m²。" }
              ],
              practice: [
                { question: "3m²20dm²=( )dm²", answer: "320dm²", check: "3m²=300dm²。" },
                { question: "500cm²=( )dm²", answer: "5dm²", check: "除以100。" },
                { question: "小房间面积约100( )", answer: "m²", check: "填面积单位。" }
              ],
              mastery: ["能分清长度单位和面积单位。", "知道面积单位进率是100。", "答案单位带平方。"]
            },
            {
              id: "perimeter-area",
              title: "周长和面积",
              stage: "补概念",
              priority: "高频错点",
              source: "来自第五六单元复习卷",
              childGoal: "我能分清周长是一圈边线，面积是一整块面。",
              explain: "周长和面积是两个问题。周长问外面一圈多长，面积问里面有多大。",
              steps: ["读题先圈出“周长”还是“面积”。", "长方形周长=(长+宽)×2。", "长方形面积=长×宽。", "检查单位：周长用cm/dm/m，面积用cm²/dm²/m²。"],
              workedExamples: [
                { question: "长23dm、宽22dm，求周长和面积。", answer: "周长90dm，面积506dm²", explanation: "周长=(23+22)×2=90dm；面积=23×22=506dm²。" }
              ],
              wrongQuestions: [
                { question: "长23dm、宽22dm的长方形，面积写成90dm²。", mistake: "把周长当面积。", fix: "90dm是周长，面积是23×22=506dm²。" },
                { question: "正方形边长24cm，周长写成24×24。", mistake: "把面积公式当周长公式。", fix: "周长=24×4=96cm；面积才是24×24。" }
              ],
              practice: [
                { question: "长15cm、宽9cm，周长是多少？", answer: "48cm", check: "(15+9)×2。" },
                { question: "边长10dm的正方形面积是多少？", answer: "100dm²", check: "10×10。" },
                { question: "长23dm、宽22dm，面积是多少？", answer: "506dm²", check: "23×22。" }
              ],
              mastery: ["看到周长能想到一圈。", "看到面积能想到一面。", "公式和单位都能配对。"]
            },
            {
              id: "composite-shapes",
              title: "组合图形面积和拼图周长",
              stage: "综合应用",
              priority: "容易漏边",
              source: "来自选择题卷和第五六单元复习卷",
              childGoal: "我会把复杂图形拆成简单图形，也知道贴在里面的边不算周长。",
              explain: "组合图形求面积时，可以拆开算。求周长时，只看外面一圈，里面贴住的线不是外边。",
              steps: ["求面积先分割或数格。", "求周长用手指沿外面一圈走。", "两个图形贴住的边不算外周长。", "必要时画出外边线。"],
              workedExamples: [
                { question: "两个12cm×4cm长方形拼成L形，求外周长。", answer: "48cm", explanation: "两个长方形总周长是64cm，中间贴住两段4cm，要减去8cm×2? 实际外圈数边更稳，得48cm。" }
              ],
              wrongQuestions: [
                { question: "两个长方形拼成L形，周长算成64cm。", mistake: "把贴在里面的边也算进去了。", fix: "只数外面一圈，内部重合边不算。" },
                { question: "十字形图形面积漏算中间格。", mistake: "数格没有按顺序。", fix: "一行一行数，或拆成长方形再相加。" }
              ],
              practice: [
                { question: "4个边长1cm的小正方形排成一行，周长是多少？", answer: "10cm", check: "不是16cm，内部边不算。" },
                { question: "8dm×6dm长方形剪去2dm×3dm，剩余面积？", answer: "42dm²", check: "48-6。" }
              ],
              mastery: ["能用手指沿外圈数周长。", "能把图形拆成简单长方形。", "不会把内部边算进周长。"]
            },
            {
              id: "fractions",
              title: "分数：平均分和几分之几",
              stage: "补概念",
              priority: "期末常考",
              source: "来自周四卷",
              childGoal: "我知道分数必须平均分，分母表示分成几份，分子表示取几份。",
              explain: "分数题第一步不是写答案，而是先看是不是平均分。不是平均分，就不能直接写分数。",
              steps: ["先找单位1是谁。", "看是不是平均分。", "分母写平均分成几份。", "分子写取了几份。", "求几个物体的几分之几：先除以分母，再乘分子。"],
              workedExamples: [
                { question: "25个星的3/5是多少个？", answer: "15个", explanation: "25÷5=5，每份5个；取3份就是5×3=15个。" },
                { question: "1里面有几个1/8？", answer: "8个", explanation: "1平均分成8份，每份是1/8。" }
              ],
              wrongQuestions: [
                { question: "25个星的3/5写成25×3。", mistake: "没有先求每份是多少。", fix: "先25÷5，再×3。" },
                { question: "涂了2块就写1/2。", mistake: "只看涂色块数，没有看总共平均分几份。", fix: "分母看总份数，分子看涂色份数。" }
              ],
              practice: [
                { question: "24颗糖平均分成6份，取2份是多少颗？", answer: "8颗", check: "24÷6×2。" },
                { question: "12米的1/3是多少米？", answer: "4米", check: "12÷3。" },
                { question: "5个1/9是多少？", answer: "5/9", check: "分母不变。" }
              ],
              mastery: ["能先找单位1。", "能解释分母和分子。", "会先除以分母再乘分子。"]
            },
            {
              id: "word-problems",
              title: "应用题：购物、路程、平均分",
              stage: "综合应用",
              priority: "期末拉分",
              source: "来自周二、周三、周四卷",
              childGoal: "我会先圈关键词，再决定用乘法、除法还是比较。",
              explain: "应用题不是看到数字就算。先找问题问什么，再找关键词：一共、平均、每分钟、够不够、剩下。",
              steps: ["读问题，知道要求什么。", "圈关键词和单位。", "写数量关系。", "列式计算。", "带单位答。"],
              workedExamples: [
                { question: "79元一个球拍，买13个，带1000元够吗？", answer: "不够", explanation: "79×13=1027元，1027>1000，所以不够。" },
                { question: "999只纸鹤，折好651只，剩下12人平均折，每人几只？", answer: "29只", explanation: "先算剩下999-651=348只，再348÷12=29只。" }
              ],
              wrongQuestions: [
                { question: "999只纸鹤题直接999÷12。", mistake: "没有减去已经折好的651只。", fix: "先算剩下的，再平均分。" },
                { question: "路线图返回时间算错。", mistake: "返回速度每分钟多5米，忘记加5。", fix: "先算去时速度，再用新速度求返回时间。" }
              ],
              practice: [
                { question: "79元一个，买13个，1000元够吗？", answer: "不够", check: "79×13=1027。" },
                { question: "已折651只，还要折到999只，12人平均折，每人几只？", answer: "29只", check: "(999-651)÷12。" },
                { question: "每分钟65米，走9分钟多少米？", answer: "585米", check: "速度×时间。" }
              ],
              mastery: ["能圈关键词。", "能先算剩下再平均。", "能带单位回答。"]
            }
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
