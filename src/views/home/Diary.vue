<template>
  <div class="diary-list">
    <div class="diary-item" v-for="(item, index) in diaryList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const diaryList = ref([
  {
    label: 'text1',
    content: 'text111111'  
  }
])
</script>

<style lang="less">
.diary-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>