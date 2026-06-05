<template>
  <section id="checklist" class="panel">
    <h2>每日打卡</h2>
    <div class="checklist">
      <label v-for="item in items" :key="item" class="check-item">
        <input type="checkbox" :checked="isChecked(item)" @change="$emit('set-checked', item, $event.target.checked)">
        <span>{{ item }}</span>
      </label>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  isChecked: { type: Function, required: true }
});

defineEmits(["set-checked"]);
</script>
