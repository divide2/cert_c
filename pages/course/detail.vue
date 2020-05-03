<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">课程</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <swiper class="screen-swiper round-dot}}" indicator-dots="true" circular="true" autoplay="true" interval="5000"
              duration="500">
        <swiper-item v-for="item in course.images" :key="item">
          <image :src="item" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
      <view class="padding-sm bg-white">
        <view class="padding-xs text-black text-bold text-xl">
          <text>{{course.name}}</text>
        </view>
        <view class="padding-xs">
          简介:{{course.description}}
        </view>

        <view class="flex justify-between padding">
          <view class="text-bold text-red">￥{{course.price}}</view>
          <view class="text-bold">{{course.certificateId?course.certificateName: '无证书'}}</view>
          <view class="text-bold text-blue" @tap="toOrgInfo(course.orgId)">{{course.orgName}}</view>
        </view>
        <view>
          <view class="flex align-center padding">
            <text class="cuIcon-timefill text-orange margin-right-sm"></text>
            <text class="">{{course.startTime + '~' + course.endTime}}</text>
          </view>
          <view class="flex align-center padding">
            <text class="cuIcon-locationfill text-orange margin-right-sm "></text>
            <text>{{course.address + ' ' + course.addressDetail}}</text>
          </view>
        </view>
      </view>
      <!-- 商品详情 -->
      <view class="padding-sm margin-top-sm bg-white">
        <!--        <template is="wxParse" data="{{wxParseData:article.nodes}}"></template>-->
        {{course.details}}
      </view>
    </scroll-view>
    <view class="cu-bar bg-white tabbar border shop foot">
      <button class="action" open-type="share">
        <view class="cuIcon-share text-green"></view>
        分享
      </button>
      <!--<view class="action text-blue" @tap="toCourseUser" v-if="course.status!=='DRAFT'">
        <view class="cuIcon-peoplelist"></view>
        报名{{course.enrolment}}人
      </view>-->
      <view class="bg-orange submit"  @tap="join">立即报名</view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "courseDetail",
    data() {
      return {
        course: {
          images: [],
          name: '',
          description: '',
          price: '',
          certificateId: '',
          certificateName: '',
          orgId: 0,
          orgName: '',
          startTime: '',
          endTime: '',
          address: '',
          addressDetail: '',
          details: '',
          enrolment: 0
        }
      }
    },
    onLoad(options) {
      this.id = options.id
      this.getCourse()
    },

    methods: {
      getCourse() {
        api.get(`/v1/org/courses/${this.id}`).then(data => {
          this.course = data
        })
      },
      join() {
        api.post(`/v1/user/join/${this.id}`).then(data => {
          uni.showToast({
            title: '报名成功'
          })
          uni.redirectTo({url: '/pages/mine/myCourse'})
        }).catch(data=> {
          if (data.statusCode === 409) {
            uni.showToast({
              title: '你已经报名了',
              icon: 'none'
            })
          }
        })
      },
      toCourseUser() {
        uni.navigateTo({
          url: '/pages/course/users?id=' + this.id
        })
      },
      toOrgInfo(id) {
        uni.navigateTo({
          url: '/pages/org/index?id='+id
        })
      }
    }
  }
</script>

<style scoped>

</style>