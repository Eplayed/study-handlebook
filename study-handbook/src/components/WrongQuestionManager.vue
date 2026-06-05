<template>
  <section id="wrong-manager" class="panel">
    <h2>新增错题</h2>
    <p class="note-text">错题必须挂到知识点下面。这样复习错题时，会先带出对应知识点，再做同类题。</p>

    <form class="wrong-form" @submit.prevent="save">
      <label>
        知识点
        <select v-model="form.knowledgeId">
          <option v-for="point in knowledgePoints" :key="point.id" :value="point.id">{{ point.title }}</option>
        </select>
      </label>
      <label>
        题目
        <textarea v-model.trim="form.question" rows="3" placeholder="例如：3034÷82 竖式商的位置写错"></textarea>
      </label>
      <label>
        正确答案/订正方法
        <textarea v-model.trim="form.answer" rows="2" placeholder="例如：商是37，先看303够除82，商写在十位"></textarea>
      </label>
      <label>
        错因
        <textarea v-model.trim="form.reason" rows="2" placeholder="例如：没有判断商是几位数"></textarea>
      </label>
      <label>
        几天后重做
        <input v-model="form.dueDays" type="number" min="1" max="30">
      </label>
      <button class="small-button primary" type="submit">保存错题</button>
    </form>

    <div class="saved-wrongs">
      <h3>已保存错题</h3>
      <p v-if="items.length === 0" class="empty">还没有新增错题。先把本周卷子里最容易错的一道加进来。</p>
      <article v-for="item in items" v-else :key="item.id" class="wrong-entry">
        <strong>{{ knowledgeTitle(item.knowledgeId) }}</strong>
        <p>{{ item.question }}</p>
        <p><strong>订正：</strong>{{ item.answer }}</p>
        <p><strong>错因：</strong>{{ item.reason || "还没写错因" }}</p>
        <p><strong>下次重做：</strong>{{ item.dueAt }}</p>
        <button class="small-button" type="button" @click="$emit('remove', item.id)">删除</button>
      </article>
    </div>
  </section>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  knowledgePoints: { type: Array, required: true },
  activeId: { type: String, required: true },
  items: { type: Array, required: true }
});

const emit = defineEmits(["add", "remove"]);
const form = reactive({ knowledgeId: props.activeId, question: "", answer: "", reason: "", dueDays: 2 });

watch(() => props.activeId, (value) => {
  form.knowledgeId = value;
});

function save() {
  if (!form.knowledgeId || !form.question || !form.answer) return;
  emit("add", { ...form });
  Object.assign(form, { knowledgeId: props.activeId, question: "", answer: "", reason: "", dueDays: 2 });
}

function knowledgeTitle(id) {
  return props.knowledgePoints.find((item) => item.id === id)?.title || "未关联知识点";
}
</script>
