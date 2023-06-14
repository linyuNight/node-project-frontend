<template>
  <div class="chat-room transparent-card">
    <router-view :key="route.params.id" v-if="!store.state.roomLoading"/>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
</script>

<style lang="less">
.chat-room {
  flex: 1;
  // background: #fff;
  border-radius: 6px;
}
</style>
