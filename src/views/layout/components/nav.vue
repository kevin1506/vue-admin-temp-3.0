<template>
  <div class="box left-nav">
    <div class="top-info">
      <!-- <a href="#" @click.prevent="goHome"><img class="logo" src="../../assets/img/logo.png" alt="logo"></a> -->
      <div class="system-title" v-if="!isDrawBack">后台管理系统模板</div>
    </div>
    <el-scrollbar wrap-class="menu-wrapper" :native="false" style="height:100%;">
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="routePath"
        router
        :collapse="isCollapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        class="nav-menu"
      >
        <template v-for="(item, index1) in menuData">
          <template v-if="item.subs">
            <el-submenu :index="index1+''" :key="index1">
              <!-- <template v-slot:title>
                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
              </template> -->
              <template #title>
                <i :class="item.icon"></i><span>{{ item.title }}</span>
              </template>
              <template v-for="(subItem, index2) in item.subs">
                <el-submenu v-if="subItem.subs" :index="index1 + '-' + index2" :key="index2">
                  <template v-slot:title>{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem, index3) in subItem.subs" :index="threeItem.path" :key="index3">
                    {{ threeItem.title }}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.path" :key="'end' + index2">
                  {{ subItem.title }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="'end' + index1">
              <!-- <i :class="item.icon"></i><span slot="title">{{ item.title }}</span> -->
              <i :class="item.icon"></i><template #title><span>{{ item.title }}</span></template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isDrawBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapse: false,
      menuData: [
        {
          icon: 'el-icon-s-home',
          path: '/home',
          title: '首页'
        },
        {
          title: '控件模板库管理',
          icon: 'el-icon-s-platform',
          subs: [
            {
              title: '控件库',
              path: '/control'
            },
            {
              title: '模板库',
              path: '/temp'
            }
          ]
        },
        {
          title: '项目管理',
          icon: 'el-icon-folder',
          subs: [
            {
              title: '项目仓库',
              path: '/project-hub'
            }
          ]
        }
      ]
    }
  },
  computed: {
    routePath () {
      const path = this.$route.meta.title ? this.$route.fullPath : this.$route.matched[1].redirect
      return path
    }
  },
  watch: {
    isDrawBack: function (val) {
      this.isCollapse = val
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    }
  }
})
</script>

<style scoped lang="less">
  .left-nav {
    padding-top: 60px;
  }
  .system-title {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    white-space:nowrap;
  }
  .box {
    height: 100%;
  }
  .top-info {
    width: 100%;
    height: 60px;
    background-color: #002140;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    margin-top: -60px;
    .logo {
      height: 32px;
      margin-right: 5px;
    }
    img {
      vertical-align: middle;
    }
  }
  .fade-enter-active {
    transition: opacity .3s linear;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-leave {
    display: none;
  }
  .nav-menu {
    border: none;
  }
  .nav-menu:not(.el-menu--collapse){
    width: 220px;
  }
</style>

<style lang="less">
  .left-nav {
    .el-scrollbar__wrap {
      overflow-y: auto;
      overflow-x: hidden;
    }
    /*.el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:hover {*/
      /*background-color: #555 !important;*/
    /*}*/
  }
</style>
