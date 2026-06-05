<template>
  <section id="workbench" class="knowledge-workbench">
    <aside class="knowledge-list panel">
      <h2>知识点顺序</h2>
      <p class="note-text">从上往下复习。绿色表示已掌握，红色表示还有错题要重做。</p>
      <button
        v-for="point in knowledgePoints"
        :key="point.id"
        class="knowledge-button"
        :class="{ active: point.id === activeId, mastered: isMastered(point.id), due: dueCount(point.id) > 0 }"
        type="button"
        @click="$emit('select', point.id)"
      >
        <span>{{ point.stage }}</span>
        <strong>{{ point.title }}</strong>
        <small>{{ dueCount(point.id) ? `${dueCount(point.id)} 道错题到期` : point.priority }}</small>
      </button>
    </aside>

    <article v-if="activePoint" class="knowledge-detail panel">
      <div class="detail-header">
        <div>
          <p class="eyebrow">{{ activePoint.stage }} / {{ activePoint.source }}</p>
          <h2>{{ activePoint.title }}</h2>
          <p>{{ activePoint.childGoal }}</p>
        </div>
        <button class="small-button primary" type="button" @click="$emit('toggle-mastered', activePoint.id)">
          {{ isMastered(activePoint.id) ? "已掌握，取消标记" : "我掌握了" }}
        </button>
      </div>

      <section class="learning-section">
        <h3>1. 先把知识点学明白</h3>
        <p class="explain-text">{{ activePoint.explain }}</p>
        <ol class="step-list">
          <li v-for="step in activePoint.steps" :key="step">{{ step }}</li>
        </ol>
      </section>

      <section class="learning-section">
        <h3>2. 看例题怎么做</h3>
        <div class="example-grid">
          <article v-for="example in activePoint.workedExamples" :key="example.question" class="example-box">
            <strong>题目：{{ example.question }}</strong>
            <p><strong>答案：</strong>{{ example.answer }}</p>
            <p>{{ example.explanation }}</p>
          </article>
        </div>
      </section>

      <section class="learning-section">
        <h3>3. 复盘真实错题</h3>
        <div class="wrong-grid">
          <article v-for="wrong in combinedWrongQuestions" :key="wrong.question + wrong.mistake" class="wrong-box">
            <strong>{{ wrong.question }}</strong>
            <p><span class="field-title">错在哪里</span>{{ wrong.mistake }}</p>
            <p><span class="field-title">订正方法</span>{{ wrong.fix }}</p>
          </article>
        </div>
      </section>

      <section class="learning-section">
        <h3>4. 做同类题</h3>
        <div class="practice-list">
          <article v-for="(item, index) in activePoint.practice" :key="item.question" class="practice-item">
            <div>
              <strong>第{{ index + 1 }}题：{{ item.question }}</strong>
              <p class="note-text">{{ item.check }}</p>
            </div>
            <button class="small-button" type="button" @click="toggleAnswer(index)">
              {{ visibleAnswers[index] ? "隐藏答案" : "看答案" }}
            </button>
            <p v-if="visibleAnswers[index]" class="answer-line">答案：{{ item.answer }}</p>
          </article>
        </div>
      </section>

      <section class="learning-section">
        <h3>5. 掌握标准</h3>
        <ul>
          <li v-for="item in activePoint.mastery" :key="item">{{ item }}</li>
        </ul>
      </section>
    </article>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  knowledgePoints: { type: Array, required: true },
  activeId: { type: String, required: true },
  savedWrongs: { type: Array, required: true },
  mastered: { type: Object, required: true }
});

defineEmits(["select", "toggle-mastered"]);

const visibleAnswers = ref({});
const activePoint = computed(() => props.knowledgePoints.find((item) => item.id === props.activeId) || props.knowledgePoints[0]);

const combinedWrongQuestions = computed(() => {
  if (!activePoint.value) return [];
  const localWrong = props.savedWrongs
    .filter((entry) => entry.knowledgeId === activePoint.value.id)
    .map((entry) => ({
      question: entry.question,
      mistake: entry.reason || "这道题还没有写错因。",
      fix: entry.answer
    }));
  return [...(activePoint.value.wrongQuestions || []), ...localWrong];
});

watch(() => props.activeId, () => {
  visibleAnswers.value = {};
});

function toggleAnswer(index) {
  visibleAnswers.value[index] = !visibleAnswers.value[index];
}

function isMastered(id) {
  return Boolean(props.mastered[id]);
}

function dueCount(id) {
  const today = new Date().toISOString().slice(0, 10);
  return props.savedWrongs.filter((entry) => entry.knowledgeId === id && entry.dueAt <= today).length;
}
</script>
