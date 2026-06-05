<template>
  <section id="start" class="panel start-panel">
    <h2>今天从这里开始</h2>
    <div class="start-grid">
      <article class="start-step">
        <span class="step-number">1</span>
        <h3>先看有没有错题到期</h3>
        <p>{{ dueWrongCount ? `今天有 ${dueWrongCount} 道错题要重做。` : "今天没有到期错题，先从知识点开始。" }}</p>
        <button class="small-button primary" type="button" @click="$emit('set-mode', 'wrongbook')">去错题本</button>
      </article>

      <article class="start-step">
        <span class="step-number">2</span>
        <h3>再学一个知识点</h3>
        <p>{{ nextCard ? nextCard.title : "这个学科还没有知识点卡。" }}</p>
        <button class="small-button primary" type="button" @click="$emit('set-mode', 'spaced')">去间隔复习</button>
      </article>

      <article class="start-step">
        <span class="step-number">3</span>
        <h3>最后做同类题</h3>
        <p>{{ firstPractice ? firstPractice[0] : "这个学科还没有同类练习。" }}</p>
        <button class="small-button primary" type="button" @click="$emit('set-mode', 'quiz')">去每日小测</button>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  dueWrongCount: { type: Number, required: true },
  nextCard: { type: Object, default: null },
  firstPractice: { type: Array, default: null }
});

defineEmits(["set-mode"]);
</script>
