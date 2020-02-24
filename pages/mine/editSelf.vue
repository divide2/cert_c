<template>
  <view class="padding">
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">修改信息</block>
    </cu-custom>
    <form ref="form">
      <view class="cu-form-group margin-top" @tap="chooseImage">
        <view class="title">头像</view>
        <view class="cu-avatar radius bg-gray">
          <image class="cu-avatar radius" :src="userInfo.avatar"></image>
        </view>
      </view>
      <!--      <v-form-item class="cu-form-group" prop="email">-->
      <!--        <view class="title">邮箱</view>-->
      <!--        <input name="nickname" v-model="userInfo.email"/>-->
      <!--      </v-form-item>-->
      <!--      <v-form-item class="cu-form-group" prop="contanctUse">-->
      <!--        <view class="title">联系人</view>-->
      <!--        <input name="nickname" v-model="userInfo.contanctUse"/>-->
      <!--      </v-form-item>-->
      <!--      <v-form-item class="cu-form-group" prop="contanctWay">-->
      <!--        <view class="title">手机号</view>-->
      <!--        <input name="nickname" v-model="userInfo.contanctWay"/>-->
      <!--      </v-form-item>-->
      <!--      <v-form-item class="cu-form-group" prop="address">-->
      <!--        <view class="title">地址</view>-->
      <!--        <input name="nickname" v-model="userInfo.address"/>-->
      <!--      </v-form-item>-->
      <!--      <v-form-item class="cu-form-group" prop="license">-->
      <!--        <view class="title">营业执照</view>-->
      <!--        <input name="nickname" v-model="userInfo.license"/>-->
      <!--      </v-form-item>-->
    </form>
    <button class="cu-btn block bg-blue margin-top lg" @tap="edit">保存</button>
  </view>

</template>

<script>
  import api from '@/api/api'
  import utils from "../../components/form/utils";

  const app = getApp()
  export default {
    data() {
      return {
        userInfo: uni.getStorageSync('userInfo'),
        rules: {
          avatar: [
            {required: true, message: '头像不能为空'}
          ]
        }
      }
    },
    methods: {
      chooseImage() {
        const that = this
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: `${app.globalData.baseUrl}/v1/upload/image`,
              filePath: res.tempFilePaths[0],
              header: {
                Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
              },
              name: 'file',
              success(res) {
                that.userInfo.avatar = res.data
              }
            })
          }
        });
      },
      edit() {
        // this.info.license = this.imgList[0]
        utils.validate(this.userInfo, this.rules, (res, errors) => {
          if (res) {
            api.put(`/v1/org`, this.userInfo).then(data => {
              uni.setStorageSync('userInfo', this.userInfo)
              uni.redirectTo({url: '/pages/index/index?pageCur=mine'})
            })
          }
        })

      }
    }
  }
</script>