<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">报名学生</block>
    </cu-custom>
    <view class="text-center padding" v-if="students.length === 0">还没有人报名</view>
    <view class="cu-list menu-avatar sm-border">
      <view class="cu-item" v-for="item in students" :key="item.id">
        <view class="cu-avatar round lg"
              :style="'background-image:url('+item.avatar+');'"></view>
        <view class="content">
          <view class="text-grey">{{item.nickname}}</view>
        </view>
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
        students: []
      }
    },
    onLoad(option) {
      api.get('/v1/org/courses/' + option.id + '/students').then(data => {
        this.students = data
      })
    }
  }
</script>

<style scoped>

</style>