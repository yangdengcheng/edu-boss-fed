<template>
  <section class="advert course">
    <el-form :inline="true" class="page-filter">
      <el-form-item class="page-filter-btn">
        <el-button type="primary" @click="$router.push({ name: 'menu-create'})">添加菜单</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" class="page-table">
      <el-table-column prop="id" label="编号" width="180" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="name" label="菜单名称" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="level" label="菜单级别" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="icon" label="前端图标" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="orderNum" label="排序" align="center" header-align="center"> </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push({ name: 'menu-edit', query: { id: scope.row.id}})">编辑</el-button>
          <el-button type="text" @click="deleteMenu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getMenuAll, deleteMenu } from '@/services/menu'

@Component({
  name: 'MenuPage'
})
export default class extends Vue {
    private tableData: any = []

    created () {
      this.loadMenuAll()
    }

    async loadMenuAll () {
      const { data } = await getMenuAll()
      this.tableData = data.data
    }

    async deleteMenu (id: number) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            try {
              await deleteMenu(id)
              done()
            } catch (error) {} finally {
              instance.confirmButtonLoading = false
            }
          } else {
            done()
          }
        }
      }).then(async () => {
        this.loadMenuAll()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
}
</script>
<style lang="scss" scoped>
</style>
