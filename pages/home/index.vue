<template>

  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">证书帮</block>
    </cu-custom>
    <view class="bg-blue padding-left" style="font-size: 16px;border: none" @tap="chooseAddress">
      <text class="cuIcon-locationfill"></text>
      <text class="padding-left-xs">{{curCity}}</text>
      <text class="padding-left-xs cuIcon-triangledownfill"></text>
    </view>
    <view class="cu-bar search bg-blue">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="搜索课程" v-model="q" confirm-type="search" @confirm="search"/>
      </view>
    </view>
    <swiper class="card-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000"
            duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
      <swiper-item v-for="item in sliders" :key="item.id" :class="cardCur===index?'cur':''">
        <view class="swiper-item" @tap="toLink(item.link)">
          <image :src="item.image" mode="aspectFill"></image>
        </view>
      </swiper-item>
    </swiper>
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
    name: "home",
    data() {
      return {
        StatusBar: this.StatusBar,
        CustomBar: this.CustomBar,
        curCity: uni.getStorageSync('curCity'),
        cardCur: 0,
        sliders: [],
        q: '',
        query: {
          page: 0,
          city: wx.getStorageSync('curCity'),
        },
        last: false,
        courses: []
      };
    },
    mounted() {
      this.getSlider()
      this.getCourse()
      uni.$once('onReachBottom', (data) => {
        if (!this.last) {
          this.query.page++
          this.getCourse()
        }
      })

    },

    computed: {
      style() {
        var StatusBar = this.StatusBar;
        var CustomBar = this.CustomBar;
        var bgImage = this.bgImage;
        var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
        if (this.bgImage) {
          style = `${style}background-image:url(${bgImage});`;
        }
        return style
      }
    },
    methods: {
      getCourse() {
        api.get('/v1/courses', this.query).then(data => {
          this.courses.push(...data.content)
          this.last = data.last
        })
      },
      toDetail(id) {
        uni.navigateTo({url: '/pages/course/detail?id=' + id})
      },
      chooseAddress() {
        uni.navigateTo({
          url: '/pages/home/cities',
        })
      },
      toLink(link) {
        uni.navigateTo({
          url: link
        })
      },
      getSlider() {
        api.get('/v1/sliders').then(data => {
          this.sliders = data.content
        })
      },
      cardSwiper(e) {
        this.cardCur = e.detail.current;
      },
      search() {
        uni.redirectTo({
          url: '/pages/index/index?pageCur=course&q='+this.q
        })
      }
    }
  }
</script>

<style scoped>

</style>