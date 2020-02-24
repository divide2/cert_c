<template>
  <view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="bg-img">
          <image :src='url' mode='aspectFill'></image>
          <view class="cu-tag bg-red" catchtap="DelImg">
            <text class="cuIcon-close"></text>
          </view>
        </view>
        <view class="cu-bar btn-group margin-top margin-bottom">
          <button class="cu-btn bg-green shadow-blur round lg">选择图片</button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        url: uni.getStorageSync('userInfo').avatar
      }
    },
    methods: {
      chooseImage() {

      }
    }
  }
</script>