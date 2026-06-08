<template>
  <section id="wrong-links" class="panel wrong-panel">
    <div class="detail-header">
      <div>
        <p class="eyebrow">真实错题</p>
        <h2>{{ subject.label }}错题关联</h2>
        <p>只放还需要复习的真实错题。点“我已掌握”后会移到已掌握记录，仍然可以追踪。</p>
      </div>
      <div class="wrong-summary">
        <span class="tag important">{{ activeWrongQuestions.length }} 条待复习</span>
        <span class="tag mastered">{{ masteredWrongQuestions.length }} 条已掌握</span>
      </div>
    </div>

    <div v-if="activeWrongQuestions.length" class="wrong-link-list">
      <article v-for="item in activeWrongQuestions" :key="item.id" class="wrong-link-card">
        <div class="wrong-link-head">
          <span class="tag source">{{ item.source }}</span>
          <span v-if="item.weakness" class="tag weak">薄弱点</span>
          <h3>{{ item.title }}</h3>
        </div>
        <p v-if="item.weakness" class="weakness-text"><span class="field-title">需要补牢</span>{{ item.weakness }}</p>
        <p><span class="field-title">题目</span>{{ item.question }}</p>
        <p><span class="field-title">错在哪里</span>{{ item.mistake }}</p>
        <p><span class="field-title">订正方法</span>{{ item.fix }}</p>

        <section v-if="item.reviewPlan?.length" class="review-plan">
          <span class="field-title">怎么复习</span>
          <ol>
            <li v-for="step in item.reviewPlan" :key="step">{{ step }}</li>
          </ol>
        </section>

        <section v-if="item.evidence?.length" class="evidence-list">
          <span class="field-title">来源证据</span>
          <div class="word-list">
            <span v-for="source in item.evidence" :key="source" class="word-pill evidence-pill">{{ source }}</span>
          </div>
        </section>

        <section v-if="item.evidenceImages?.length" class="evidence-image-list">
          <span class="field-title">点击查看图片</span>
          <div class="evidence-grid">
            <a
              v-for="image in item.evidenceImages"
              :key="image.url"
              class="evidence-image-card"
              :href="image.url"
              target="_blank"
              rel="noreferrer"
            >
              <img :src="image.url" :alt="image.label">
              <span>{{ image.label }}</span>
            </a>
          </div>
        </section>

        <section v-if="practiceSets[item.practiceSetId]" class="practice-box">
          <div class="practice-head">
            <div>
              <span class="field-title">相似题练习</span>
              <strong>{{ practiceSets[item.practiceSetId].title }}</strong>
            </div>
            <button class="small-button" type="button" @click="nextPractice(item)">
              {{ activePractice[item.id] ? "换一题" : "练一道" }}
            </button>
          </div>

          <article v-if="activePractice[item.id]" class="practice-card">
            <p class="practice-question">{{ activePractice[item.id].question }}</p>
            <button class="small-button primary" type="button" @click="toggleAnswer(item.id)">
              {{ shownAnswers[item.id] ? "收起答案" : "看答案" }}
            </button>
            <div v-if="shownAnswers[item.id]" class="practice-answer">
              <p><span class="field-title">答案</span>{{ activePractice[item.id].answer }}</p>
              <ol>
                <li v-for="step in activePractice[item.id].steps" :key="step">{{ step }}</li>
              </ol>
            </div>
          </article>
        </section>

        <button class="small-button primary" type="button" @click="$emit('focus', item)">
          回到知识点：{{ lessonIndex[item.lessonId]?.title || "未关联课程" }}
        </button>
        <button class="small-button success" type="button" @click="markMastered(item)">
          我已掌握
        </button>
      </article>
    </div>

    <p v-else class="empty">
      {{ wrongQuestions.length ? "当前没有待复习错题，已掌握的错题可以在下面查看。" : "这个学科还没有真实错题资料。后续拿到错题后，再补“题目、错因、订正方法、关联课文和考点”。" }}
    </p>

    <details v-if="masteredWrongQuestions.length" class="mastered-panel">
      <summary>已掌握记录（{{ masteredWrongQuestions.length }} 条）</summary>
      <div class="mastered-list">
        <article v-for="item in masteredWrongQuestions" :key="item.id" class="mastered-card">
          <div>
            <h3>{{ item.title }}</h3>
            <p><span class="field-title">掌握时间</span>{{ masteredRecords[item.id]?.masteredAt || "已记录" }}</p>
            <p><span class="field-title">关联知识点</span>{{ lessonIndex[item.lessonId]?.title || "未关联课程" }}</p>
          </div>
          <div class="mastered-actions">
            <button class="small-button" type="button" @click="$emit('focus', item)">回看知识点</button>
            <button class="small-button danger" type="button" @click="unmarkMastered(item)">重新加入错题</button>
          </div>
        </article>
      </div>
    </details>
  </section>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import { generatePracticeItem } from "../data/practiceGenerator.js";

const props = defineProps({
  subject: { type: Object, required: true },
  wrongQuestions: { type: Array, required: true },
  lessonIndex: { type: Object, required: true },
  practiceSets: { type: Object, default: () => ({}) }
});

defineEmits(["focus"]);

const activePractice = reactive({});
const shownAnswers = reactive({});
const practiceCursor = reactive({});
const masteredRecords = reactive({});

const storageKey = computed(() => `study-handbook:mastered-wrong:${props.subject.id}`);
const activeWrongQuestions = computed(() => props.wrongQuestions.filter((item) => !masteredRecords[item.id]));
const masteredWrongQuestions = computed(() => props.wrongQuestions.filter((item) => masteredRecords[item.id]));

watch(
  () => props.subject.id,
  () => loadMasteredRecords(),
  { immediate: true }
);

function loadMasteredRecords() {
  for (const key of Object.keys(masteredRecords)) delete masteredRecords[key];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey.value) || "{}");
    for (const [id, record] of Object.entries(saved)) {
      masteredRecords[id] = record;
    }
  } catch {
    localStorage.removeItem(storageKey.value);
  }
}

function saveMasteredRecords() {
  localStorage.setItem(storageKey.value, JSON.stringify(masteredRecords));
}

function todayText() {
  return new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function markMastered(item) {
  masteredRecords[item.id] = { masteredAt: todayText() };
  delete activePractice[item.id];
  delete shownAnswers[item.id];
  saveMasteredRecords();
}

function unmarkMastered(item) {
  delete masteredRecords[item.id];
  saveMasteredRecords();
}

function nextPractice(item) {
  const practiceSet = props.practiceSets[item.practiceSetId];
  const nextIndex = practiceCursor[item.id] ?? 0;
  const practiceItem = generatePracticeItem(practiceSet, nextIndex);
  if (!practiceItem) return;
  activePractice[item.id] = practiceItem;
  practiceCursor[item.id] = nextIndex + 1;
  shownAnswers[item.id] = false;
}

function toggleAnswer(itemId) {
  shownAnswers[itemId] = !shownAnswers[itemId];
}
</script>
