<template>
  <div class="music-list">
    <div class="item" v-for="(item, index) in musicList" :key="index">
      <div>{{ item.name }}</div>
      <el-button type="primary" @click="play(item)">播放</el-button>
    </div>
  </div>
  <audio ref="audioRef" :src="audioSrc" controls></audio>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import {
  queryMusic,
  getMusic
} from '@/api'
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();

const musicList = ref([] as any)

const audioRef = ref(null as any);

onMounted(() => {
  queryMusic({
    userid: globalStore.user.userid
  }).then(res => {
    console.log('test res', res)
    musicList.value = res.files
  })
})

const audioSrc = ref('' as any); // 后端提供的音频接口

// 播放音乐
const play = async (item: any) => {
  try {
    const response: any = await getMusic({
      userid: globalStore.user.userid,
      filename: item.name,
      path: 'music'
    });

    if (!response.ok) {
      throw new Error('请求失败');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    audioSrc.value = url
    nextTick(() => {
      audioRef.value.play()
    })
  } catch (error) {
    console.error('播放音频失败：', error);
  }
}
</script>

<style lang="less" scoped>
.music-list {
  .item {
    display: flex;
  }
}
</style>