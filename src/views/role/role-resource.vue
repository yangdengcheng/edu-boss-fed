<template>
  <div class="alloc-resource">
    <el-card>
      <div slot="header">
        <span>分配资源</span>
      </div>
      <el-tree
        ref="tree"
        :data="resources"
        node-key="id"
        :props="defaultProps"
        show-checkbox
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultCheckedKeys"
      ></el-tree>
      <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  getAllResources,
  allocateRoleResources,
  getRoleResources,
  getResourceCategories
} from '@/services/resource'
import { Tree } from 'element-ui'

@Component({
  name: 'RoleResource'
})
export default class extends Vue {
    @Prop({
      type: [String, Number],
      required: true
    })
    roleId!: any

    resources = []
    defaultProps = {
      children: 'children',
      label: 'name'
    }

    defaultCheckedKeys = []

    created () {
      this.loadResources()
      this.loadRoleResources()
    }

    async loadResources () {
      const ret = await Promise.all([getAllResources(), getResourceCategories()])
      const resources = ret[0].data.data
      const resourceCategories = ret[1].data.data
      resources.forEach((r: any) => {
        const category = resourceCategories.find((c: any) => c.id === r.categoryId)
        if (category) {
          category.children = category.children || []
          category.children.push(r)
        }
      })
      // 修改顶层分类 ID：因为分类 ID 和资源 ID 冲突
      resourceCategories.forEach((item: any) => {
        item.id = Math.random()
      })
      this.resources = resourceCategories
    }

    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      this.getCheckedResources(data.data)
    }

    getCheckedResources (resources: any) {
      resources.forEach((r: any) => {
        r.resourceList && r.resourceList.forEach((c: any) => {
          if (c.selected) {
            this.defaultCheckedKeys = [...this.defaultCheckedKeys, c.id] as any
          }
        })
      })
    }

    async onSave () {
      const checkedNodes = (this.$refs.tree as Tree).getCheckedNodes()
      const resourceIdList: number[] = []
      checkedNodes.forEach(item => {
        if (!item.children) {
          resourceIdList.push(item.id)
        }
      })
      await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList
      })
      this.$message.success('保存成功')
      this.$router.back()
    }

    resetChecked () {
      (this.$refs.tree as Tree).setCheckedKeys([])
    }
}
</script>

<style lang="scss" scoped></style>
