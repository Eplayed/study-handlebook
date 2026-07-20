<template>
  <section id="mistake-book" class="mistake-book">
    <div class="mistake-book-head">
      <div>
        <p class="eyebrow">错词本</p>
        <h2>{{ entries.length ? `${entries.length} 个错词` : "0 个错词" }}</h2>
      </div>
      <button v-if="entries.length" class="small-button danger" type="button" @click="$emit('review')">开始复习</button>
    </div>
    <div v-if="entries.length" class="mistake-word-list">
      <span v-for="item in entries" :key="item.word.id" class="mistake-word">
        <strong>{{ item.word.english }}</strong>
        <small>{{ item.word.meaning }} · 错 {{ item.detail.count }} 次</small>
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  words: { type: Array, required: true },
  mistakes: { type: Object, required: true }
});

defineEmits(["review"]);

const wordById = computed(() => new Map(props.words.map((word) => [word.id, word])));
const entries = computed(() => Object.entries(props.mistakes)
  .map(([id, detail]) => ({ word: wordById.value.get(id), detail }))
  .filter((item) => item.word)
  .sort((a, b) => b.detail.count - a.detail.count));
</script>
