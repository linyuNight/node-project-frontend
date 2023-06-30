<template>
  <div>node-project上传</div>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :action="`${baseUrl}/upload`"
    :auto-upload="false"
    :headers="{
      Authorization: authorization
    }"
    multiple
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
  <div>后台管理上传</div>
  <el-upload
    ref="uploadManagerRef"
    class="upload-demo"
    :action="`${baseUrl}/upload_manager`"
    :auto-upload="false"
    :headers="{
      Authorization: authorization
    }"
    multiple
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUploadManager">
      upload to server
    </el-button>

    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import { baseUrl } from '@/config/index'

const authorization = localStorage.getItem('token')

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}

const uploadManagerRef = ref<UploadInstance>()

const submitUploadManager = () => {
  uploadManagerRef.value!.submit()
}
</script>

<style lang="less" scoped>

</style>