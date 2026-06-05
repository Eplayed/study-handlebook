<template>
  <div>
    <h2>错题本模式</h2>
    <p>新增错题时，先把它连到一个知识点。以后复习错题，系统会提醒先看哪张知识点卡。</p>
    <div class="tool-grid">
      <form class="study-card wrong" @submit.prevent="save">
        <h3>新增一道错题</h3>
        <div class="form-row">
          <label for="wrongTitle">错题标题</label>
          <input id="wrongTitle" v-model.trim="form.title" type="text" placeholder="例如：周长和面积混了">
        </div>
        <div class="form-row">
          <label for="wrongQuestion">题目</label>
          <textarea id="wrongQuestion" v-model.trim="form.question" rows="3" placeholder="把题目关键条件写下来"></textarea>
        </div>
        <div class="form-row">
          <label for="wrongAnswer">正确答案</label>
          <textarea id="wrongAnswer" v-model.trim="form.answer" rows="2" placeholder="写完整答案和单位"></textarea>
        </div>
        <div class="form-row">
          <label for="wrongReason">我为什么错</label>
          <textarea id="wrongReason" v-model.trim="form.reason" rows="2" placeholder="例如：把面积单位写成了厘米"></textarea>
        </div>
        <div class="form-row">
          <label for="wrongCard">关联知识点</label>
          <select id="wrongCard" v-model="form.cardId">
            <option value="">{{ suggestedCard ? `自动建议：${suggestedCard.title}` : "请选择知识点" }}</option>
            <option v-for="card in subject.cards" :key="cardId(card)" :value="cardId(card)">{{ card.title }}</option>
          </select>
        </div>
        <div class="form-row">
          <label for="wrongDue">几天后再做</label>
          <input id="wrongDue" v-model="form.dueDays" type="number" min="1" max="30">
        </div>
        <button class="small-button primary" type="submit">保存错题</button>
      </form>

      <div class="study-card">
        <h3>错题复习规则</h3>
        <ol>
          <li>先选错题对应的知识点。</li>
          <li>重做错题前，先读对应复习卡。</li>
          <li>重做后，再做1道同类题。</li>
        </ol>
        <p class="empty">错题保存在当前浏览器里，不会上传到网络。</p>
      </div>
    </div>

    <h3>已保存错题</h3>
    <div v-if="entries.length === 0" class="empty">还没有错题。做卷子时错一道，就加一道。</div>
    <article v-for="(entry, index) in entries" v-else :key="entry.createdAt + entry.title" class="wrong-entry">
      <h3>{{ entry.title }}</h3>
      <div v-if="linkedCard(entry)" class="linked-card">
        <span class="field-title">这道错题对应的知识点</span>
        <strong>{{ linkedCard(entry).title }}</strong>
        <p>{{ linkedCard(entry).childText }}</p>
        <p><strong>先看易错提醒：</strong>{{ linkedCard(entry).mistake }}</p>
      </div>
      <p v-else class="empty">这道错题还没有关联知识点。建议删除后重新添加并选择知识点。</p>
      <p><strong>题目：</strong>{{ entry.question }}</p>
      <p><strong>答案：</strong>{{ entry.answer }}</p>
      <p><strong>错因：</strong>{{ entry.reason || "还没写错因" }}</p>
      <p><strong>保存：</strong>{{ entry.createdAt }}；<span :class="entry.dueAt <= todayIso() ? 'due' : ''">{{ entry.dueAt <= todayIso() ? "今天该重做" : `下次：${entry.dueAt}` }}</span></p>
      <button class="small-button" type="button" @click="remove(index)">删除</button>
    </article>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { addDays, cardId, readJson, todayIso, writeJson } from "../../utils/storage";

const props = defineProps({
  subject: { type: Object, required: true },
  storageKey: { type: String, required: true }
});

const emit = defineEmits(["changed"]);
const entries = ref(readJson(props.storageKey, []));
const form = reactive({ title: "", question: "", answer: "", reason: "", cardId: "", dueDays: 2 });

watch(() => props.storageKey, () => {
  entries.value = readJson(props.storageKey, []);
  form.cardId = "";
});

const suggestedCard = computed(() => {
  const text = `${form.title} ${form.question} ${form.reason}`.toLowerCase();
  if (!text.trim()) return props.subject.cards[0];
  return props.subject.cards.find((card) => [
    card.title,
    card.childText,
    card.example,
    card.mistake,
    ...(card.how || [])
  ].join(" ").toLowerCase().split(/[，。；：、\s]+/).some((token) => token && text.includes(token))) || props.subject.cards[0];
});

function save() {
  if (!form.title || !form.question || !form.answer) return;
  const linkedCardId = form.cardId || (suggestedCard.value ? cardId(suggestedCard.value) : "");
  entries.value.unshift({
    title: form.title,
    question: form.question,
    answer: form.answer,
    reason: form.reason,
    cardId: linkedCardId,
    createdAt: todayIso(),
    dueAt: addDays(Number(form.dueDays || 2))
  });
  writeJson(props.storageKey, entries.value);
  emit("changed");
  Object.assign(form, { title: "", question: "", answer: "", reason: "", cardId: "", dueDays: 2 });
}

function remove(index) {
  entries.value.splice(index, 1);
  writeJson(props.storageKey, entries.value);
  emit("changed");
}

function linkedCard(entry) {
  return props.subject.cards.find((card) => cardId(card) === entry.cardId);
}
</script>
