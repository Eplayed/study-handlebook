<template>
  <AppHeader @print="printPage" />

  <main class="layout">
    <SidebarNav
      v-model:grade-id="gradeId"
      v-model:subject-id="subjectId"
      :grades="content.grades"
      :subjects="grade.subjects"
      :nav-items="navItems"
    />

    <section class="content">
      <SubjectNotebook
        :subject="subject"
        :open-unit-ids="openUnitIds"
        :active-lesson-id="activeLessonId"
        @toggle-unit="toggleUnit"
        @focus-wrong="focusWrongQuestion"
      />

      <section id="sources" class="panel">
        <h2>资料来源和维护方式</h2>
        <ul>
          <li v-for="source in content.sourceNotes" :key="source">{{ source }}</li>
        </ul>
        <p class="empty">
          新增错题继续放在本地资料文件夹中。网页里的错题条目负责记录“这道题关联哪一课、哪一个高频考点”，点击后可以回到对应知识点。
        </p>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import AppHeader from "./components/AppHeader.vue";
import SidebarNav from "./components/SidebarNav.vue";
import SubjectNotebook from "./components/SubjectNotebook.vue";
import { handbookContent } from "./data/content.js";

const content = handbookContent;
const gradeId = ref(content.grades[0].id);
const subjectId = ref(content.grades[0].defaultSubject);
const openUnitIds = ref([]);
const activeLessonId = ref("");

const navItems = [
  ["#notebook", "学习记事本"],
  ["#units", "单元和课文"],
  ["#wrong-links", "错题关联"],
  ["#sources", "资料来源"]
].map(([href, label]) => ({ href, label }));

const grade = computed(() => content.grades.find((item) => item.id === gradeId.value) || content.grades[0]);
const subject = computed(() => grade.value.subjects.find((item) => item.id === subjectId.value) || grade.value.subjects[0]);
watch(gradeId, () => {
  subjectId.value = grade.value.defaultSubject || grade.value.subjects[0].id;
});

watch([gradeId, subjectId], () => {
  if (!grade.value.subjects.some((item) => item.id === subjectId.value)) {
    subjectId.value = grade.value.defaultSubject || grade.value.subjects[0].id;
  }
  openUnitIds.value = subject.value.units[0] ? [subject.value.units[0].id] : [];
  activeLessonId.value = subject.value.units[0]?.lessons[0]?.id || "";
}, { immediate: true });

function toggleUnit(unitId) {
  openUnitIds.value = openUnitIds.value.includes(unitId)
    ? openUnitIds.value.filter((id) => id !== unitId)
    : [...openUnitIds.value, unitId];
}

async function focusWrongQuestion(wrongQuestion) {
  const unit = subject.value.units.find((item) => item.lessons.some((lesson) => lesson.id === wrongQuestion.lessonId));
  if (unit && !openUnitIds.value.includes(unit.id)) {
    openUnitIds.value = [...openUnitIds.value, unit.id];
  }
  activeLessonId.value = wrongQuestion.lessonId;
  await nextTick();
  document.getElementById(wrongQuestion.examPointId || wrongQuestion.lessonId)?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function printPage() {
  window.print();
}
</script>
