<template>
  <section id="path" class="panel">
    <h2>学习路线</h2>
    <p class="note-text">按这个顺序复习会更平滑：先学基础，再做综合，错题回到对应知识点。</p>
    <div v-if="cards.length === 0" class="empty">这个学科还没有学习路线。</div>
    <div v-else class="path-list">
      <article v-for="(card, index) in cards" :key="card.title" class="path-item">
        <span class="path-index">{{ index + 1 }}</span>
        <div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.childText }}</p>
          <span class="tag source">{{ card.source }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cards: { type: Array, required: true }
});
</script>
