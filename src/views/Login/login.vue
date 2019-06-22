<template>
  <div class="contenter">
    <img src="./logo_index.png" alt>
    <el-input placeholder="请输入手机号" v-model="form.mobile" class="one"></el-input>
    <br>
    <el-input type="text" v-model="form.code" placeholder="请输入验证码" class="two"></el-input>
    <el-row>
      <el-button
        type="primary"
        plain
        class="yanzhengma"
        @click="sendAuthcode"
        :disabled="change"
      >{{message}}</el-button>
    </el-row>
    <el-checkbox v-model="checked" class="xieyi">
      <!-- 我已阅读并同意 -->
      <a href="#">用户协议</a>和
      <a href="#">隐私条款</a>
    </el-checkbox>
    <el-row>
      <el-button type="success" round class="denglu" @click="sendLogin">登陆</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt.js'
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      change: false,
      message: '发送验证码',
      num: 60,
      checked: true
    }
  },
  methods: {
    sendAuthcode () {
      const { mobile } = this.form
      const newthis = this
      if (this.form.mobile === '') {
        this.$message('请您输入正确的手机号')
      } else {
        this.change = true
        // const count = setInterval(() => {
        //   this.message = "已发送 剩余:" + this.num + "秒";
        //   if (this.num === 0) {
        //     clearInterval(count);
        //     this.change = false;
        //     this.message = "发送验证码";
        //     this.num = 61;
        //   }
        //   this.num--;
        //   console.log(this.num);
        // }, 1000);
        axios({
          method: 'get',
          url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`,
          data: this.form
        }).then(res => {
          console.log(res.data)
          const { data } = res.data
          window.initGeetest(
            {
              // 以下配置参数来自服务端 SDK
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              // new_captcha: true,
              new_captcha: data.new_captcha,
              product: 'bind'
            },
            function (captchaObj) {
              // 这里可以调用验证实例 captchaObj 的实例方法
              captchaObj
                .onReady(function () {
                  // your code
                  captchaObj.verify()
                })
                .onSuccess(function () {
                  const count = setInterval(() => {
                    newthis.message = '已发送 剩余:' + newthis.num + '秒'
                    if (newthis.num === 0) {
                      clearInterval(count)
                      newthis.change = false
                      newthis.message = '发送验证码'
                      newthis.num = 61
                    }
                    newthis.num--
                    console.log(newthis.num)
                  }, 1000)

                  const result = captchaObj.getValidate()
                  console.log(result)
                  const {
                    geetest_challenge: challenge,
                    geetest_validate: validate,
                    geetest_seccode: seccode
                  } = result
                  console.log(challenge, validate, seccode)
                  axios({
                    method: 'get',
                    url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                    params: {
                      challenge,
                      validate,
                      seccode
                    }
                  }).then(res => {
                    console.log(res)
                  })
                })
                .onError(function () {
                  // your code
                })
              // 登陆事件
            }
          )
        })
      }
    },
    sendLogin () {
      if (this.mobile === '' || this.checked === false) {
        this.$message('请详细阅读并同意之后进行登陆')
      } else {
        axios({
          method: 'post',
          url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          data: this.form
        })
          .then(res => {
            // console.log(res)
            this.$message('验证码成功')
            this.$router.push({
              name: 'home'
            })
          })
          .catch(e => {
            this.$message.error('验证码错误,请您重新输入')
            this.form.code = ''
          })
      }
    }
  }
}
</script>

<style lang="less">
.contenter {
  border: 1px solid goldenrod;
  padding-top: 20px;
  width: 500px;
  background-color: palevioletred;
  height: 300px;
  margin: 50px auto;
  text-align: center;

  img {
    display: block;
    margin: 0 auto;
  }
  .yanzhengma {
    float: right;
    margin-right: 50px;
  }
  .denglu {
    float: left;
    margin-top: 20px;
    margin-left: 60px;
    width: 400px;
  }
  .xieyi {
    margin-top: 20px;
  }
  .one {
    float: left;
    margin-top: 20px;
    width: 400px;
    padding-bottom: 20px;
    margin-left: 50px;
    position: relative;
    z-index: 10;
  }
  .two {
    position: relative;
    z-index: 10;
    margin-left: 50px;
    width: 200px;
    float: left;
  }
}
</style>
