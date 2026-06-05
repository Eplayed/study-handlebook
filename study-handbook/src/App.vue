<template>
  <header class="app-header">
    <div>
      <p class="eyebrow">Vue 可持续维护版</p>
      <h1>小学期末复习手册</h1>
      <p class="subtitle">把教材重点、卷面考点、真实错题和每日复习安排放在一个可以长期更新的网页里。</p>
    </div>
    <div class="header-actions">
      <button class="icon-button" type="button" title="打印或保存为 PDF" @click="printPage">打印</button>
      <button class="icon-button secondary" type="button" title="清空本页打卡" @click="resetChecks">清空打卡</button>
    </div>
  </header>

  <main class="layout">
    <aside class="sidebar" aria-label="复习导航">
      <section class="panel compact">
        <label for="gradeSelect">年级</label>
        <select id="gradeSelect" v-model="gradeId">
          <option v-for="grade in content.grades" :key="grade.id" :value="grade.id">{{ grade.label }}</option>
        </select>
      </section>

      <section class="panel compact">
        <label for="subjectSelect">学科</label>
        <select id="subjectSelect" v-model="subjectId">
          <option v-for="item in grade.subjects" :key="item.id" :value="item.id">{{ item.label }}</option>
        </select>
      </section>

      <section class="panel compact">
        <label for="searchInput">搜索</label>
        <input id="searchInput" v-model.trim="query" type="search" placeholder="例如：周长、古诗、robot">
      </section>

      <section class="panel compact">
        <label for="modeSelect">学习模式</label>
        <select id="modeSelect" v-model="mode">
          <option value="review">复习卡</option>
          <option value="wrongbook">错题本</option>
          <option value="quiz">每日小测</option>
          <option value="spaced">间隔复习</option>
        </select>
      </section>

      <nav class="section-nav">
        <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
    </aside>

    <section class="content">
      <section class="panel hero-panel">
        <h2>{{ subject.title }}</h2>
        <p>{{ subject.summary }}</p>
        <div class="meta-row">
          <span v-for="tag in subject.tags" :key="tag" class="tag important">{{ tag }}</span>
          <span class="tag">更新：{{ content.updatedAt }}</span>
        </div>
      </section>

      <section id="mode" class="panel">
        <ReviewMode v-if="mode === 'review'" :subject="subject" />
        <WrongBookMode v-else-if="mode === 'wrongbook'" :storage-key="subjectStorageKey('wrongbook')" />
        <QuizMode v-else-if="mode === 'quiz'" :practice="subject.practice" />
        <SpacedMode v-else :subject="subject" :storage-key="subjectStorageKey('spaced')" />
      </section>

      <section id="plan" class="panel">
        <h2>两周复习安排</h2>
        <SimpleTable :headers="['时间', '怎么复习']" :rows="subject.plan" />
      </section>

      <section id="sources" class="panel">
        <h2>资料来源</h2>
        <ul>
          <li v-for="source in subject.sources" :key="source">{{ source }}</li>
        </ul>
        <p class="empty">说明：公开网络上能直接核验的杨浦区三年级完整历年真卷不齐全。本页面把本地校内错题、上海同教材常见卷面题型和教材重点分开处理，不把非杨浦卷冒充为杨浦真卷。</p>
      </section>

      <section id="cards" class="panel">
        <h2>复习卡</h2>
        <div v-if="subject.cards.length === 0" class="empty">这个年级/学科还没有复习卡。可以在 content.js 里按三年级格式添加。</div>
        <template v-else>
          <div class="card-grid">
            <StudyCard v-for="card in filteredCards" :key="card.title + card.example" :card="card" :theme="subject.theme" />
          </div>
          <div v-if="filteredCards.length === 0" class="empty">没有找到包含“{{ query }}”的复习卡。</div>
        </template>
      </section>

      <section id="practice" class="panel">
        <h2>同类再练</h2>
        <SimpleTable :headers="['题目', '答案', '检查点']" :rows="subject.practice" />
      </section>

      <section id="unit-map" class="panel">
        <h2>单元清单</h2>
        <SimpleTable :headers="['单元', '要会什么', '最容易错什么']" :rows="subject.unitMap" />
      </section>

      <section id="checklist" class="panel">
        <h2>每日打卡</h2>
        <div class="checklist">
          <label v-for="item in subject.checklist" :key="item" class="check-item">
            <input type="checkbox" :checked="isChecked(item)" @change="setChecked(item, $event.target.checked)">
            <span>{{ item }}</span>
          </label>
        </div>
      </section>

      <section id="maintenance" class="panel">
        <h2>怎么持续维护</h2>
        <ul>
          <li>新增四年级内容：打开 <strong>content.js</strong>，在 <strong>grade4</strong> 对应学科的 <strong>cards</strong>、<strong>practice</strong>、<strong>unitMap</strong> 里添加。</li>
          <li>新增错题：优先写成“孩子能懂”的卡片：考什么、怎么做、例题、答案、易错提醒。</li>
          <li>保留来源：如果来自校内卷或照片，在 <strong>source</strong> 写清楚，方便以后判断真实性。</li>
        </ul>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref, watch } from "vue";

