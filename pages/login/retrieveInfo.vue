<template>
  <view class="padding">
    <cu-custom bg-color="bg-blue">
      <block slot="content">授权个人信息</block>
    </cu-custom>
    <view class="text-center padding" style="font-size: 30px">证书帮</view>
    <view class="text-center padding">申请获取你的微信的基本信息</view>
    <button class="cu-btn block bg-blue margin-top lg" open-type="getUserInfo" @getuserinfo="retrieveInfo">
      获取基本信息
    </button>
  </view>

</template>

<script>
  import api from '../../api/api'
  const app = getApp()

  let timer
  export default {
    name: "register",
    data() {
      return {
        phoneNumber: ''
      }
    },
    onLoad(option) {
      this.phoneNumber = option.phoneNumber
    },
    methods: {
      retrieveInfo(e) {
        const userInfo = e.detail.userInfo
        userInfo.phoneNumber = this.phoneNumber
        api.post('/v1/user/wechat',userInfo).then(res => {
          uni.setStorageSync('accessToken', res.accessToken);
          api.get('/v1/user').then(data => {
            uni.setStorageSync('userInfo', data)
            //登录成功后跳转
            uni.showToast({
              title: '登录成功',
            })
            uni.redirectTo({url: '/pages/index/index?curPage=mine'})
          })
        })
      }
    },
  }
</script>

<style scoped>

</style>