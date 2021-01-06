<template>
    <div class="layout">
      <el-container class="app-container">
        <AppAside></AppAside>
        <el-container>
          <el-header class="app-header">
            <app-header></app-header>
          </el-header>
          <el-main class="app-main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

@Component({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
  .app-container {
    height: 100vh;
    min-width: 980px;
  }
</style>