const content = window.HANDBOOK_CONTENT;
const gradeId = ref(content.grades[0].id);
const subjectId = ref(content.grades[0].defaultSubject);
const query = ref("");
const mode = ref("review");

const navItems = [
  ["#mode", "学习模式"],
  ["#plan", "两周安排"],
  ["#sources", "资料来源"],
  ["#cards", "复习卡"],
  ["#practice", "同类再练"],
  ["#unit-map", "单元清单"],
  ["#checklist", "每日打卡"],
  ["#maintenance", "持续维护"]
].map(([href, label]) => ({ href, label }));

const grade = computed(() => content.grades.find((item) => item.id === gradeId.value) || content.grades[0]);
const subject = computed(() => grade.value.subjects.find((item) => item.id === subjectId.value) || grade.value.subjects[0]);

watch(gradeId, () => {
  subjectId.value = grade.value.defaultSubject || grade.value.subjects[0].id;
});

const filteredCards = computed(() => {
  if (!query.value) return subject.value.cards;
  const lower = query.value.toLowerCase();
  return subject.value.cards.filter((card) => [
    card.title,
    card.level,
    card.source,
    card.childText,
    card.example,
    card.answer,
    card.mistake,
    ...(card.how || [])
  ].join(" ").toLowerCase().includes(lower));
});

function subjectStorageKey(name) {
  return `handbook:${gradeId.value}:${subjectId.value}:${name}`;
}

function checklistKey(item) {
  return `handbook:${gradeId.value}:${subjectId.value}:${item}`;
}

function isChecked(item) {
  return localStorage.getItem(checklistKey(item)) === "1";
}

function setChecked(item, checked) {
  localStorage.setItem(checklistKey(item), checked ? "1" : "0");
}

function resetChecks() {
  subject.value.checklist.forEach((item) => localStorage.removeItem(checklistKey(item)));
}

