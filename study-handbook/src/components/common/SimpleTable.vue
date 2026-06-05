<template>
  <div v-if="rows.length === 0" class="empty">
    这里还没有内容。以后把资料加到 content.js，页面会自动显示。
  </div>
  <table v-else>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true }
});
</script>
