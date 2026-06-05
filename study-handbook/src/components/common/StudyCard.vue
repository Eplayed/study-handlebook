<template>
  <article class="study-card" :class="[theme, card.source.includes('错题') ? 'wrong' : '']">
    <div class="meta-row">
      <span class="tag important">{{ card.level }}</span>
      <span class="tag source">{{ card.source }}</span>
    </div>

    <h3>{{ card.title }}</h3>

    <div class="field">
      <span class="field-title">给孩子的话</span>
      <p>{{ card.childText }}</p>
    </div>

    <div class="field">
      <span class="field-title">怎么做</span>
      <ol>
        <li v-for="step in card.how || []" :key="step">{{ step }}</li>
      </ol>
    </div>

    <div class="field">
      <span class="field-title">例题</span>
      <p>{{ card.example }}</p>
    </div>

    <div class="field answer">
      <span class="field-title">答案</span>
      <p>{{ card.answer }}</p>
    </div>

    <div class="field mistake">
      <span class="field-title">易错提醒</span>
      <p>{{ card.mistake }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  card: { type: Object, required: true },
  theme: { type: String, required: true }
});
</script>
