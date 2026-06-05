<template>
  <section class="panel unit-panel">
    <button class="unit-toggle" type="button" @click="$emit('toggle')">
      <span>
        <strong>{{ unit.title }}</strong>
        <small>{{ unit.theme }}</small>
      </span>
      <span class="toggle-mark">{{ open ? "收起" : "展开" }}</span>
    </button>

    <div v-if="open" class="lesson-list">
      <article
        v-for="lesson in unit.lessons"
        :id="lesson.id"
        :key="lesson.id"
        class="lesson-card"
        :class="{ active: lesson.id === activeLessonId }"
      >
        <div class="lesson-header">
          <span class="tag source">{{ lesson.order }}</span>
          <h3>{{ lesson.title }}</h3>
        </div>

        <section class="lesson-block">
          <h4>{{ goalLabel }}</h4>
          <p>{{ lesson.center }}</p>
        </section>

        <section v-if="lesson.coreWords?.length" class="lesson-block">
          <h4>核心单词</h4>
          <div class="word-list">
            <span v-for="word in lesson.coreWords" :key="word" class="word-pill">{{ word }}</span>
          </div>
        </section>

        <section class="lesson-block">
          <h4>{{ knowledgeLabel }}</h4>
          <ul>
            <li v-for="item in lesson.knowledge" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="lesson-block">
          <h4>高频考试要点</h4>
          <div class="exam-list">
            <article
              v-for="point in lesson.examPoints"
              :id="point.id"
              :key="point.id"
              class="exam-point"
            >
              <strong>{{ point.title }}</strong>
              <p>{{ point.detail }}</p>
            </article>
          </div>
        </section>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  subjectId: { type: String, required: true },
  unit: { type: Object, required: true },
  open: { type: Boolean, required: true },
  activeLessonId: { type: String, required: true }
});

defineEmits(["toggle"]);

const goalLabel = computed(() => {
  if (props.subjectId === "chinese") return "中心思想";
  return "学习目标";
});

const knowledgeLabel = computed(() => {
  if (props.subjectId === "english") return "句型和语法";
  return "知识要点";
});
</script>
