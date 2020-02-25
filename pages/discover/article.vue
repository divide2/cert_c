<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">{{article.title}}</block>
    </cu-custom>
    <view class='margin-xl bg-white padding-xl radius shadow-lg'>
      <view class='text-center margin-bottom text-lg  text-grey'>{{article.title}}</view>
      <view>{{article.content}}</view>
    </view>
  </view>

</template>

<script>
  import api from '@/api/api'
  export default {
    data() {
      return {
        article: {}
      }
    },
    onLoad(options) {
      api.get(`/v1/articles/${options.id}`).then(data => {
        this.article = data
      })
    }

  }
</script>