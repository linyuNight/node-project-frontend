<template>
  <div class="diary-list">
    <div class="diary-item" v-for="(item, index) in diaryList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
  <input type="text" />
  <div @click="handlerCheck">check</div>

  <div>聊天框</div>
  <div>加入群组</div>
  <div>
    <input v-model="group" type="text" placeholder="Enter your group..." />
    <button @click="joinGroup">Join</button>
  </div>
  <div v-for="message in messages" :key="message.id">
    <span>{{ message.username }}:</span>
    <span>{{ message.message }}</span>
  </div>
  <div>
    <input v-model="newMessage" type="text" placeholder="Enter your message..." @keydown.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'
import { baseUrl } from '@/config/index.js'
import {
  checkAllUsersApi
} from '@/api/index.js'
import { useStore } from 'vuex'

const store = useStore()
// const user = ref('')
const group = ref('')
const newMessage = ref('')
const messages = ref([])

const diaryList = ref([
  {
    label: 'text1',
    content: 'text111111'
  }
])

const socket = io(baseUrl, {
  auth: {
    token: localStorage.getItem('token')
  }
})
// socket.connect();

// const handlerClick = () => {
//   axios.get(`${baseUrl}/test`).then(res => {
//     console.log('测试res', res)
//   })

//   // socket.emit('aaa', 888);

//   // console.log(123)
// }

const handlerCheck = () => {
  checkAllUsersApi().then(res => {
    console.log('测试res', res)
  }).catch(err => {
    console.log(err)
  })
}

socket.on('hi', res => {
  console.log('测试接收', res)
})

// 发送消息
const sendMessage = () => {
  if (newMessage.value) {
    // const message = {
    //   from: user.value,
    //   content: newMessage.value,
    // };

    // console.log('测试message', message)
    // 发送消息给服务器
    socket.emit('message', {
      username: store.state.user.username,
      userid: store.state.user.userid,
      message: newMessage.value,
      group: group.value
    })

    // 清空输入框
    newMessage.value = ''
  }
}

// 加入群组
const joinGroup = () => {
  socket.emit('joinGroup', group.value)
}

// 监听来自服务器的消息
socket.on('message', (data) => {
  messages.value.push({
    username: data.username,
    message: data.message
  })
})
</script>

<style lang="less">
.diary-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
