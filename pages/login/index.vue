<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">登录</block>
    </cu-custom>
    <view class="text-center padding" style="font-size: 30px">职业资格考证平台</view>
    <view class="text-center padding">申请获取你的微信绑定的手机号</view>
    <button class="cu-btn block bg-blue margin-top lg" open-type="getPhoneNumber" @getphonenumber="loginByWechatPhone">
      微信账号一键登录
    </button>
    <view class="text-center padding text-blue" @tap="toLoginByVerifyCode">使用手机号码登录</view>
  </view>

</template>

<script>
  import api from '../../api/api'

  let timer
  const app = getApp()
  export default {
    name: "register",
    data() {
      return {}
    },
    methods: {
      loginByWechatPhone(e) {
        console.log(e)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
      },
      toLoginByVerifyCode() {
        uni.navigateTo({
          url: '/pages/login/verifyCodeLogin'
        })
      }
    },
  }
</script>

<style scoped>

</style>