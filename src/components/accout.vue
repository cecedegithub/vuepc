<template>
    <div>
        <p>{{message}}</p>
        <router-link to="/article">点击飞向首页</router-link>
    </div>
</template>
<script>
export default {
  data () {
    return {
      message: '这里是aacount'
    }
  }
}
</script>
