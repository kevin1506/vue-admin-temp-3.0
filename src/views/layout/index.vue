<template>
  <div :class="['main-wrapper', {collapsed: isDrawBack}]">
    <div class="left-panel">
      <Nav :isDrawBack="isDrawBack"></Nav>
    </div>
    <div class="right-container">
      <div class="top">
        <v-header @onPassOnPar="showTranValue"></v-header>
        <Tabs></Tabs>
      </div>
      <div class="page-content">
        <!-- <transition name="fade" mode="out-in">
          <keep-alive :include="tabs">
            <router-view></router-view>
          </keep-alive>
        </transition> -->
        <router-view v-slot="{ Component }">
          <keep-alive :include="tabs">
            <router-view :is="Component"></router-view>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import Nav from './components/nav.vue'
import vHeader from './components/header.vue'
import Tabs from './components/tabs.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Nav,
    vHeader,
    Tabs
  },
  data () {
    return {
      isDrawBack: false,
      tabs: []
    }
  },
  unmounted () {
    this.clearTabs()
  },
  computed: {
    ...mapState(['tabsList'])
  },
  watch: {
    tabsList: { // 模块缓存
      handler (v) {
        const arr = []
        for (const item of v) {
          item.name && arr.push(item.name)
        }
        this.tabs = arr
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['clearTabs']),
    showTranValue (data) {
      this.isDrawBack = data
    }
  }
})
</script>

<style scoped lang="less">
.main-wrapper {
  padding-left: 220px;
  transition: padding-left 0.2s ease-in-out;
}
.main-wrapper.collapsed {
  padding-left: 64px;
  .left-panel {
    width: 64px;
  }
}
.main-wrapper,
.left-panel,
.right-container {
  height: 100%;
  box-sizing: border-box;
}
.left-panel {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  background-color: #324157;
  box-shadow: 2px 2px 5px #ddd;
  transition: width 0.2s ease-in-out;
}
.right-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  .top {
    margin-top: -100px;
  }
}
.page-content {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f5f5f5;
}
</style>
