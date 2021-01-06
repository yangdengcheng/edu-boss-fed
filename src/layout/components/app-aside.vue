<template>
  <el-aside class="aside" :class="{collapse: $store.state.isCollapse}" style="width: auto">
    <router-link to="/" class="logo">
      <img src="http://eduboss.lagou.com/edu-boss-fed/assets/img/logo.e8b9190b.png" alt="edu">
      <h1>Edu Boss</h1>
    </router-link>
    <el-menu
      :collapse="$store.state.isCollapse"
      :default-active="$route.name"
      class="menu"
      background-color="#ffffff"
      text-color="#303133"
      active-text-color="#40586f"
      :router="true"
    >
      <el-submenu index="auth-manage">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="role" :route="{name: 'role'}">角色列表</el-menu-item>
        <el-menu-item index="menu" :route="{name: 'menu'}">菜单列表</el-menu-item>
        <el-menu-item index="resource" :route="{name: 'resource'}">资源列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="course" :route="{name: 'course'}">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="user" :route="{name: 'user'}">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="advert-manage">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="advert" :route="{name: 'advert'}">广告列表</el-menu-item>
        <el-menu-item index="advert-space" :route="{name: 'advert-space'}">广告位列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'AppAside'
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
  .aside {
    .logo {
      display: flex;
      align-items: center;
      padding: 15px 0 15px 20px;
      line-height: 30px;
      color: $primary-color;
      text-decoration: none;
      background: #ffffff;
      img {
        margin-right: 10px;
        width: 30px;
      }
      h1 {
        display: inline-block;
        transition: width 0.3s;
        width: 106px;
        white-space: nowrap;
        overflow: hidden;
        margin: 0;
      }
    }
    .el-menu {
      min-height: calc(100vh - 70px);
      &:not(.el-menu--collapse) {
        width: 240px;
      }
    }
    &.collapse {
      .logo {
        h1 {
          width: 0;
        }
      }
    }
  }
</style>
