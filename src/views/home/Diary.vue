<template>
  <div class="diary-list">
    <div class="diary-item" v-for="(item, index) in diaryList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
  <div @click="handlerClick">click</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const diaryList = ref([
  {
    label: 'text1',
    content: 'text111111'  
  }
])

const handlerClick = () => {
  axios.get('http://127.0.0.1:3001/test').then(res => {
    console.log('测试res', res)
  })
}
</script>

<style lang="less">
.diary-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>