<template>
  <el-card shadow="never">
    <el-form ref="menuForm" :model="menuForm" label-width="80px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuForm.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="href">
        <el-input v-model="menuForm.href"></el-input>
      </el-form-item>
      <!-- <el-form-item label="上级菜单">
        <el-select v-model="menuForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="描述" prop="description">
        <el-input v-model="menuForm.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="menuForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="shown">
        <el-radio-group v-model="menuForm.shown">
          <el-radio  :label="true">是</el-radio>
          <el-radio  :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="menuForm.orderNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getEditMenuInfo, saveOrUpdateMenu } from '@/services/menu'
import { Form } from 'element-ui'

@Component({
  name: 'CreateOrEditMenu'
})
export default class extends Vue {
    @Prop({
      default: () => {
        return false
      }
    })
    isEdit!: boolean

    menuForm = {
      name: '',
      parentId: -1,
      href: '',
      icon: '',
      shown: false,
      description: '',
      orderNum: null
    }

    parentMenuList = []

    loading = false

    created () {
      this.loadMenuInfo()
    }

    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.query.id || -1)
      this.parentMenuList = data.data.parentMenuList
      if (data.data.menuInfo) {
        this.menuForm = data.data.menuInfo
      }
    }

    async onSubmit () {
      this.loading = true
      try {
        await (this.$refs.menuForm as Form).validate()
        await saveOrUpdateMenu(this.menuForm)
        this.$router.back()
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
}
</script>
