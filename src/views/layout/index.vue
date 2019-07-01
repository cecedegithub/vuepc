<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <APPaside/>
      </el-aside>
      <el-container>
        <el-header>
          <APPhearder/>
        </el-header>
        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import APPhearder from './compments/APPheader.vue'
import APPaside from './compments/APPaside.vue'
export default {
  name: 'layout',
  components: {
    APPhearder,
    APPaside
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #343a46;
}

.el-header {
  background-color: #aec0d1;
}

.el-main {
  background-color: #e8eff4;
}
</style>
