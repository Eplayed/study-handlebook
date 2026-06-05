<template>
  <AppHeader @print="printPage" @reset-checks="resetProgress" />

  <main class="layout">
    <SidebarNav
      v-model:grade-id="gradeId"
      v-model:subject-id="subjectId"
      v-model:query="query"
      v-model:mode="mode"
      :grades="content.grades"
      :subjects="grade.subjects"
      :nav-items="navItems"
    />

    <section class="content">
      <section class="panel hero-panel">
        <p class="eyebrow">复习工作台</p>
        <h2>{{ subject.title }}</h2>
        <p>{{ subject.summary }}</p>
        <div class="meta-row">
          <span class="tag important">{{ progressText }}</span>
          <span class="tag important">{{ dueWrongCount ? `${dueWrongCount} 道错题到期` : "今天先学知识点" }}</span>
          <span class="tag">更新：{{ content.updatedAt }}</span>
        </div>
      </section>

      <section id="start" class="panel start-panel">
        <h2>今天怎么复习</h2>
        <div class="start-grid">
          <article class="start-step">
            <span class="step-number">1</span>
            <h3>选一个知识点</h3>
            <p>推荐先学：{{ activePoint?.title || "暂无知识点" }}</p>
          </article>
          <article class="start-step">
            <span class="step-number">2</span>
            <h3>看错题和讲解</h3>
            <p>先看真实错题错在哪里，再看订正方法。</p>
          </article>
          <article class="start-step">
            <span class="step-number">3</span>
            <h3>做同类题</h3>
            <p>做完能说出步骤，才标记“我掌握了”。</p>
          </article>
        </div>
      </section>

      <KnowledgeWorkbench
        :knowledge-points="knowledgePoints"
        :active-id="activeKnowledgeId"
        :saved-wrongs="savedWrongs"
        :mastered="mastered"
        @select="activeKnowledgeId = $event"
        @toggle-mastered="toggleMastered"
      />

      <WrongQuestionManager
        :knowledge-points="knowledgePoints"
        :active-id="activeKnowledgeId"
        :items="savedWrongs"
        @add="addWrongQuestion"
        @remove="removeWrongQuestion"
      />

      <section id="sources" class="panel">
        <h2>资料来源</h2>
        <ul>
          <li v-for="source in subject.sources" :key="source">{{ source }}</li>
        </ul>
        <p class="empty">说明：本页优先使用本地校内错题、上海同教材常见卷面题型和教材重点。官方空中课堂和教材仓库作为来源索引，不把大文件或视频放进项目。</p>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import AppHeader from "./components/AppHeader.vue";
import KnowledgeWorkbench from "./components/KnowledgeWorkbench.vue";
import SidebarNav from "./components/SidebarNav.vue";
import WrongQuestionManager from "./components/WrongQuestionManager.vue";
import { addDays, readJson, todayIso, writeJson } from "./utils/storage";

const content = window.HANDBOOK_CONTENT;
const gradeId = ref(content.grades[0].id);
const subjectId = ref(content.grades[0].defaultSubject);
const query = ref("");
const mode = ref("review");

const navItems = [
  ["#start", "今天怎么复习"],
  ["#workbench", "知识点复习"],
  ["#wrong-manager", "新增错题"],
  ["#sources", "资料来源"]
].map(([href, label]) => ({ href, label }));

const grade = computed(() => content.grades.find((item) => item.id === gradeId.value) || content.grades[0]);
const subject = computed(() => grade.value.subjects.find((item) => item.id === subjectId.value) || grade.value.subjects[0]);
const knowledgePoints = computed(() => {
  if (subject.value.knowledgePoints?.length) return subject.value.knowledgePoints;
  return (subject.value.cards || []).map((card, index) => ({
    id: `legacy-${index}`,
    title: card.title,
    stage: index < 2 ? "先补基础" : "综合复习",
    priority: card.level,
    source: card.source,
    childGoal: card.childText,
    explain: card.childText,
    steps: card.how || [],
    workedExamples: [{ question: card.example, answer: card.answer, explanation: card.mistake }],
    wrongQuestions: [{ question: card.example, mistake: card.mistake, fix: card.answer }],
    practice: (subject.value.practice || []).map((row) => ({ question: row[0], answer: row[1], check: row[2] })),
    mastery: [card.mistake, "能独立做同类题。"]
  }));
});
const activeKnowledgeId = ref("");

watch([gradeId, subjectId], () => {
  if (!grade.value.subjects.some((item) => item.id === subjectId.value)) {
    subjectId.value = grade.value.defaultSubject || grade.value.subjects[0].id;
  }
  activeKnowledgeId.value = knowledgePoints.value[0]?.id || "";
}, { immediate: true });

watch(gradeId, () => {
  subjectId.value = grade.value.defaultSubject || grade.value.subjects[0].id;
});

const activePoint = computed(() => knowledgePoints.value.find((item) => item.id === activeKnowledgeId.value) || knowledgePoints.value[0]);
const wrongStorageKey = computed(() => `handbook:${gradeId.value}:${subjectId.value}:knowledge-wrongs`);
const masteryStorageKey = computed(() => `handbook:${gradeId.value}:${subjectId.value}:knowledge-mastered`);
const savedWrongs = ref([]);
const mastered = ref({});

watch(wrongStorageKey, (key) => {
  savedWrongs.value = readJson(key, []);
}, { immediate: true });

watch(masteryStorageKey, (key) => {
  mastered.value = readJson(key, {});
}, { immediate: true });

const dueWrongCount = computed(() => savedWrongs.value.filter((item) => item.dueAt <= todayIso()).length);
const progressText = computed(() => {
  const total = knowledgePoints.value.length;
  if (!total) return "暂无知识点";
  const done = knowledgePoints.value.filter((item) => mastered.value[item.id]).length;
  return `已掌握 ${done}/${total} 个知识点`;
});

function addWrongQuestion(payload) {
  const next = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    knowledgeId: payload.knowledgeId,
    question: payload.question,
    answer: payload.answer,
    reason: payload.reason,
    createdAt: todayIso(),
    dueAt: addDays(Number(payload.dueDays || 2))
  };
  savedWrongs.value = [next, ...savedWrongs.value];
  writeJson(wrongStorageKey.value, savedWrongs.value);
  activeKnowledgeId.value = payload.knowledgeId;
}

function removeWrongQuestion(id) {
  savedWrongs.value = savedWrongs.value.filter((item) => item.id !== id);
  writeJson(wrongStorageKey.value, savedWrongs.value);
}

function toggleMastered(id) {
  mastered.value = { ...mastered.value, [id]: !mastered.value[id] };
  writeJson(masteryStorageKey.value, mastered.value);
}

function resetProgress() {
  mastered.value = {};
  writeJson(masteryStorageKey.value, mastered.value);
}

function printPage() {
  window.print();
}
</script>
