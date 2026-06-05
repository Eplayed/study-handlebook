<template>
  <section id="wrong-links" class="panel wrong-panel">
    <div class="detail-header">
      <div>
        <p class="eyebrow">真实错题</p>
        <h2>{{ subject.label }}错题关联</h2>
        <p>只放已经整理过的真实错题。每条错题关联到某一课和某个高频考点，点击后会展开对应单元。</p>
      </div>
      <span class="tag important">{{ wrongQuestions.length }} 条</span>
    </div>

    <div v-if="wrongQuestions.length" class="wrong-link-list">
      <article v-for="item in wrongQuestions" :key="item.id" class="wrong-link-card">
        <div class="wrong-link-head">
          <span class="tag source">{{ item.source }}</span>
          <h3>{{ item.title }}</h3>
        </div>
        <p><span class="field-title">题目</span>{{ item.question }}</p>
        <p><span class="field-title">错在哪里</span>{{ item.mistake }}</p>
        <p><span class="field-title">订正方法</span>{{ item.fix }}</p>
        <button class="small-button primary" type="button" @click="$emit('focus', item)">
          回到知识点：{{ lessonIndex[item.lessonId]?.title || "未关联课程" }}
        </button>
      </article>
    </div>

    <p v-else class="empty">这个学科还没有真实错题资料。后续拿到错题后，再补“题目、错因、订正方法、关联课文和考点”。</p>
  </section>
</template>

<script setup>
defineProps({
  subject: { type: Object, required: true },
  wrongQuestions: { type: Array, required: true },
  lessonIndex: { type: Object, required: true }
});

defineEmits(["focus"]);
</script>
