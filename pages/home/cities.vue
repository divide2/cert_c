<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">选择地址</block>
    </cu-custom>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        当前位置
        <view class="cu-tag line-blue margin-left-sm" @tap="chooseCity(originCity)">{{originCity}}</view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="indexes" :scroll-into-view="'indexes-'+listCurId" style="height:calc(100vh)"
                 scroll-with-animation="true" enable-back-to-top="true">
      <block v-for="letter in list" :key="letter">
        <view :class="'padding-xs padding-left indexItem-'+list[index]" :id="'indexes-'+list[index]"
              :data-index="list[index]">{{letter}}
        </view>
        <view class="cu-list menu no-padding">
          <block v-for="city in cities" :key="city.id">
            <view class="cu-item" v-if="city.firstLetter==letter" @tap="chooseCity(city.name)">
              <view class="content">
                <view class="text-grey">{{city.name}}</view>
              </view>
            </view>
          </block>
        </view>
      </block>
    </scroll-view>
    <view class="indexBar" style="height:calc(100vh)">
      <view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
        <view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur"
              @touchend="setCur">
          {{list[index]}}
        </view>
      </view>
    </view>
    <!--选择显示-->
    <view :hidden="hidden" class="indexToast">{{listCur}}</view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "citys",
    data() {
      return {
        hidden: true,
        cities: [],
        list: [],
        originCity: '',
        listCurId: '',
        boxTop: '',
        barTop: '',
        listCur: '',
        movableY: ''
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.originCity = uni.getStorageSync('originCity')
      api.get('/v1/operate/cities').then(data => {
        this.cities = data
        this.list = data.map(item => item.firstLetter)
          .filter((item, index, arr) => arr.indexOf(item) === index)
          .sort((a, b) => a > b ? 1 : -1)
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      let that = this
      uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
        that.boxTop = res.top
      }).exec()
      wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
        that.barTop = res.top
      }).exec()
    },
    methods: {
      chooseCity(originCity) {
        wx.setStorageSync('curCity', originCity)
        wx.redirectTo({url: '/pages/index/index'})
      },
      getCur(e) {
        this.hidden = false
        this.listCur = this.list[e.target.id]
      },

      setCur(e) {
        this.hidden = true
        this.listCur = this.listCur
      },
      //滑动选择Item
      tMove(e) {
        let y = e.touches[0].clientY,
          offsettop = this.boxTop,
          that = this
        //判断选择区域,只有在选择区才会生效
        if (y > offsettop) {
          let num = parseInt((y - offsettop) / 20)
          if (num > this.list.length - 1) num = this.list.length - 1
          that.listCur = that.list[num]
        }
      },

      //触发全部开始选择
      tStart() {
        this.hidden = false
      },

      //触发结束选择
      tEnd() {
        this.hidden = true
        this.listCurId = this.listCur
      },
      indexSelect(e) {
        let that = this
        let barHeight = this.barHeight
        let list = this.list
        let scrollY = Math.ceil(list.length * e.detail.y / barHeight)
        for (let i = 0; i < list.length; i++) {
          if (scrollY < i + 1) {
            that.listCur = list[i]
            that.movableY = i * 20
            return false
          }
        }
      }
    }

//获取文字信息

  }
</script>

<style scoped>

  .indexes {
    position: relative;
  }

  .indexBar {
    position: fixed;
    right: 0px;
    bottom: 0px;
    padding: 20rpx 20rpx 20rpx 60rpx;
    display: flex;
    align-items: center;
  }

  .indexBar .indexBar-box {
    width: 40rpx;
    height: auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
  }

  .indexBar-item {
    flex: 1;
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #888;
  }

  movable-view.indexBar-item {
    width: 40rpx;
    height: 40rpx;
    z-index: 9;
    position: relative;
  }

  movable-view.indexBar-item::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 10rpx;
    height: 20rpx;
    width: 4rpx;
    background-color: #f37b1d;
  }

  .indexToast {
    position: fixed;
    top: 0;
    right: 80rpx;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
    margin: auto;
    color: #fff;
    line-height: 100rpx;
    text-align: center;
    font-size: 48rpx;
  }
</style>