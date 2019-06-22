<template>
    <div>
        <p>{{message}}</p>
        <router-link to="/login">点击飞向首页</router-link>
    </div>
</template>
<script>
export default {
  data () {
    return {
      message: '这里是image'
    }
  }
}
</script>
