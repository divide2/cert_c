<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">我的课程</block>
    </cu-custom>
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
    name: "myCourse",
    onLoad() {
      this.getCourse()
    },
    data() {
      return {
        courses: [],
        query: {
          page: 0
        },
        last: false
      }
    },
    methods: {
      getCourse() {
        api.get('/v1/user/joined', this.query).then(data => {
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