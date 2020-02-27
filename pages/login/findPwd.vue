<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">找回密码</block>
    </cu-custom>
    <v-form :model="info" ref="form">
      <v-form-item class="cu-form-group" prop="phoneNumber">
        <view class="title">手机号</view>
        <input type="number" v-model="info.phoneNumber" placeholder="请输入手机号"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="verifyCode">
        <view class="title">验证码</view>
        <input type="number" v-model="info.verifyCode" placeholder="验证码"/>
        <button class="cu-btn block bg-green shadow" :disabled="codeDisabled" @tap="retrieveVerifyCode" type="">
          {{codeText}}
        </button>
      </v-form-item>
      <button class="cu-btn block bg-blue margin-top lg" @tap="nextStep">下一步</button>
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
    name: "findPwd",
    components: {VForm, VFormItem},
    data() {
      return {
        info: {
          verifyCode: '',
          phoneNumber: '',
        },
        codeDisabled: false,
        codeText: '获取验证码',
        rules: {
          phoneNumber: [
            {required: true, message: '请填写手机号'},
            {
              validator: (rule, value, callback) => {
                if (/^1\d{10}$/.test(value)) {
                  callback()
                } else {
                  callback(new Error('请填写正确的手机'))
                }
              }
            }],
          verifyCode: [
            {required: true, message: '请填写验证码'},
            {len: 6, message: '请输入6位数验证码'}]
        }
      }
    },
    mounted() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      nextStep() {
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/pwd/verify/retrieve', this.info).then(data => {
              uni.navigateTo({url: `/pages/login/newPwd?phoneNumber=${this.info.phoneNumber}&verifyCode=${this.info.verifyCode}`})
            }).catch(e => {
              if (e.statusCode === 409) {
                uni.showToast({
                  title: '验证码错误',
                  icon: 'none'
                })
              }
            })
          }
        })
      },
      retrieveVerifyCode() {
        if (!/^1\d{10}$/.test(this.info.phoneNumber)) {
          uni.showToast({
            title: '请输入有效的手机号',
            icon: 'none'
          })
          return
        }
        this.codeDisabled = true
        api.post('/v1/inside/verify/code', {phoneNumber: this.info.phoneNumber}).then(data => {
          this.codeText = 60
          timer = setInterval(() => {
            this.codeText--
            if (this.codeText === 0) {
              this.codeDisabled = false
              this.codeText = '获取验证码'
              clearInterval(timer)
            }
          }, 1000);
        }).catch(er => {
          if (er.statusCode === 409) {
            uni.showToast({
              icon: 'none',
              title: '手机号未注册'
            })
          }
          this.codeDisabled = false
        })

      }
    }
  }
</script>

<style scoped>

</style>