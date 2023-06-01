<template>
  <div class="header">
    <div 
      class="header-item" 
      v-for="(item, index) in headerList" 
      :key="index"
      @click="handlerHeaderClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
  <div class="main">
    <router-view />
  </div>
  <div class="footer"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const headerList = ref([
  {
    label: 'diary',
    name: 'diary'
  },
  {
    label: 'tools',
    name: 'tools'
  }
])

const router = useRouter()

const handlerHeaderClick = (item) => {
  router.push({
    name: item.name
  })
}
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