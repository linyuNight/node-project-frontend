<template>
  <div class="music-list">
    <div class="item" v-for="(item, index) in musicList" :key="index">
      <div>{{ item }}</div>
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

const audioSrc = ref('' as any)

const audioRef = ref(null as any);

onMounted(() => {
  queryMusic({
    userid: globalStore.user.userid
  }).then(res => {
    musicList.value = res.files
  })
})

// 播放音乐
const play = (item: any) => {
  getMusic({
    userid: globalStore.user.userid,
    filename: item,
    path: 'music'
  }).then((res: any) => {
    const blob = new Blob([res]);
    const url = URL.createObjectURL(blob);

    audioSrc.value = url
    nextTick(() => {
      audioRef.value.play()
    })
  }).catch(error => {
    console.error('下载文件失败：', error);
  });
}
</script>

<style lang="less" scoped>
.music-list {
  .item {
    display: flex;
  }
}
</style>