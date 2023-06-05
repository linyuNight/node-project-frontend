<template>
  <div class="diary-list">
    <div class="diary-item" v-for="(item, index) in diaryList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
  <input type="text" />
  <div @click="handlerClick">click</div>
  username:<input v-model="user.username" type="text" />
  ps:<input v-model="user.password" type="text" />
  <div @click="handlerRegister">register</div>
  <div @click="handlerCheck">check</div>
  <div>对比</div>
  username:<input v-model="login.username" type="text" />
  ps:<input v-model="login.password" type="text" />
  <div @click="handlerLogin">login</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { io } from "socket.io-client";

const diaryList = ref([
  {
    label: 'text1',
    content: 'text111111'  
  }
])

const user = ref({
  username: '',
  password: ''
})

const login = ref({
  username: '',
  password: ''
})

const socket = io('http://127.0.0.1:3001');
// socket.connect();

const handlerClick = () => {
  axios.get('http://127.0.0.1:3001/test').then(res => {
    console.log('测试res', res)
  })

  // socket.emit('aaa', 888);
  
  // console.log(123)
}

// 注册
const handlerRegister = () => {
  console.log('测试user', user.value.username)
  axios.post('http://127.0.0.1:3001/register', {
    username: user.value.username,
    password: user.value.password
  }).then(res => {
    console.log('测试post', res)
  })
}

const handlerCheck = () => {
  axios.get('http://127.0.0.1:3001/check').then(res => {
    console.log('测试res', res)
  })
}

const handlerLogin = () => {
  axios.post('http://127.0.0.1:3001/login', {
    username: login.value.username,
    password: login.value.password
  }).then(res => {
    console.log('测试post', res)
  })
}

socket.on('hi', res => {
  console.log('测试接收', res)
});
</script>

<style lang="less">
.diary-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>