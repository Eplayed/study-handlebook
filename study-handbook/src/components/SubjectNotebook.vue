<template>
  <section id="notebook" class="notebook">
    <section class="panel hero-panel">
      <p class="eyebrow">学习记事本</p>
      <h2>{{ subject.title }}</h2>
      <p>{{ subject.textbook }}</p>
      <div class="meta-row">
        <span class="tag important">{{ subject.units.length }} 个单元</span>
        <span class="tag important">{{ lessonCount }} 课/课次</span>
        <span class="tag">{{ subject.wrongQuestions.length }} 条错题关联</span>
      </div>
    </section>

    <section id="units" class="unit-stack">
      <UnitAccordion
        v-for="unit in subject.units"
        :key="unit.id"
        :unit="unit"
        :open="openUnitIds.includes(unit.id)"
        :active-lesson-id="activeLessonId"
        @toggle="$emit('toggle-unit', unit.id)"
      />
      <p v-if="!subject.units.length" class="empty">这个年级或学科还没有录入教材目录。</p>
    </section>

    <WrongQuestionPanel
      :wrong-questions="subject.wrongQuestions"
      :lesson-index="lessonIndex"
      @focus="$emit('focus-wrong', $event)"
    />
  </section>
</template>

<script setup>
import { computed } from "vue";
import UnitAccordion from "./UnitAccordion.vue";
import WrongQuestionPanel from "./WrongQuestionPanel.vue";

const props = defineProps({
  subject: { type: Object, required: true },
  openUnitIds: { type: Array, required: true },
  activeLessonId: { type: String, required: true }
});

defineEmits(["toggle-unit", "focus-wrong"]);

const lessonCount = computed(() => props.subject.units.reduce((sum, unit) => sum + unit.lessons.length, 0));
const lessonIndex = computed(() => {
  const index = {};
  for (const unit of props.subject.units) {
    for (const lesson of unit.lessons) {
      index[lesson.id] = { ...lesson, unitTitle: unit.title, unitId: unit.id };
    }
  }
  return index;
});
</script>
