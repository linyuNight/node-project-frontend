<template>
  <div class="tools-list">
    <div class="tools-item" v-for="(item, index) in toolsList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toolsList = ref([
  {
    label: 'tool1',
    content: 'tool111111'  
  }
])
</script>

<style lang="less">
.tools-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>