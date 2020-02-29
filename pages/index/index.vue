<template>
  <view>
    <mine v-if="PageCur==='mine'"></mine>
    <course :q="q" v-if="PageCur==='course'"></course>
    <discover v-if="PageCur==='discover'"></discover>
    <home v-if="PageCur==='home'"></home>
    <view class="cu-bar tabbar bg-white shadow foot">
      <view class="action" @click="NavChange" data-cur="home">
        <view v-if="PageCur==='home'" class="cuIcon-homefill text-green"></view>
        <view v-else class="cuIcon-homefill"></view>
        <view :class="PageCur==='home'?'text-green':'text-gray'">首页</view>
      </view>
      <view class="action" @click="NavChange" data-cur="course">
        <view v-if="PageCur==='course'" class="cuIcon-activityfill text-green"></view>
        <view v-else class="cuIcon-activityfill"></view>
        <view :class="PageCur==='course'?'text-green':'text-gray'">课程</view>
      </view>
      <view class="action" @click="NavChange" data-cur="discover">
        <view v-if="PageCur==='discover'" class="cuIcon-discoverfill text-green"></view>
        <view v-else class="cuIcon-discoverfill"></view>
        <view :class="PageCur==='discover'?'text-green':'text-gray'">发现</view>
      </view>
      <view class="action" @click="NavChange" data-cur="mine">
        <view v-if="PageCur==='mine'" class="cuIcon-peoplefill text-green"></view>
        <view v-else class="cuIcon-peoplefill"></view>
        <view :class="PageCur==='mine'?'text-green':'text-gray'">我的</view>
      </view>
    </view>
  </view>
</template>

<script>
  import Mine from "../mine/index";
  import Course from "../course/index";
  import Discover from "../discover/index";
  import Home from "../home/index";

  export default {
    components: {Home, Discover, Course, Mine},
    data() {
      return {
        PageCur: 'home',
        discoverLast: false,
        discoverPage: 0,
        q: ''
      }
    },
    onLoad(option) {
      if (option.pageCur) {
        this.PageCur = option.pageCur
      }
      if (option.q) {
        this.q = option.q;
      }
    },
    onReachBottom() {
      uni.$emit('onReachBottom');
    },
    methods: {
      NavChange: function (e) {
        this.PageCur = e.currentTarget.dataset.cur
      }
    }
  }
</script>

<style>

</style>
