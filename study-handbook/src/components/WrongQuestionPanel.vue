<template>
  <section id="wrong-links" class="panel wrong-panel">
    <div class="detail-header">
      <div>
        <p class="eyebrow">错题关联</p>
        <h2>错题放最后，但能跳回课文</h2>
        <p>每条错题都关联到某一课和某个高频考点。点“回到知识点”会展开对应单元。</p>
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

    <p v-else class="empty">这个学科还没有错题。后续把图片放入错题资料文件夹，再在数据里补关联即可。</p>
  </section>
</template>

<script setup>
defineProps({
  wrongQuestions: { type: Array, required: true },
  lessonIndex: { type: Object, required: true }
});

defineEmits(["focus"]);
</script>
