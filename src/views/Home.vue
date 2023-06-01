<template>
  <div class="header">
    <div class="header-item" v-for="(item, index) in headerList" :key="index">{{ item.label }}</div>
  </div>
  <div class="main"></div>
  <div class="footer"></div>
</template>

<script setup>
import { ref } from 'vue'

const headerList = ref([
  {
    label: 'diary'
  },
  {
    label: 'tools'
  }
])
</script>

<style lang="less">
.header {
  display: flex;
  border-bottom: 1px solid #ccc;
  .header-item {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      background: #ffc;
    }
  }
}
</style>