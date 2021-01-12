<template>
  <section class="advert course">
    <el-card>
      <el-form
        ref="filterForm"
        :inline="true"
        :model="filterForm"
        class="page-filter"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input placeholder="资源名称" v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input placeholder="资源路径" v-model="filterForm.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="filterForm.categoryId" placeholder="全部">
            <el-option
              :value="category.id"
              :label="category.name"
              v-for="category in categoryList"
              :key="category.id"
            >{{ category.name }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button @click="dialogVisible = true">添加资源</el-button>
      <el-button @click="$router.push({ name: 'resource-category' })">资源分类</el-button>
    </el-card>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      class="page-table"
    >
      <el-table-column prop="id" label="编号" width="150" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="name" label="资源名称" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="url" label="资源路径" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="description" label="描述" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间" align="center" header-align="center"> </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template v-slot="scope">
          <el-row>
            <el-button type="text" @click="editResource(scope.row.id)">
              编辑
            </el-button>
            <el-button type="text" @click="deleteResource(scope.row.id)">
              删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filterForm.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="filterForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="添加资源"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="resourceForm" :model="resourceForm" :rules="resourceRules" label-width="120px">
        <el-form-item label="资源名称" prop="name">
          <el-input  v-model="resourceForm.name" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="resourceForm.url" placeholder="请输入资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="resourceForm.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="resourceForm.description" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="createOrUpdateResource">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getResourcePages, getCateGoryAll, getResource, deleteResource, saveOrUpdateResource } from '@/services/resource'
import { Form } from 'element-ui'

@Component({
  name: 'ResourcePage'
})
export default class extends Vue {
    loading = false
    tableData = []
    total = 0
    filterForm = {
      current: 1,
      size: 10,
      name: null,
      url: null,
      categoryId: null
    }

    categoryList = []
    dialogVisible = false
    submitLoading = false
    resourceForm = {
      name: '',
      categoryId: undefined,
      url: '',
      description: ''
    }

    resourceRules = {
      name: [
        {
          required: true,
          message: '请输入资源名称',
          trigger: 'blur'
        }
      ],
      url: [
        {
          required: true,
          message: '请输入角色编码',
          trigger: 'blur'
        }
      ],
      categoryId: [
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ]
    }

    created () {
      this.loadResourceList()
      this.loadCateGoryAll()
    }

    async loadCateGoryAll () {
      const { data } = await getCateGoryAll()
      this.categoryList = data.data
    }

    async loadResourceList () {
      const { data } = await getResourcePages(this.filterForm)
      this.tableData = data.data.records
      this.total = data.data.total
    }

    async editResource (id: number) {
      const { data } = await getResource(id)
      this.resourceForm = data.data
      this.dialogVisible = true
    }

    async createOrUpdateResource () {
      this.submitLoading = true
      try {
        await (this.$refs.resourceForm as Form).validate()
        await saveOrUpdateResource(this.resourceForm)
        this.loadResourceList()
        this.dialogVisible = false
      } catch (error) {

      } finally {
        this.submitLoading = false
      }
    }

    deleteResource (roleId: number) {
      this.$confirm('确定要删除吗', '删除提示', {
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            try {
              await deleteResource(roleId)
              this.loadResourceList()
              done()
            } catch (error) {} finally {
              instance.confirmButtonLoading = false
            }
          } else {
            done()
          }
        }
      }).then(async () => {
        this.$message.success('删除成功')
      })
    }

    handleReset () {
      (this.$refs.filterForm as Form).resetFields()
    }

    async handleFilter () {
      this.loading = true
      this.filterForm.current = 1
      await this.loadResourceList()
      this.loading = false
    }

    handleSizeChange (size: number) {
      this.filterForm.size = size
      this.loadResourceList()
    }

    handleCurrentChange (current: number) {
      this.filterForm.current = current
      this.loadResourceList()
    }
}
</script>
<style lang="scss" scoped>
</style>
