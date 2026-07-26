<template>
  <section id="roadmap" class="english-roadmap">
    <div class="section-heading">
      <div>
        <p class="eyebrow">单元</p>
        <h2>单元预览</h2>
      </div>
      <span class="roadmap-count">{{ learnedCount }} / {{ totalWords }} 词</span>
    </div>

    <div class="unit-preview-list">
      <section
        v-for="unit in units"
        :key="unit.id"
        class="unit-preview"
        :class="{ open: unit.id === openUnitId }"
      >
        <button class="unit-preview-summary" type="button" @click="toggleUnit(unit.id)">
          <span class="roadmap-number">{{ unit.title.split(" ")[1] }}</span>
          <span class="roadmap-copy"><strong>{{ unit.title }}</strong><small>{{ unit.page }}</small></span>
          <span class="roadmap-progress">{{ learnedByUnit(unit) }}/{{ unit.words.length }}</span>
        </button>

        <div v-if="unit.id === openUnitId" class="unit-preview-content">
          <p class="unit-preview-theme">{{ unit.title }} · {{ unit.words.length }} 个单词</p>
          <ul class="unit-word-list">
            <li v-for="word in unit.words" :key="word.id" class="unit-word-row">
              <div>
                <strong>{{ word.english }}</strong>
                <span>{{ word.meaning }}</span>
                <small v-if="word.example">{{ word.example }}</small>
              </div>
              <div class="word-preview-actions">
                <button class="word-play-button" type="button" :aria-label="`朗读 ${word.english}`" @click.prevent="speakWord(word)">朗读</button>
                <span v-if="activeAudioKey === word.id && audioStatus" class="preview-audio-status" :class="{ error: audioError }">{{ audioStatus }}</span>
              </div>
            </li>
          </ul>

          <section class="unit-sentence-preview">
            <p class="eyebrow">核心句型</p>
            <p class="preview-prompt">{{ unit.sentence.prompt }}</p>
            <p class="preview-response">{{ unit.sentence.response }}</p>
            <div class="preview-actions">
              <button class="word-play-button" type="button" @click="speakSentence(unit)">朗读句型</button>
              <span v-if="activeAudioKey === `${unit.id}-sentence` && audioStatus" class="preview-audio-status" :class="{ error: audioError }">{{ audioStatus }}</span>
            </div>
            <small>{{ unit.sentence.sourcePage }}</small>
          </section>

          <button class="small-button primary preview-start-button" type="button" @click="$emit('select-unit', unit.id)">学习本单元</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEnglishPronunciation } from "../composables/useEnglishPronunciation.js";

const props = defineProps({
  units: { type: Array, required: true },
  selectedUnitId: { type: String, required: true },
  learnedIds: { type: Array, required: true }
});

defineEmits(["select-unit"]);

const openUnitId = ref(props.selectedUnitId);
const learnedSet = computed(() => new Set(props.learnedIds));
const learnedCount = computed(() => props.units.flatMap((unit) => unit.words).filter((word) => learnedSet.value.has(word.id)).length);
const totalWords = computed(() => props.units.reduce((sum, unit) => sum + unit.words.length, 0));
const { audioStatus, audioError, speak } = useEnglishPronunciation();
const activeAudioKey = ref("");

const learnedByUnit = (unit) => unit.words.filter((word) => learnedSet.value.has(word.id)).length;
const sentenceText = (sentence) => [sentence.prompt, sentence.response].filter(Boolean).join(" ");

function toggleUnit(unitId) {
  openUnitId.value = openUnitId.value === unitId ? "" : unitId;
}

function speakWord(word) {
  activeAudioKey.value = word.id;
  speak(word);
}

function speakSentence(unit) {
  activeAudioKey.value = `${unit.id}-sentence`;
  speak(sentenceText(unit.sentence));
}
</script>
