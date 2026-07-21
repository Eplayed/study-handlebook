<template>
  <section id="summer-study" class="english-session" aria-live="polite">
    <div class="session-heading">
      <div>
        <p class="eyebrow">{{ mode === "review" ? "错词本" : "今日单词" }}</p>
        <h2>{{ unit.title }}</h2>
      </div>
      <span class="session-step">{{ stepLabel }}</span>
    </div>

    <div v-if="step === 'learn'" class="word-stage">
      <p class="word-count">第 {{ wordIndex + 1 }} / {{ words.length }} 个</p>
      <h3 class="english-word">{{ currentWord.english }}</h3>
      <p class="word-meaning">{{ currentWord.meaning }}</p>
      <p v-if="currentWord.example" class="word-example">{{ currentWord.example }}</p>
      <button class="speak-button" type="button" @click="speak(currentWord)">朗读单词</button>
      <span v-if="audioStatus" class="audio-status" :class="{ error: audioError }">{{ audioStatus }}</span>
      <span v-if="audioSources.length" class="audio-source-list">
        <a v-for="(source, index) in audioSources" :key="source.url" class="audio-source" :href="source.sourceUrl" target="_blank" rel="noreferrer">在线音源{{ audioSources.length > 1 ? ` ${index + 1}` : "" }}{{ source.licenseName ? ` · ${source.licenseName}` : "" }}</a>
      </span>
      <div class="session-actions split-actions">
        <button class="small-button" type="button" :disabled="wordIndex === 0" @click="previousWord">上一个</button>
        <button v-if="wordIndex < words.length - 1" class="small-button primary" type="button" @click="nextWord">下一个</button>
        <button v-else class="small-button primary" type="button" @click="startDictation">开始默写</button>
      </div>
    </div>

    <div v-else-if="step === 'dictation'" class="word-stage dictation-stage">
      <p class="word-count">默写第 {{ wordIndex + 1 }} / {{ words.length }} 个</p>
      <h3>{{ currentWord.meaning }}</h3>
      <label class="sr-only" for="wordAnswer">英文答案</label>
      <input id="wordAnswer" v-model="answer" class="dictation-input" autocomplete="off" autocapitalize="none" spellcheck="false" :disabled="Boolean(answerResult)" @keydown.enter.prevent="checkWord" />
      <p v-if="answerResult === 'correct'" class="answer-feedback correct">写对了，{{ currentWord.english }}。</p>
      <p v-else-if="answerResult === 'wrong'" class="answer-feedback wrong">这次没关系，正确拼写是：<strong>{{ currentWord.english }}</strong></p>
      <div class="session-actions split-actions">
        <button v-if="!answerResult" class="small-button" type="button" @click="markForgotten">想不起来</button>
        <button v-if="!answerResult" class="small-button primary" type="button" @click="checkWord">检查</button>
        <button v-else class="small-button primary" type="button" @click="nextDictation">{{ wordIndex === words.length - 1 ? "练句型" : "下一词" }}</button>
      </div>
    </div>

    <div v-else-if="step === 'sentence'" class="word-stage sentence-stage">
      <p class="word-count">句型练习</p>
      <h3>{{ sentence.title }}</h3>
      <p class="sentence-chinese">{{ sentence.chinese }}</p>
      <p class="sentence-fill"><span>{{ sentence.before }}</span><input v-model="sentenceAnswer" class="sentence-input" autocomplete="off" autocapitalize="none" spellcheck="false" :disabled="Boolean(sentenceResult)" /><span>{{ sentence.after }}</span></p>
      <p v-if="sentenceResult === 'correct'" class="answer-feedback correct">句型写对了。</p>
      <p v-else-if="sentenceResult === 'wrong'" class="answer-feedback wrong">正确答案：<strong>{{ sentence.model }}</strong></p>
      <div class="session-actions split-actions">
        <button class="small-button" type="button" @click="speak(sentence.model)">朗读</button>
        <span v-if="audioStatus" class="audio-status" :class="{ error: audioError }">{{ audioStatus }}</span>
        <span v-if="audioSources.length" class="audio-source-list">
          <a v-for="(source, index) in audioSources" :key="source.url" class="audio-source" :href="source.sourceUrl" target="_blank" rel="noreferrer">在线音源{{ audioSources.length > 1 ? ` ${index + 1}` : "" }}{{ source.licenseName ? ` · ${source.licenseName}` : "" }}</a>
        </span>
        <button v-if="!sentenceResult" class="small-button primary" type="button" @click="checkSentence">检查</button>
        <button v-else class="small-button primary" type="button" @click="finish">完成这一组</button>
      </div>
    </div>

    <div v-else class="word-stage finish-stage">
      <p class="eyebrow">今天完成</p>
      <h3>这一组已经学完。</h3>
      <p v-if="missedWords.length">有 {{ missedWords.length }} 个词需要再复习，已经放进“错词回炉”。</p>
      <p v-else>单词默写和句型都完成了。明天可以继续下一组。</p>
      <button class="small-button primary" type="button" @click="$emit('restart')">再练一遍</button>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { findOnlinePronunciations } from "../services/onlinePronunciation.js";

const props = defineProps({
  words: { type: Array, required: true },
  unit: { type: Object, required: true },
  sentence: { type: Object, required: true },
  mode: { type: String, default: "daily" }
});

