<template>
  <div>
    <el-menu
    class="ss"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router='true'
    >
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">
            <i class="el-icon-menu"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-menu"></i>
            <span slot="title">内容列表</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-menu"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="2-1">
        <i class="el-icon-menu"></i>
        <span slot="title">图文数据</span>
      </el-menu-item>
      <el-menu-item index="2-2">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝概况</span>
      </el-menu-item>
      <el-menu-item index="2-3">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝列表</span>
      </el-menu-item>
    </el-submenu>
      <el-menu-item index="/account">
        <i class="el-icon-document"></i>
        <span slot="title">用户</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

  }
}
</script>
<style lang="less" scoped>
.el-menu {
  height: 100%;
}

.iconfont {
  margin-right: 10px;
}
</style>
