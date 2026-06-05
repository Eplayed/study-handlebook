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
          <h4>中心思想</h4>
          <p>{{ lesson.center }}</p>
        </section>

        <section class="lesson-block">
          <h4>知识要点</h4>
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
defineProps({
  unit: { type: Object, required: true },
  open: { type: Boolean, required: true },
  activeLessonId: { type: String, required: true }
});

defineEmits(["toggle"]);
</script>
