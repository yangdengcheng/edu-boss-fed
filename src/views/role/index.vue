<template>
  <section class="page role">
    <el-form :inline="true" :model="filterForm" class="page-filter">
      <el-form-item label="角色名称" prop="name">
        <el-input placeholder="角色名称" clearable  v-model="filterForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleFilter">查询</el-button>
      </el-form-item>
      <el-form-item class="page-filter-btn">
        <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="code" label="编号" width="150" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="name" label="角色名称" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center" header-align="center"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间" align="center" header-align="center"> </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template v-slot="scope">
          <el-row>
            <el-button type="text" @click="$router.push({ name: 'alloc-menu', params: { roleId: scope.row.id}})">
              分配菜单
            </el-button>
            <el-button type="text" @click="$router.push({ name: 'alloc-resource', params: { roleId: scope.row.id}})">
              分配资源
            </el-button>
          </el-row>
          <el-row>
            <el-button type="text" @click="editRole(scope.row.id)">
              编辑
            </el-button>
            <el-button type="text" @click="deleteRole(scope.row.id)">
              删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input  v-model="roleForm.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="roleForm.code" placeholder="请输入角色编码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="roleForm.description" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="createOrUpdateRole">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getRolePages, deleteRole, saveOrUpdateRole, getRole } from '@/services/role'
import { Form } from 'element-ui'

@Component({
  name: 'RolePage'
})
export default class extends Vue {
    tableData = []
    total = 0
    loading = false
    filterForm = {
      current: 1,
      size: 10,
      name: ''
    }

    dialogVisible = false
    roleForm = {
      name: '',
      code: '',
      description: ''
    }

    roleRules = {
      name: [
        {
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '请输入角色编码',
          trigger: 'blur'
        }
      ]
    }

    submitLoading = false

    created () {
      this.loadRoleList()
    }

    async loadRoleList () {
      const { data } = await getRolePages(this.filterForm)
      this.tableData = data.data.records
      this.total = data.data.total
    }

    async handleFilter () {
      this.loading = true
      try {
        this.loadRoleList()
      } catch (error) {
      } finally {
        this.loading = false
      }
    }

    async editRole (id: number) {
      const { data } = await getRole(id)
      this.roleForm = data.data
      this.dialogVisible = true
    }

    async createOrUpdateRole () {
      this.submitLoading = true
      try {
        await (this.$refs.roleForm as Form).validate()
        await saveOrUpdateRole(this.roleForm)
        this.loadRoleList()
        this.dialogVisible = false
      } catch (error) {

      } finally {
        this.submitLoading = false
      }
    }

    deleteRole (roleId: number) {
      this.$confirm('确定要删除吗', '删除提示', {
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            try {
              await deleteRole(roleId)
              this.loadRoleList()
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
}
</script>
<style lang="scss" scoped>
</style>
