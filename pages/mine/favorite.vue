<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">关注</block>
    </cu-custom>
    <view class="text-center padding" v-if="favorites.length === 0">你还没有关注的人</view>
    <view class="cu-list menu-avatar sm-border">
      <view class="cu-item" v-for="item in favorites" :key="item.id">
        <view class="cu-avatar round lg"
              :style="'background-image:url('+item.org.avatar+');'"></view>
        <view class="content">
          <view class="text-grey">{{item.org.name}}</view>
        </view>
        <button v-if="item.isFavorite" class="cu-btn round sm bg-grey shadow" @tap="toggleFavorite(item)">
          <text class="cuIcon-likefill margin-right-xs"></text>
          取消关注
        </button>
        <button v-else class="cu-btn round sm bg-blue shadow" @tap="toggleFavorite(item)">
          <text class="cuIcon-likefill margin-right-xs text-red"></text>
          关注
        </button>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "courseUsers",
    data() {
      return {
        favorites: []
      }
    },
    onLoad(option) {
      api.get('/v1/user/favorites').then(data => {
        this.favorites = data.map(it => Object.assign({}, it, {isFavorite: true}))
      })
    },
    methods: {
      toggleFavorite(fa) {
        api.post('/v1/user/toggle/favorites/org/' + fa.org.id).then(data => {
          fa.isFavorite = !fa.isFavorite
        })
      }
    }
  }
</script>

<style scoped>

</style>