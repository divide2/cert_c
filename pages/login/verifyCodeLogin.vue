<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">手机号登录</block>
    </cu-custom>
    <form ref="form">
      <view class="cu-form-group">
        <view class="title">手机号</view>
        <input placeholder="请输入手机号" v-model="info.phoneNumber"/>
      </view>
      <view class="cu-form-group" prop="verifyCode">
        <view class="title">验证码</view>
        <input type="number" v-model="info.verifyCode" placeholder="验证码"/>
        <button class="cu-btn block bg-green shadow" :disabled="codeDisabled" @tap="retrieveVerifyCode" type="">
          {{codeText}}
        </button>
      </view>
    </form>
    <button class="cu-btn block bg-blue margin-top lg" @tap="login">登录</button>
    <!--    <view class="padding">已同意并阅读-->
    <!--      <text class="text-blue">《用户服务协议》</text>-->
    <!--      、-->
    <!--      <text class="text-blue">《隐私权政策》</text>-->
    <!--    </view>-->
  </view>

</template>

<script>
  import api from '@/api/api'
  import utils from "../../components/form/utils";

  let timer
  export default {
    name: "login",
    data() {
      return {
        info: {
          verifyCode: '',
          phoneNumber: '',
        },
        codeDisabled: false,
        codeText: '获取验证码',
        rules: {
          phoneNumber: [
            {required: true, message: '请填写手机号'},
            {
              validator: (rule, value, callback) => {
                if (/^1\d{10}$/.test(value)) {
                  callback()
                } else {
                  callback(new Error('请填写正确的手机'))
                }
              }
            }],
          verifyCode: [
            {required: true, message: '请填写验证码'},
            {len: 6, message: '请输入6位数验证码'}]
        }
      }
    },
    methods: {
      retrieveVerifyCode() {
        if (!/^1\d{10}$/.test(this.info.phoneNumber)) {
          uni.showToast({
            title: '请输入有效的手机号',
            icon: 'none'
          })
          return
        }
        this.codeDisabled = true
        api.post('/v1/outside/verify/code', {phoneNumber: this.info.phoneNumber}).then(data => {
          this.codeText = 60
          timer = setInterval(() => {
            this.codeText--
            if (this.codeText === 0) {
              this.codeDisabled = false
              this.codeText = '获取验证码'
              clearInterval(timer)
            }
          }, 1000);
        }).catch(er => {
          uni.showToast({
            icon: 'none',
            title: '发送失败'
          })
          this.codeDisabled = false
        })

      },
      login() {
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/login/phone', this.info)
              .then(res => {
                // 如果拥有信息直接保存token跳转去个人信息
                if (res.hasInfo) {
                  uni.setStorageSync('accessToken', res.accessToken);
                  api.get('/v1/user').then(data => {
                    uni.setStorageSync('userInfo', data)
                    //登录成功后跳转
                    uni.showToast({
                      title: '登录成功',
                    })
                    uni.redirectTo({url: '/pages/index/index?curPage=mine'})
                  })
                } else {
                  // 没有拥有信息,说明是新注册的用户 跳转去获取个人信息
                  uni.navigateTo({
                    url: '/pages/login/retrieveInfo?phoneNumber=' + this.info.phoneNumber
                  })
                }

              })
              .catch(e => {
                uni.showToast({
                  icon: 'none',
                  title: '验证码错误',
                })
              })
          }
        })
      },
      findPwd() {
        uni.navigateTo({url: '/pages/login/findPwd'})
      }
    }
  }
</script>

<style scoped>

</style>