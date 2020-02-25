<template>
  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">发现</block>
    </cu-custom>
    <view class="cu-card article" v-for="item in articles" :key="item.id" @tap="toArticle(item.id)">
      <view class="cu-item shadow">
        <view class="title">
          <view class="text-cut">{{item.title}}</view>
        </view>
        <view class="content">
          <image :src="item.cover" mode="aspectFill"></image>
          <view class="desc">
            <view class="text-content">{{item.synopsis}}</view>
            <view>
              <view class="cu-tag bg-red light sm round">{{item.tags}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "discover",
    data() {
      return {
        articles: []
      }
    },
    mounted() {
      api.get('/v1/articles').then(data => {
        this.articles.push(...data.content)
      })
    },
    methods: {
      toArticle(id) {
        wx.navigateTo({
          url: '/pages/discover/article?id=' + id
        })
      }
    }
  }
</script>

<style scoped>

</style>