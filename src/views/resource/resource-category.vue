<template>
  <section class="advert course">
    <el-card>
      <el-button @click="saveOrUpdateCategory()">添加分类</el-button>
    </el-card>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      class="page-table"
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="text" @click="saveOrUpdateCategory(scope.row)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
      <el-form ref="categoryForm" :model="categoryForm">
        <el-form-item label="名称" prop="name">
          <el-input  placeholder="名称" v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input  placeholder="排序" v-model="categoryForm.sort"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getCateGoryAll } from '@/services/resource'

@Component({
  name: 'ResourceCategory'
})
export default class extends Vue {
    loading = false
    tableData = []
    categoryForm = {
      name: '',
      sort: 0
    }

    dialogVisible = false

    submitLoading = false

    created () {
      this.loadCateGoryAll()
    }

    async loadCateGoryAll () {
      const { data } = await getCateGoryAll()
      this.tableData = data.data
    }

    async saveOrUpdateCategory (category: any) {
      this.dialogVisible = true
      if (category) {
        this.categoryForm = category
      }
    }
}
</script>
<style lang="scss" scoped>
</style>
