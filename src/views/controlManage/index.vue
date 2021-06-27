<template>
  <div class="container">
    <component :is="comName" @changeCont="changeCont"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import controlMain from './components/main.vue'
import controlDetail from './components/detail.vue'
export default defineComponent({
  name: 'controlLib',
  components: {
    controlMain,
    controlDetail
  },
  data () {
    return {
      comName: 'controlMain',
      row: {}
    }
  },
  methods: {
    changeCont (v:any) {
      this.row = v
      this.comName = 'controlDetail'
    }
  }
})
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
  }
</style>