const emit = defineEmits(["complete", "restart"]);
const step = ref("learn");
const wordIndex = ref(0);
const answer = ref("");
const answerResult = ref("");
const sentenceAnswer = ref("");
const sentenceResult = ref("");
const missedIds = ref([]);
const audioStatus = ref("");
const audioError = ref(false);
const audioSources = ref([]);
let audioPlayer = null;
let playbackId = 0;

const currentWord = computed(() => props.words[wordIndex.value]);
const missedWords = computed(() => props.words.filter((item) => missedIds.value.includes(item.id)));
const stepLabel = computed(() => ({ learn: "1 认识", dictation: "2 默写", sentence: "3 句型", done: "完成" }[step.value]));

watch(() => props.words, resetSession, { deep: true });

function normalize(value) {
  return value.toLowerCase().trim().replace(/[’‘]/g, "'").replace(/[-\s]+/g, " ");
}

async function speak(item) {
  const text = typeof item === "string" ? item : item.english;
  stopAudio();
  const activePlaybackId = playbackId;
  audioStatus.value = "加载在线音源";
  audioError.value = false;
  audioSources.value = [];

  if (typeof item === "object" && item.audioUrl) {
    playOnlineAudio([{ url: item.audioUrl, sourceUrl: "", licenseName: "" }], text, activePlaybackId);
    return;
  }

  const pronunciations = await findOnlinePronunciations(text);
  if (activePlaybackId !== playbackId) return;
  if (pronunciations.length) {
    playOnlineAudio(pronunciations, text, activePlaybackId);
    return;
  }

  speakWithDeviceVoice(text);
}

function playOnlineAudio(sources, fallbackText, activePlaybackId, index = 0, playedAny = false) {
  if (activePlaybackId !== playbackId) return;
  if (index >= sources.length) {
    audioPlayer = null;
    if (!playedAny) {
      audioSources.value = [];
      speakWithDeviceVoice(fallbackText);
      return;
    }
    audioStatus.value = "";
    return;
  }

  const source = sources[index];
  audioSources.value = sources.filter((item) => item.sourceUrl);
  audioPlayer = new Audio(source.url);
  let hasFailed = false;
  let playedCurrent = false;
  const nextAudio = () => {
    if (hasFailed || activePlaybackId !== playbackId) return;
    hasFailed = true;
    playOnlineAudio(sources, fallbackText, activePlaybackId, index + 1, playedAny || playedCurrent);
  };
  audioPlayer.onplay = () => {
    if (activePlaybackId !== playbackId) return;
    playedCurrent = true;
    audioError.value = false;
    audioStatus.value = sources.length > 1 ? `正在朗读 ${index + 1} / ${sources.length}` : "正在朗读";
  };
  audioPlayer.onended = nextAudio;
  audioPlayer.onerror = nextAudio;
  audioPlayer.play().catch(nextAudio);
}

function speakWithDeviceVoice(text) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    audioError.value = true;
    audioStatus.value = "此设备不支持朗读";
    return;
  }

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = synth.getVoices().find((item) => item.lang === "en-US") || synth.getVoices().find((item) => item.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang || "en-US";
  utterance.rate = 0.8;
  utterance.onstart = () => { audioError.value = false; audioStatus.value = "正在朗读"; };
  utterance.onend = () => { audioStatus.value = ""; };
  utterance.onerror = () => { audioError.value = true; audioStatus.value = "朗读没有播放，请检查设备音量"; };

  synth.cancel();
  synth.resume();
  window.setTimeout(() => synth.speak(utterance), 20);
}

function stopAudio() {
  playbackId += 1;
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer = null;
  }
  window.speechSynthesis?.cancel();
}

function resetSession() {
  step.value = "learn";
  wordIndex.value = 0;
  answer.value = "";
  answerResult.value = "";
  sentenceAnswer.value = "";
  sentenceResult.value = "";
  missedIds.value = [];
  audioStatus.value = "";
  audioError.value = false;
  audioSources.value = [];
}

onBeforeUnmount(stopAudio);

function clearAudioState() {
  stopAudio();
  audioStatus.value = "";
  audioError.value = false;
  audioSources.value = [];
}

function previousWord() {
  clearAudioState();
  wordIndex.value -= 1;
}

function nextWord() {
  clearAudioState();
  wordIndex.value += 1;
}
function startDictation() { wordIndex.value = 0; step.value = "dictation"; }

function rememberMistake() {
  if (!missedIds.value.includes(currentWord.value.id)) missedIds.value = [...missedIds.value, currentWord.value.id];
}

function checkWord() {
  if (!answer.value.trim()) return;
  answerResult.value = normalize(answer.value) === normalize(currentWord.value.english) ? "correct" : "wrong";
  if (answerResult.value === "wrong") rememberMistake();
}

function markForgotten() {
  rememberMistake();
  answerResult.value = "wrong";
}

function nextDictation() {
  if (wordIndex.value === props.words.length - 1) {
    step.value = "sentence";
    return;
  }
  wordIndex.value += 1;
  answer.value = "";
  answerResult.value = "";
}

function checkSentence() {
  if (!sentenceAnswer.value.trim()) return;
  sentenceResult.value = normalize(sentenceAnswer.value) === normalize(props.sentence.answer) ? "correct" : "wrong";
}

function finish() {
  step.value = "done";
  emit("complete", { wordIds: props.words.map((item) => item.id), missedIds: missedIds.value, sentenceCorrect: sentenceResult.value === "correct" });
}
</script>
