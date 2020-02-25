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
        <input type="text" placeholder="搜索课程" confirm-type="search"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        StatusBar: this.StatusBar,
        CustomBar: this.CustomBar,
        curCity: uni.getStorageSync('curCity')
      };
    },
    computed: {
      style() {
        var StatusBar= this.StatusBar;
        var CustomBar= this.CustomBar;
        var bgImage = this.bgImage;
        var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
        if (this.bgImage) {
          style = `${style}background-image:url(${bgImage});`;
        }
        return style
      }
    },
    methods: {
      chooseAddress() {
        wx.navigateTo({
          url: '/pages/home/cities',
        })
      }
    }
  }
</script>

<style scoped>

</style>