<template>
  <section class="page create-menu">
    <create-or-edit :isEdit="false"></create-or-edit>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CreateOrEdit from './components/CreateOrEdit.vue'

@Component({
  name: 'CreateMenu',
  components: {
    CreateOrEdit
  }
})
export default class extends Vue {}
</script>
