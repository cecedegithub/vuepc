<template>
  <el-select :value="value" placeholder="请选择" @change="$emit('input', $event)">
    <el-option v-for="item in channels" :key="item.value" :label="item.label" :value="item.id"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'article-channel',
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadchannel()
  },
  methods: {
    async loadchannel () {
      try {
        const data = await this.$http({
          mothed: 'post',
          url: 'http://ttapi.research.itcast.cn/mp/v1_0/channels'
        })

        this.channels = data.channels
      } catch (error) {
        console.log(error)
      }
    },
    handleChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="less">
</style>
