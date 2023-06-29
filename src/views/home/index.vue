<template>
  <div class="home">
    <div class="home-content">
      <div class="header transparent-card">
        <div class="header-l">
          <div
            class="header-item"
            :class="route.name === item.name || route.meta.parent === item.name ? 'active' : ''"
            v-for="(item, index) in headerList"
            :key="index"
            @click="handlerHeaderClick(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="header-r">
          <el-dropdown v-if="user.username">
            <span class="user-name">{{ user.username }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="main">
        <router-view />
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentUser } from '@/api/index'
// import { useStore } from 'vuex'
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();

const headerList = ref([
  {
    label: 'diary',
    name: 'diary'
  },
  {
    label: 'tools',
    name: 'tools'
  },
  {
    label: 'manager',
    name: 'manager'
  }
])

const user = ref({} as any)

const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log(route.name)
  // const store = useStore()

  getCurrentUser().then((res: any) => {
    console.log('测试用户', res)
    if (res && res.username) {
      globalStore.user = {
        userid: res.id,
        username: res.username
      }

      user.value = globalStore.user
    } else {
      router.push({
        name: 'login'
      })
    }
  }).catch((err: any) => {
    console.log(err)
  })
})

const handlerHeaderClick = (item: any) => {
  router.push({
    name: item.name
  })
}

const logout = () => {
  localStorage.removeItem('token')

  router.push({
    name: 'login'
  })
}
</script>

<style lang="less">
.home {
  min-width: 1200px;
  height: 100%;
  background-image: url("@/assets/imgs/white.jpeg");
  background-position: top center;
  .home-content {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 0 24px;
      margin-bottom: 10px;
      .header-l {
        display: flex;
        align-items: center;
        margin-left: -6px;
        .header-item {
          // width: 60px;
          padding: 0 16px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        .active {
          color: #fff;
        }
      }
      .header-r {
        display: flex;
        align-items: center;
        .user-name {
          color: #000;
          cursor: pointer;
        }
      }
    }
    .main {
      // flex: 1;
      height: calc(100% - 50px)
    }
  }
}
</style>
