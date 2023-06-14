<template>
  <div class="tools-list">
    <div class="tools-item" v-for="(item, index) in toolsList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
    <video ref="myVideo" class="my-video" autoplay></video>
    <el-button type="primary" @click="showCamera">展示视频</el-button>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'

const toolsList = ref([
  {
    label: 'tool132',
    content: 'tool111111'
  }
])

let myVideoRef = null

onMounted(() => {
  const currentInstance = getCurrentInstance()
  myVideoRef = currentInstance.refs.myVideo
})

const showCamera = () => {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  }).then(res => {
    console.log('测试myVideoRef', myVideoRef)
    console.log('测试res', res)
    myVideoRef.srcObject = res
  }).catch((err) => {
    console.log(err)
  })
}
</script>

<style lang="less">
.tools-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.my-video {
  width: 600px;
  height: 400px;
}
</style>
