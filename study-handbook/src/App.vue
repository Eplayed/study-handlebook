<template>
  <AppHeader @print="printPage" @reset-checks="resetChecks" />

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
      <OverviewPanel :subject="subject" :updated-at="content.updatedAt" />

      <StartPanel
        :due-wrong-count="dueWrongEntries.length"
        :next-card="nextCard"
        :first-practice="subject.practice[0] || null"
        @set-mode="mode = $event"
      />

      <LearningPath :cards="subject.cards" />

      <section id="mode" class="panel">
        <ReviewMode v-if="mode === 'review'" :subject="subject" />
        <WrongBookMode v-else-if="mode === 'wrongbook'" :subject="subject" :storage-key="subjectStorageKey('wrongbook')" @changed="storageTick++" />
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

      <ReviewCardsSection
        :all-cards="subject.cards"
        :filtered-cards="filteredCards"
        :theme="subject.theme"
        :query="query"
      />

      <section id="practice" class="panel">
        <h2>同类再练</h2>
        <SimpleTable :headers="['题目', '答案', '检查点']" :rows="subject.practice" />
      </section>

      <section id="unit-map" class="panel">
        <h2>单元清单</h2>
        <SimpleTable :headers="['单元', '要会什么', '最容易错什么']" :rows="subject.unitMap" />
      </section>

      <ChecklistPanel :items="subject.checklist" :is-checked="isChecked" @set-checked="setChecked" />
      <MaintenancePanel />
    </section>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import AppHeader from "./components/AppHeader.vue";
import ChecklistPanel from "./components/ChecklistPanel.vue";
import LearningPath from "./components/LearningPath.vue";
import MaintenancePanel from "./components/MaintenancePanel.vue";
import OverviewPanel from "./components/OverviewPanel.vue";
import ReviewCardsSection from "./components/ReviewCardsSection.vue";
import SidebarNav from "./components/SidebarNav.vue";
import StartPanel from "./components/StartPanel.vue";
import SimpleTable from "./components/common/SimpleTable.vue";
import QuizMode from "./components/modes/QuizMode.vue";
import ReviewMode from "./components/modes/ReviewMode.vue";
import SpacedMode from "./components/modes/SpacedMode.vue";
import WrongBookMode from "./components/modes/WrongBookMode.vue";
import { readJson, todayIso } from "./utils/storage";

const content = window.HANDBOOK_CONTENT;
const gradeId = ref(content.grades[0].id);
const subjectId = ref(content.grades[0].defaultSubject);
const query = ref("");
const mode = ref("review");
const storageTick = ref(0);

const navItems = [
  ["#start", "今天开始"],
  ["#path", "学习路线"],
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

const dueWrongEntries = computed(() => {
  storageTick.value;
  return readJson(subjectStorageKey("wrongbook"), []).filter((entry) => entry.dueAt <= todayIso());
});
const nextCard = computed(() => subject.value.cards[0] || null);

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
</script>
