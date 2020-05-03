<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">{{org.username}}</block>
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
                      <text class="text-bold">{{org.username}}</text>
                    </view>
                  </view>
                </view>
                <view class="flex margin-top">
                  <view class="margin-left">
                    <text class="margin-sm">关注</text>
                    <text>12</text>
                  </view>
                </view>
              </view>
            </view>
            <button class="cu-btn round sm bg-blue shadow">
              <text class="cuIcon-likefill margin-right-xs"></text>
              关注
            </button>
          </view>
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
    },
    methods: {
      getOrg() {
        api.get('/v1/org/' + this.id).then(data => {
          this.org = data
        });
      }
    }
  }
</script>

<style scoped>

</style>