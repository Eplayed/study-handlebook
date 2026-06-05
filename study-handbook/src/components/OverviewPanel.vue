<template>
  <section class="panel hero-panel">
    <h2>{{ subject.title }}</h2>
    <p>{{ subject.summary }}</p>
    <div class="meta-row">
      <span v-for="tag in subject.tags" :key="tag" class="tag important">{{ tag }}</span>
      <span class="tag">更新：{{ updatedAt }}</span>
    </div>
  </section>
</template>

<script setup>
defineProps({
  subject: { type: Object, required: true },
  updatedAt: { type: String, required: true }
});
</script>
