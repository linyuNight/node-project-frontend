<template>
  <div class="diary-list">
    <div class="diary-item" v-for="(item, index) in diaryList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
  <input type="text" />
  <div @click="handlerClick">click</div>
  username:<input v-model="register.username" type="text" />
  ps:<input v-model="register.password" type="text" />
  <button type="button" @click="handlerRegister">register</button>
  <button type="button" @click="handlerCheck">check</button>
  <div>对比</div>
  username:<input v-model="login.username" type="text" />
  ps:<input v-model="login.password" type="text" />
  <button type="button" @click="handlerLogin">login</button>

  <div>聊天框</div>
  <div>加入群组</div>
  <div>
    <input v-model="group" type="text" placeholder="Enter your group..." />
    <button @click="joinGroup">Join</button>
  </div>
  <div v-for="message in messages" :key="message.id">
    <span>{{ message.from }}:</span>
    <span>{{ message.content }}</span>
  </div>
  <div>
    <input v-model="newMessage" type="text" placeholder="Enter your message..." @keydown.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { io } from "socket.io-client";

const user = ref('')
const group = ref('')
let newMessage = ref('')
const messages = ref([])

const diaryList = ref([
  {
    label: 'text1',
    content: 'text111111'  
  }
])

const register = ref({
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
  console.log('测试user', register.value.username)
  axios.post('http://127.0.0.1:3001/register', {
    username: register.value.username,
    password: register.value.password
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

// 发送消息
const sendMessage = () => {
  if (newMessage.value) {
    const message = {
      from: user.value,
      content: newMessage.value,
    };

    console.log('测试message', message)
    // 发送消息给服务器
    socket.emit('message', {
      message: message,
      group: group.value
    });

    // 清空输入框
    newMessage.value = '';
  }
}

// 加入群组
const joinGroup = () => {
  socket.emit('joinGroup', group.value);
}

// 监听来自服务器的消息
socket.on('message', (message) => {
  messages.value.push(message);
});
</script>

<style lang="less">
.diary-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>