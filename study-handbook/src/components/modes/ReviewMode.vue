<template>
  <div>
    <h2>复习卡模式</h2>
    <div class="tool-grid">
      <div class="study-card" :class="subject.theme">
        <h3>孩子怎么用</h3>
        <ol>
          <li>先读“给孩子的话”。</li>
          <li>照着“怎么做”说一遍步骤。</li>
          <li>遮住答案做例题。</li>
          <li>看“易错提醒”，再做同类题。</li>
        </ol>
      </div>
      <div class="study-card">
        <h3>家长怎么维护</h3>
        <p>每张卡只讲一个考点。新增错题时，也按“考什么、怎么做、例题、答案、易错提醒”写，孩子才看得懂。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subject: { type: Object, required: true }
});
</script>
