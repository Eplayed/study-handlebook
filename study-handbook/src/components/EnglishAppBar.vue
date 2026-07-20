<template>
  <header class="english-appbar">
    <div class="english-brand-row">
      <h1>英语小本</h1>
      <div class="study-switchers">
        <label class="sr-only" for="englishGradeSelect">年级</label>
        <select id="englishGradeSelect" aria-label="年级" :value="gradeId" @change="$emit('update:gradeId', $event.target.value)">
          <option v-for="grade in grades" :key="grade.id" :value="grade.id">{{ grade.label }}</option>
        </select>
        <label class="sr-only" for="englishSubjectSelect">学科</label>
        <select id="englishSubjectSelect" aria-label="学科" :value="subjectId" @change="$emit('update:subjectId', $event.target.value)">
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.label }}</option>
        </select>
      </div>
    </div>
    <nav class="english-tabs" aria-label="英语学习导航">
      <a href="#summer-study">今日</a>
      <a href="#mistake-book">错词本</a>
      <a href="#roadmap">单元</a>
    </nav>
  </header>
</template>

<script setup>
defineProps({
  grades: { type: Array, required: true },
  subjects: { type: Array, required: true },
  gradeId: { type: String, required: true },
  subjectId: { type: String, required: true }
});

defineEmits(["update:gradeId", "update:subjectId"]);
</script>
