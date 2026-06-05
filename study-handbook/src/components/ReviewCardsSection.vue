<template>
  <section id="cards" class="panel">
    <h2>复习卡</h2>
    <div v-if="allCards.length === 0" class="empty">这个年级/学科还没有复习卡。可以在 content.js 里按三年级格式添加。</div>
    <template v-else>
      <div class="card-grid">
        <StudyCard v-for="card in filteredCards" :key="card.title + card.example" :card="card" :theme="theme" />
      </div>
      <div v-if="filteredCards.length === 0" class="empty">没有找到包含“{{ query }}”的复习卡。</div>
    </template>
  </section>
</template>

<script setup>
import StudyCard from "./common/StudyCard.vue";

defineProps({
  allCards: { type: Array, required: true },
  filteredCards: { type: Array, required: true },
  theme: { type: String, required: true },
  query: { type: String, required: true }
});
</script>