function printPage() {
  window.print();
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function cardId(card) {
  return `${card.title}:${card.example}`;
}

const SimpleTable = defineComponent({
  props: {
    headers: { type: Array, required: true },
    rows: { type: Array, required: true }
  },
  setup(props) {
    return () => props.rows.length === 0
      ? h("div", { class: "empty" }, "这里还没有内容。以后把资料加到 content.js，页面会自动显示。")
      : h("table", [
        h("thead", h("tr", props.headers.map((header) => h("th", header)))),
        h("tbody", props.rows.map((row) => h("tr", row.map((cell) => h("td", cell)))))
      ]);
  }
});

const StudyCard = defineComponent({
  props: {
    card: { type: Object, required: true },
    theme: { type: String, required: true }
  },
  setup(props) {
    return () => h("article", { class: ["study-card", props.theme, props.card.source.includes("错题") ? "wrong" : ""] }, [
      h("div", { class: "meta-row" }, [
        h("span", { class: "tag important" }, props.card.level),
        h("span", { class: "tag source" }, props.card.source)
      ]),
      h("h3", props.card.title),
      field("给孩子的话", h("p", props.card.childText)),
      field("怎么做", h("ol", (props.card.how || []).map((step) => h("li", step)))),
      field("例题", h("p", props.card.example)),
      field("答案", h("p", props.card.answer), "answer"),
      field("易错提醒", h("p", props.card.mistake), "mistake")
    ]);
  }
});

function field(title, body, extraClass = "") {
  return h("div", { class: ["field", extraClass] }, [
    h("span", { class: "field-title" }, title),
    body
  ]);
}

const ReviewMode = defineComponent({
  props: { subject: { type: Object, required: true } },
  setup(props) {
    return () => h("div", [
      h("h2", "复习卡模式"),
      h("div", { class: "tool-grid" }, [
        h("div", { class: ["study-card", props.subject.theme] }, [
          h("h3", "孩子怎么用"),
          h("ol", [
            h("li", "先读“给孩子的话”。"),
            h("li", "照着“怎么做”说一遍步骤。"),
            h("li", "遮住答案做例题。"),
            h("li", "看“易错提醒”，再做同类题。")
          ])
        ]),
        h("div", { class: "study-card" }, [
          h("h3", "家长怎么维护"),
          h("p", "每张卡只讲一个考点。新增错题时，也按“考什么、怎么做、例题、答案、易错提醒”写，孩子才看得懂。")
        ])
      ])
    ]);
  }
});

const WrongBookMode = defineComponent({
  props: { storageKey: { type: String, required: true } },
  setup(props) {
    const entries = ref(readJson(props.storageKey, []));
    const form = reactive({ title: "", question: "", answer: "", reason: "", dueDays: 2 });

    watch(() => props.storageKey, () => {
      entries.value = readJson(props.storageKey, []);
    });

    function save() {
      if (!form.title.trim() || !form.question.trim() || !form.answer.trim()) return;
      entries.value.unshift({
        title: form.title.trim(),
        question: form.question.trim(),
        answer: form.answer.trim(),
        reason: form.reason.trim(),
        createdAt: todayIso(),
        dueAt: addDays(Number(form.dueDays || 2))
      });
      writeJson(props.storageKey, entries.value);
      Object.assign(form, { title: "", question: "", answer: "", reason: "", dueDays: 2 });
    }

    function remove(index) {
      entries.value.splice(index, 1);
      writeJson(props.storageKey, entries.value);
    }

    return () => h("div", [
      h("h2", "错题本模式"),
      h("div", { class: "tool-grid" }, [
        h("form", { class: "study-card wrong", onSubmit: (event) => { event.preventDefault(); save(); } }, [
          h("h3", "新增一道错题"),
          formRow("错题标题", h("input", { value: form.title, placeholder: "例如：周长和面积混了", onInput: (e) => { form.title = e.target.value; } })),
          formRow("题目", h("textarea", { rows: 3, value: form.question, placeholder: "把题目关键条件写下来", onInput: (e) => { form.question = e.target.value; } })),
          formRow("正确答案", h("textarea", { rows: 2, value: form.answer, placeholder: "写完整答案和单位", onInput: (e) => { form.answer = e.target.value; } })),
          formRow("我为什么错", h("textarea", { rows: 2, value: form.reason, placeholder: "例如：把面积单位写成了厘米", onInput: (e) => { form.reason = e.target.value; } })),
          formRow("几天后再做", h("input", { type: "number", min: 1, max: 30, value: form.dueDays, onInput: (e) => { form.dueDays = e.target.value; } })),
          h("button", { class: "small-button primary", type: "submit" }, "保存错题")
        ]),
        h("div", { class: "study-card" }, [
          h("h3", "错题复习规则"),
          h("p", "不要只抄答案。每道错题都要写清楚：我错在哪里、正确步骤是什么、几天后再做。"),
          h("p", { class: "empty" }, "错题保存在当前浏览器里，不会上传到网络。")
        ])
      ]),
      h("h3", "已保存错题"),
      entries.value.length === 0
        ? h("div", { class: "empty" }, "还没有错题。做卷子时错一道，就加一道。")
        : entries.value.map((entry, index) => h("article", { class: "wrong-entry", key: entry.createdAt + entry.title }, [
          h("h3", entry.title),
          h("p", [h("strong", "题目："), entry.question]),
          h("p", [h("strong", "答案："), entry.answer]),
          h("p", [h("strong", "错因："), entry.reason || "还没写错因"]),
          h("p", [h("strong", "保存："), `${entry.createdAt}；`, h("span", { class: entry.dueAt <= todayIso() ? "due" : "" }, entry.dueAt <= todayIso() ? "今天该重做" : `下次：${entry.dueAt}`)]),
          h("button", { class: "small-button", type: "button", onClick: () => remove(index) }, "删除")
        ]))
    ]);
  }
});

function formRow(label, control) {
  return h("div", { class: "form-row" }, [
    h("label", label),
    control
  ]);
}

const QuizMode = defineComponent({
  props: { practice: { type: Array, required: true } },
  setup(props) {
    const visible = ref({});
    return () => h("div", [
      h("h2", "每日小测模式"),
      h("p", "先遮住答案做题，再点“显示答案”。每天做5-10题就够，关键是订正。"),
      props.practice.length === 0
        ? h("div", { class: "empty" }, "这个学科还没有小测题。可以在 content.js 的 practice 里添加。")
        : props.practice.map((row, index) => h("article", { class: "quiz-entry", key: row[0] }, [
          h("h3", `第${index + 1}题`),
          h("p", row[0]),
          h("button", { class: "small-button answer-toggle", type: "button", onClick: () => { visible.value[index] = !visible.value[index]; } }, visible.value[index] ? "隐藏答案" : "显示答案"),
          visible.value[index] ? h("div", { class: "answer" }, [
            h("p", [h("strong", "答案："), row[1]]),
            h("p", [h("strong", "检查点："), row[2] || ""])
          ]) : null
        ]))
    ]);
  }
});

const SpacedMode = defineComponent({
  props: {
    subject: { type: Object, required: true },
    storageKey: { type: String, required: true }
  },
  setup(props) {
    const reviews = ref(readJson(props.storageKey, {}));

    watch(() => props.storageKey, () => {
      reviews.value = readJson(props.storageKey, {});
    });

    const dueCards = computed(() => props.subject.cards.filter((card) => {
      const dueAt = reviews.value[cardId(card)] || todayIso();
      return dueAt <= todayIso();
    }));

    function schedule(card, days) {
      reviews.value[cardId(card)] = addDays(days);
      writeJson(props.storageKey, reviews.value);
    }

    return () => h("div", [
      h("h2", "间隔复习模式"),
      h("p", "会的卡片隔2天再看，不会的明天再看。这样错题和易错点不会只看一遍就忘。"),
      dueCards.value.length === 0
        ? h("div", { class: "empty" }, "今天没有到期卡片。可以切到“复习卡”自由查看。")
        : dueCards.value.map((card) => h("article", { class: "spaced-entry", key: cardId(card) }, [
          h("span", { class: "tag important" }, card.level),
          h("h3", card.title),
          h("p", card.childText),
          h("p", [h("strong", "例题："), card.example]),
          h("div", { class: "answer" }, [h("strong", "答案："), card.answer]),
          h("div", { class: "button-row" }, [
            h("button", { class: "small-button primary", type: "button", onClick: () => schedule(card, 2) }, "会了，2天后再看"),
            h("button", { class: "small-button", type: "button", onClick: () => schedule(card, 1) }, "还不会，明天再看")
          ])
        ]))
    ]);
  }
});
</script>
