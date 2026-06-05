<template>
  <header class="app-header">
    <div>
      <p class="eyebrow">Vue 可持续维护版</p>
      <h1>学习记事本</h1>
      <p class="subtitle">按年级、学科、单元和课文整理知识要点，把错题关联回真正需要补的课文和考点。</p>
    </div>
    <div class="header-actions">
      <button class="icon-button" type="button" title="打印或保存为 PDF" @click="$emit('print')">打印</button>
    </div>
  </header>
</template>

<script setup>
defineEmits(["print"]);
</script>
