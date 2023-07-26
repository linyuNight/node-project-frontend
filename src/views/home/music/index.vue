<template>
  <div class="music">
    <div>音乐上传</div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :action="`${baseUrl}/upload_music`"
      :auto-upload="false"
      :headers="{
        Authorization: authorization
      }"
      multiple
      :data="uploadData"
      :on-success="handlerSuccess"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>

      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>

      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <div class="music-list">
      <div class="item" v-for="(item, index) in musicList" :key="index">
        <div>{{ item.name }}</div>
        <el-button type="primary" @click="play(item)">播放</el-button>
      </div>
    </div>
    <audio ref="audioRef" :src="audioSrc" controls></audio>
  </div>  
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import { baseUrl } from '@/config/index'
import type { UploadInstance } from 'element-plus'
import {
  queryMusic,
  getMusic
} from '@/api'
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();

const authorization = localStorage.getItem('token')

const uploadData = ref({} as any)

const musicList = ref([] as any)

const audioRef = ref(null as any);

const uploadRef = ref<UploadInstance>()

onMounted(() => {
  getData()
})

const getData = () => {
  queryMusic({
    userid: globalStore.user.userid
  }).then((res: any) => {
    console.log('test res', res)
    musicList.value = res.files
  })
}

// 上传成功回调
const handlerSuccess = () => {
  getData()
}

// 上传
const submitUpload = () => {
  uploadRef.value!.submit()
}

const audioSrc = ref('' as any); // 后端提供的音频接口

// 播放音乐
const play = async (item: any) => {
  audioSrc.value = getMusic(item.name)

  nextTick(() => {
    audioRef.value.play()
  })
  // try {
  //   const response: any = await getMusic({
  //     userid: globalStore.user.userid,
  //     filename: item.name,
  //     path: 'music'
  //   });

  //   if (!response.ok) {
  //     throw new Error('请求失败');
  //   }

  //   const blob = await response.blob();
  //   const url = URL.createObjectURL(blob);

  //   audioSrc.value = url
  //   nextTick(() => {
  //     audioRef.value.play()
  //   })
  // } catch (error) {
  //   console.error('播放音频失败：', error);
  // }
}
</script>

<style lang="less" scoped>
.music-list {
  .item {
    display: flex;
  }
}
</style>