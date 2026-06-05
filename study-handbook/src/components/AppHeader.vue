<template>
  <header class="app-header">
    <div>
      <p class="eyebrow">Vue 可持续维护版</p>
      <h1>小学期末复习手册</h1>
      <p class="subtitle">把教材重点、卷面考点、真实错题和每日复习安排放在一个可以长期更新的网页里。</p>
    </div>
    <div class="header-actions">
      <button class="icon-button" type="button" title="打印或保存为 PDF" @click="$emit('print')">打印</button>
      <button class="icon-button secondary" type="button" title="清空本页打卡" @click="$emit('reset-checks')">清空打卡</button>
    </div>
  </header>
</template>

<script setup>
defineEmits(["print", "reset-checks"]);
</script>
