<template>
  <div class="header">
    <el-button type="text" class="hamburger" @click="toggleCollapse">
      <i class="el-icon-s-fold" v-if="!$store.state.isCollapse"></i>
      <i class="el-icon-s-unfold" v-else></i>
    </el-button>
    <app-breadcrumb></app-breadcrumb>
    <el-dropdown>
  <span class="el-dropdown-link">
    <el-avatar :src="userInfo.portrait || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"></el-avatar>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppBreadcrumb from './app-breadcrumb.vue'
import {
  getInfo
} from '@/services/user'

@Component({
  name: 'AppHeader',
  components: {
    AppBreadcrumb
  }
})
export default class extends Vue {
  userInfo = {}

  created () {
    this.loadUserInfo()
  }

  toggleCollapse () {
    this.$store.commit('setIsCollapse', !this.$store.state.isCollapse)
  }

  async loadUserInfo () {
    const { data } = await getInfo()
    this.userInfo = data.content
  }

  handleLogout () {
    this.$confirm('确认退出吗？', '退出提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$store.commit('setUser', null)
      this.$router.push({
        name: 'login'
      })
    })
  }
}
</script>
<style lang="scss" scoped>
  .header {
    height: 100%;
    margin: 0 -20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    background: #ffffff;
    .hamburger {
      font-size: 20px;
      margin-right: 10px;
      padding: 15px 20px;
    }
    .el-dropdown {
      margin-left: auto;
    }
  }
</style>
