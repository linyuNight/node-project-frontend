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
    <button type="button" @click="logout">logout</button>
  </div>
  <div class="main">
    <router-view />
  </div>
  <div class="footer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser } from '@/api/index.js'
import { useStore } from 'vuex'

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

onMounted(() => {
  const store = useStore()

  getCurrentUser().then(res => {
    console.log('测试用户', res)
    if (res.username) {
      store.state.user = {
        username: res.username
      }
    }
  }).catch(err => {
    console.log(err)
  })
})

const handlerHeaderClick = (item) => {
  router.push({
    name: item.name
  })
}

const logout = () => {
  localStorage.removeItem('token')

  router.push({
    name: 'login'
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
