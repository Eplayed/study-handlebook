<template>
  <section id="notebook" class="english-notebook">
    <section class="summer-intro">
      <div>
        <p class="eyebrow">{{ selectedUnit.title }}</p>
        <h2>今天学单词</h2>
      </div>
      <div class="daily-size" aria-label="每天学习数量">
        <button v-for="size in [5, 10]" :key="size" type="button" :class="{ active: targetSize === size }" @click="targetSize = size">{{ size }} 词</button>
      </div>
    </section>

    <EnglishWordSession
      v-if="sessionWords.length"
      :key="sessionKey"
      :words="sessionWords"
      :unit="sessionUnit"
      :sentence="sessionUnit.sentence"
      :mode="sessionMode"
      @complete="completeSession"
      @restart="restartSession"
    />
    <section v-else class="all-done">
      <p class="eyebrow">这一单元完成</p>
      <h2>{{ selectedUnit.title }} 的单词已经学完了。</h2>
      <button v-if="nextUnit" class="small-button primary" type="button" @click="selectUnit(nextUnit.id)">学习 {{ nextUnit.title }}</button>
      <p v-else>整册主题词都已经完成，可以用下方路线选择任意单元复习。</p>
    </section>

    <EnglishMistakeBook :words="allWords" :mistakes="progress.mistakes" @review="startReview" />
    <EnglishRoadmap :units="subject.study.units" :selected-unit-id="selectedUnitId" :learned-ids="progress.learnedIds" @select-unit="selectUnit" />
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import EnglishMistakeBook from "./EnglishMistakeBook.vue";
import EnglishRoadmap from "./EnglishRoadmap.vue";
import EnglishWordSession from "./EnglishWordSession.vue";

const props = defineProps({ subject: { type: Object, required: true } });
const storageKey = "study-handbook:grade4-english-summer:v1";
const targetSize = ref(5);
const selectedUnitId = ref(props.subject.study.units[0].id);
const sessionMode = ref("daily");
const sessionKey = ref(0);
const progress = ref(loadProgress());

const allWords = computed(() => props.subject.study.units.flatMap((unit) => unit.words));
const wordById = computed(() => new Map(allWords.value.map((word) => [word.id, word])));
const selectedUnit = computed(() => props.subject.study.units.find((unit) => unit.id === selectedUnitId.value) || props.subject.study.units[0]);
const learnedSet = computed(() => new Set(progress.value.learnedIds));
const freshWords = computed(() => selectedUnit.value.words.filter((word) => !learnedSet.value.has(word.id)).slice(0, targetSize.value));
const reviewWords = computed(() => Object.keys(progress.value.mistakes).map((id) => wordById.value.get(id)).filter(Boolean));
const sessionWords = computed(() => sessionMode.value === "review" ? reviewWords.value.slice(0, targetSize.value) : freshWords.value);
const sessionUnit = computed(() => sessionMode.value === "review" ? findUnitForWord(sessionWords.value[0]) || selectedUnit.value : selectedUnit.value);
const nextUnit = computed(() => props.subject.study.units.find((unit) => unit.words.some((word) => !learnedSet.value.has(word.id)) && unit.id !== selectedUnitId.value));

watch(progress, saveProgress, { deep: true });

function loadProgress() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : null;
    return { learnedIds: parsed?.learnedIds || [], mistakes: parsed?.mistakes || {}, sessions: parsed?.sessions || [] };
  } catch {
    return { learnedIds: [], mistakes: {}, sessions: [] };
  }
}

function saveProgress(value) {
  try { window.localStorage.setItem(storageKey, JSON.stringify(value)); } catch { /* 本机存储不可用时，当前页面仍可学习。 */ }
}

function findUnitForWord(word) {
  return props.subject.study.units.find((unit) => unit.words.some((item) => item.id === word?.id));
}

function selectUnit(unitId) {
  selectedUnitId.value = unitId;
  sessionMode.value = "daily";
  sessionKey.value += 1;
  document.getElementById("summer-study")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startReview() {
  sessionMode.value = "review";
  sessionKey.value += 1;
  document.getElementById("summer-study")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function restartSession() { sessionKey.value += 1; }

function completeSession({ wordIds, missedIds, sentenceCorrect }) {
  const missed = new Set(missedIds);
  const today = new Date().toISOString().slice(0, 10);
  const mistakes = { ...progress.value.mistakes };

  for (const id of wordIds) {
    if (sessionMode.value === "daily" && !progress.value.learnedIds.includes(id)) progress.value.learnedIds.push(id);
    if (missed.has(id)) mistakes[id] = { count: (mistakes[id]?.count || 0) + 1, lastWrongAt: today };
    else if (sessionMode.value === "review") delete mistakes[id];
  }

  progress.value.mistakes = mistakes;
  progress.value.sessions.push({ date: today, unitId: sessionUnit.value.id, mode: sessionMode.value, wordIds, missedIds, sentenceCorrect });
  if (progress.value.sessions.length > 80) progress.value.sessions.shift();
}
</script>
