<template>
  <div>
    <h2>每日小测模式</h2>
    <p>先遮住答案做题，再点“显示答案”。每天做5-10题就够，关键是订正。</p>
    <div v-if="practice.length === 0" class="empty">这个学科还没有小测题。可以在 content.js 的 practice 里添加。</div>
    <article v-for="(row, index) in practice" v-else :key="row[0]" class="quiz-entry">
      <h3>第{{ index + 1 }}题</h3>
      <p>{{ row[0] }}</p>
      <button class="small-button answer-toggle" type="button" @click="visible[index] = !visible[index]">
        {{ visible[index] ? "隐藏答案" : "显示答案" }}
      </button>
      <div v-if="visible[index]" class="answer">
        <p><strong>答案：</strong>{{ row[1] }}</p>
        <p><strong>检查点：</strong>{{ row[2] || "" }}</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  practice: { type: Array, required: true }
});

const visible = ref({});
</script>
