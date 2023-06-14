<template>
  <div class="side-bar transparent-card">
    <div class="create-group" @click="showCreate">创建群</div>
    <div class="join-group" @click="showJoin">加入群</div>
    <div @click="handlerCheck">测试查看所有用户</div>
    <!-- <div @click="handlerQueryAllGroups">测试查看所有群</div> -->
    <div class="user-groups">
      <div
        class="groups-item"
        v-for="(item, index) in groups"
        :key="index"
        @click="handlerJoinRoom(item)"
      >{{ item.groupname }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  queryAllUsersApi,
  createGroup,
  queryAllGroups
} from '@/api/index.js'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const groups = ref([])

const handlerCheck = () => {
  queryAllUsersApi().then(res => {
    console.log('测试res', res)
  }).catch(err => {
    console.log(err)
  })
}

const showCreate = () => {
  ElMessageBox.prompt('创建一个群', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      createGroup({
        groupname: value,
        creator: store.state.user.username
      }).then(res => {
        console.log('测试创建', res)
        handlerQueryAllGroups()
      })
    })
    .catch(() => {})
}

const showJoin = () => {
  ElMessageBox.prompt('加入一个群', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {

    })
    .catch(() => {})
}

// 查看所有群
const handlerQueryAllGroups = () => {
  store.state.roomLoading = true
  queryAllGroups().then(res => {
    console.log('测试所有群', res)

    groups.value = JSON.parse(JSON.stringify(res)).map(val => {
      return {
        id: val._id,
        groupname: val.groupname,
        creator: val.creator
      }
    })

    store.state.groups = groups.value
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    store.state.roomLoading = false
  })
}

// 点击进入房间
const handlerJoinRoom = (item) => {
  console.log('测试进入群', item)
  router.push({
    name: 'room',
    params: {
      id: item.id,
      groupname: item.groupname
    }
  })
}

onMounted(() => {
  handlerQueryAllGroups()
})
</script>

<style lang="less">
.side-bar{
  width: 200px;
  // background: #fff;
  padding: 20px 30px;
  margin-right: 10px;
  border-radius: 6px;
  .create-group {
    cursor: pointer;
    margin-bottom: 14px;
  }
  .join-group {
    cursor: pointer;
    margin-bottom: 14px;
  }
  .user-groups {
    .groups-item {
      height:  36px;
      margin-bottom: 10px;
      background: #fff;
      border-radius: 6px;
      line-height: 36px;
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
