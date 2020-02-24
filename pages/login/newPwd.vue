<template>
  <view class="padding">
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">新密码</block>
    </cu-custom>
    <v-form :model="info" ref="form">
      <v-form-item class="cu-form-group" prop="phoneNumber">
        <view class="title">新密码</view>
        <input type="password" v-model="info.password" placeholder="新密码"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="verifyCode">
        <view class="title">确认密码</view>
        <input type="password" v-model="info.rePassword" placeholder="确认密码"/>
      </v-form-item>
      <button class="cu-btn block bg-blue margin-top lg" @tap="confirm">确认</button>
    </v-form>
  </view>

</template>

<script>
  import api from '@/api/api'
  import VFormItem from "../../components/form/VFormItem";
  import VForm from "../../components/form/VForm";
  import utils from "../../components/form/utils";

  let timer = 0
  export default {
    name: "newPwd",
    components: {VForm, VFormItem},
    onLoad(option) {
      this.info.verifyCode = option.verifyCode
      this.info.phoneNumber = option.phoneNumber
    },
    data() {
      return {
        info: {
          password: '',
          rePassword: '',
          phoneNumber: '',
          verifyCode: ''
        },
        codeDisabled: false,
        codeText: '获取验证码',
        rules: {
          password: [
            {required: true, message: '密码不能为空'},
            {min: 6, max: 20, message: '请输入6到20位数密码'}],
          rePassword: [
            {required: true, message: '确认密码不能为空'},
            {len: 6, message: '请输入6到20位数确认密码'},
            {
              validator: (rule, value, callback) => {
                if (value !== this.info.password) {
                  callback(new Error('两次密码不同'))
                }
                callback()
              }
            }]
        }
      }
    },
    mounted() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      confirm() {
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/pwd/new', this.info).then(data => {
              uni.showToast({
                title: '登录成功',
              })
              uni.navigateBack({delta: 2})
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>