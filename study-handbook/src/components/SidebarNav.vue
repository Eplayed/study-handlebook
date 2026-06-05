<template>
  <aside class="sidebar" aria-label="学习导航">
    <section class="panel compact">
      <label for="gradeSelect">年级</label>
      <select id="gradeSelect" :value="gradeId" @change="$emit('update:gradeId', $event.target.value)">
        <option v-for="grade in grades" :key="grade.id" :value="grade.id">{{ grade.label }}</option>
      </select>
    </section>

    <section class="panel compact">
      <label for="subjectSelect">学科</label>
      <select id="subjectSelect" :value="subjectId" @change="$emit('update:subjectId', $event.target.value)">
        <option v-for="item in subjects" :key="item.id" :value="item.id">{{ item.label }}</option>
      </select>
    </section>

    <nav class="section-nav">
      <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  grades: { type: Array, required: true },
  subjects: { type: Array, required: true },
  gradeId: { type: String, required: true },
  subjectId: { type: String, required: true },
  navItems: { type: Array, required: true }
});

defineEmits(["update:gradeId", "update:subjectId"]);
</script>
