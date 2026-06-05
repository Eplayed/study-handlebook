<template>
  <div>
    <h2>间隔复习模式</h2>
    <p>会的卡片隔2天再看，不会的明天再看。这样错题和易错点不会只看一遍就忘。</p>
    <div v-if="dueCards.length === 0" class="empty">今天没有到期卡片。可以切到“复习卡”自由查看。</div>
    <article v-for="card in dueCards" v-else :key="cardId(card)" class="spaced-entry">
      <span class="tag important">{{ card.level }}</span>
      <h3>{{ card.title }}</h3>
      <p>{{ card.childText }}</p>
      <p><strong>例题：</strong>{{ card.example }}</p>
      <div class="answer"><strong>答案：</strong>{{ card.answer }}</div>
      <div class="button-row">
        <button class="small-button primary" type="button" @click="schedule(card, 2)">会了，2天后再看</button>
        <button class="small-button" type="button" @click="schedule(card, 1)">还不会，明天再看</button>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { addDays, cardId, readJson, todayIso, writeJson } from "../../utils/storage";

const props = defineProps({
  subject: { type: Object, required: true },
  storageKey: { type: String, required: true }
});

const reviews = ref(readJson(props.storageKey, {}));

watch(() => props.storageKey, () => {
  reviews.value = readJson(props.storageKey, {});
});

const dueCards = computed(() => props.subject.cards.filter((card) => {
  const dueAt = reviews.value[cardId(card)] || todayIso();
  return dueAt <= todayIso();
}));

function schedule(card, days) {
  reviews.value[cardId(card)] = addDays(days);
  writeJson(props.storageKey, reviews.value);
}
</script>
