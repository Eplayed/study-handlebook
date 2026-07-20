<template>
  <section id="roadmap" class="english-roadmap">
    <div class="section-heading">
      <div>
        <p class="eyebrow">整册路线</p>
        <h2>从一单元开始，一组一组往前学</h2>
      </div>
      <span class="roadmap-count">已学习 {{ learnedCount }} / {{ totalWords }} 词</span>
    </div>
    <div class="roadmap-list">
      <button
        v-for="unit in units"
        :key="unit.id"
        class="roadmap-item"
        :class="{ selected: unit.id === selectedUnitId, complete: learnedByUnit(unit) === unit.words.length }"
        type="button"
        @click="$emit('select-unit', unit.id)"
      >
        <span class="roadmap-number">{{ unit.title.split(' ')[1] }}</span>
        <span class="roadmap-copy"><strong>{{ unit.title }}</strong><small>{{ unit.page }}</small></span>
        <span class="roadmap-progress">{{ learnedByUnit(unit) }}/{{ unit.words.length }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  units: { type: Array, required: true },
  selectedUnitId: { type: String, required: true },
  learnedIds: { type: Array, required: true }
});

defineEmits(["select-unit"]);

const learnedSet = computed(() => new Set(props.learnedIds));
const learnedCount = computed(() => props.units.flatMap((unit) => unit.words).filter((word) => learnedSet.value.has(word.id)).length);
const totalWords = computed(() => props.units.reduce((sum, unit) => sum + unit.words.length, 0));
const learnedByUnit = (unit) => unit.words.filter((word) => learnedSet.value.has(word.id)).length;
</script>
