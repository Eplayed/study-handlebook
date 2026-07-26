import { onBeforeUnmount, ref } from "vue";
import { findOnlinePronunciations } from "../services/onlinePronunciation.js";

export function useEnglishPronunciation() {
  const audioStatus = ref("");
  const audioError = ref(false);
  const audioSources = ref([]);
  let audioPlayer = null;
  let playbackId = 0;

  function clearPronunciation() {
    stopAudio();
    audioStatus.value = "";
    audioError.value = false;
    audioSources.value = [];
  }

  function speak(item) {
    const text = typeof item === "string" ? item : item.english;
    stopAudio();
    const activePlaybackId = playbackId;
    audioStatus.value = "加载在线音源";
    audioError.value = false;
    audioSources.value = [];

    const isSentence = typeof item === "string";
    const sources = typeof item === "object" && item.audioUrl
      ? [{ url: item.audioUrl, sourceUrl: "", licenseName: "" }]
      : findOnlinePronunciations(text, { sentence: isSentence });

    if (sources.length) {
      playOnlineAudio(sources, text, activePlaybackId);
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
    let hasFinished = false;
    let playedCurrent = false;
    const nextAudio = () => {
      if (hasFinished || activePlaybackId !== playbackId) return;
      hasFinished = true;
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

  onBeforeUnmount(stopAudio);

  return { audioStatus, audioError, audioSources, clearPronunciation, speak };
}
