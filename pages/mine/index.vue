<template>
  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">我</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="radius shadow-warp bg-white">
        <view class="cu-list menu">

          <view v-if="userInfo" class="cu-item arrow margin-top margin-bottom" @tap="toEditSelf">

            <view class="content flex align-center justify-between">
              <view class="content-left">
                <view>
                  <view class="flex align-center" @tap="toEditSelf">
                    <view class="cu-avatar xl round" :style="'background-image:url('+userInfo.avatar+')'">
                    </view>
                    <view class="base-info margin-left">
                      <view>
                        <text class="text-bold">{{userInfo.nickname}}</text>
                      </view>
                      <text>{{userInfo.username}}</text>
                    </view>
                  </view>
                  <view class="flex margin-top">
                    <view class="margin-left" @tap.stop="toFavorite">
                      <text class="margin-sm">关注</text>
                      <text>{{userInfo.favorite}}</text>
                    </view>
                  </view>
                </view>
              </view>
              <text class="cuIcon-qr_code xl text-grey"></text>
            </view>
          </view>
          <navigator v-else class="cu-item arrow margin-top margin-bottom" url="/pages/login/index">
            <view class="login-wrap flex align-center">
              <view>
                <text class="text-bold text-lg">登录/注册</text>
              </view>
            </view>
          </navigator>
        </view>
      </view>
      <view>
        <view class="cu-list menu margin-top">
          <view class="cu-item arrow" @tap="toMyCourse">
            <view class="content">
              <text class="cuIcon-read text-green"></text>
              <text class="text-grey">我的课程</text>
            </view>
          </view>
          <!--          <view class="cu-item arrow">-->
          <!--            <view class="content">-->
          <!--              <text class="cuIcon-question text-blue"></text>-->
          <!--              <text class="text-grey">帮助</text>-->
          <!--            </view>-->
          <!--          </view>-->
        </view>
        <view class="cu-list menu margin-top" @tap="logout">
          <view class="cu-item arrow">
            <view class="content">
              <text class="cuIcon-exit text-grey"></text>
              <text class="text-grey">退出</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>

  export default {
    name: "mine",
    data() {
      return {
        userInfo: uni.getStorageSync('userInfo')
      }
    },
    mounted() {
      // api.get('/v1/user').then(data => {
      //   this.userInfo = data
      // })
    },
    methods: {
      logout() {
        uni.removeStorageSync('userInfo')
        uni.removeStorageSync('accessToken')
        uni.redirectTo({
          url: '/pages/index/index?pageCur=mine'
        })
      },
      toEditSelf() {
        uni.navigateTo({
          url: '/pages/mine/editSelf'
        })
      },
      toMyCourse() {
        uni.navigateTo({url: '/pages/mine/myCourse'})
      },
      toFavorite() {
        uni.navigateTo({url: '/pages/mine/favorite'})
      }
    }
  }
</script>

<style scoped>

</style>