<template>
  <div>云数据上传</div>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :action="`${baseUrl}/upload_clound_data`"
    :auto-upload="false"
    :headers="{
      Authorization: authorization
    }"
    multiple
    :data="{
      userid: globalStore.user.userid
    }"
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
  <div class="files-contain">
    <div class="total transparent-card" v-for="(item, index) in fileList" :key="index">
      <el-icon class="folder-icon"><Files /></el-icon>
      <div>{{ item }}</div>
      <div @click="openDownload(item)">下载</div>
      <div @click="play(item)">播放</div>
    </div>    
  </div>
  <div>
    <video class="play-video" :src="videoSrc" controls></video>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import { baseUrl } from '@/config/index'
import { GlobalStore } from "@/stores";
import  { queryCloudData, downloadCloudFile, getVideo } from '@/api/index'

const authorization = localStorage.getItem('token')

const globalStore = GlobalStore();

const uploadRef = ref<UploadInstance>()

const fileList = ref([] as any)

const videoSrc = ref('' as any)

// 获取文件列表
const getFileList = () => {
  queryCloudData(globalStore.user.userid).then((res: any) => {
    fileList.value = res.files.map((val: any) => {
      return val.name
    })
  })
}

onBeforeMount(() => {
  getFileList()
})

// 上传成功回调
const handlerSuccess = () => {
  getFileList()
}

// 上传
const submitUpload = () => {
  uploadRef.value!.submit()
}

const downloadFile = (item: any) => {
  // // 后端文件下载路由，这种方式无法携带token，无法鉴权
  // const backendDownloadUrl = `${baseUrl}/download_clound_file?userid=${globalStore.user.userid}&filename=${item}`;

  // // 创建下载链接
  // const link: any = document.createElement('a');
  // link.href = backendDownloadUrl;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  downloadCloudFile({
    userid: globalStore.user.userid,
    filename: item
  }).then((res: any) => {
    const blob = new Blob([res]);
    const url = URL.createObjectURL(blob);

    // 创建下载链接
    const link = document.createElement('a');
    link.href = url;
    link.download = item; // 设置下载的文件名，可根据需要进行修改
    link.click();

    // 释放URL对象
    URL.revokeObjectURL(url);
  }).catch(error => {
    console.error('下载文件失败：', error);
  });
}

const openDownload = (item: any) => {
  ElMessageBox.confirm(
    '下载文件?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      // ElMessage({
      //   type: 'success',
      //   message: 'Delete completed',
      // })

      downloadFile(item)
    })
    .catch((err: any) => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
      console.log(err)
    })
}

const play = (item: any) => {
  getVideo({
    userid: globalStore.user.userid,
    filename: item
  }).then((res: any) => {
    const blob = new Blob([res]);
    const url = URL.createObjectURL(blob);

    videoSrc.value = url
  }).catch(error => {
    console.error('下载文件失败：', error);
  });
}

</script>

<style lang="less" scoped>
.files-contain {
  display: flex;
  .total {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 12px;
    margin-right: 14px;
    margin-bottom: 14px;
    cursor: pointer;
    .folder-icon {
      margin-bottom: 6px;
      font-size: 26px;
    }
  }
}
.play-video {
  width: 600px;
  height: 400px;
}
</style>