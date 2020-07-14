<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">{{org.name}}</block>
    </cu-custom>
    <view class="radius shadow-warp bg-white">
      <view class="cu-list menu">

        <view class="cu-item margin-top margin-bottom">

          <view class="content flex align-center justify-between">
            <view class="content-left">
              <view>
                <view class="flex align-center">
                  <view class="cu-avatar xl round" :style="'background-image:url('+org.avatar+')'">
                  </view>
                  <view class="base-info margin-left">
                    <view>
                      <text class="text-bold">{{org.name}}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <button v-if="org.isFavorite" class="cu-btn round sm bg-grey shadow" @tap="favorite">
              <text class="cuIcon-likefill margin-right-xs"></text>
              取消关注
            </button>
            <button v-else class="cu-btn round sm bg-blue shadow" @tap="favorite">
              <text class="cuIcon-likefill margin-right-xs text-red"></text>
              关注
            </button>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-card article" style="padding-bottom: 100px">
      <view class="cu-item shadow" v-for="item in courses" :key="item.id" @tap="toDetail(item.id)">
        <view class="title">
          <view class="text-cut">{{item.name}}</view>
        </view>
        <view class="content">
          <image :src="item.images[0]" mode="aspectFill"></image>
          <view class="desc">
            <view class="text-content">简介:{{item.description}}</view>
            <view>
              <view class="cu-tag bg-red light sm round">{{item.certificateName}}</view>
              <view class="cu-tag bg-blue light sm round">{{item.certificateLicensor}}</view>
            </view>
          </view>
        </view>
        <view class="padding flex justify-between">
          <view>{{item.startTime}}</view>
          <view class="text-red">￥{{item.price}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "org",
    data() {
      return {
        id: '',
        courses: [],
        query: {
          page: 0
        },
        last: false,
        org: {
          avatar: '',
          username: '',
          id: ''
        }
      }
    },
    onLoad(option) {
      this.id = option.id
      this.getOrg()
      this.getCourse()
    },
    methods: {
      getOrg() {
        api.get('/v1/user/org/' + this.id).then(data => {
          this.org = data
        });
      },
      favorite() {
        api.post('/v1/user/toggle/favorites/org/'+this.id).then(data => {
          this.getOrg()
        })
      },
      getCourse() {
        api.get(`/v1/org/${this.id}/courses`,this.query).then(data => {
          this.courses.push(...data.content)
          this.last = data.last
        })
      },
      toDetail(id) {
        uni.navigateTo({url: '/pages/course/detail?id=' + id})
      },
    },
    onReachBottom() {
      if (!this.last) {
        this.query.page++
        this.getCourse()
      }
    }
  }
</script>

<style scoped>

</style>