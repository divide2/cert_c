<template>
  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">课程</block>
    </cu-custom>
    <view class="cu-bar search bg-blue fixed" :style="'top:'+( customBar) + 'px'">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="搜索课程" v-model="qq" confirm-type="search" @confirm="search"/>
      </view>
    </view>
    <view class="nav padding-sm flex justify-around bg-white fixed" :style="'top:'+( customBar + 55) + 'px'">
      <view @tap="changeSelect('typeSelect')">
        <text>{{typeName}}</text>
        <text :class="curSelect==='typeSelect'?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
      </view>
      <view @tap="changeSelect('feeSelect')">
        <text>{{feeName}}</text>
        <text :class="curSelect==='feeSelect'?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
      </view>
      <view @tap="changeSelect('certSelect')">
        <text>{{certName}}</text>
        <text :class="curSelect==='certSelect'?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
      </view>
    </view>
    <view class="fixed nav" v-if="curSelect==='typeSelect'" :style="'top:'+ (customBar + 42 + 55) + 'px'">
      <radio-group class="block" v-model="typeValue">
        <view class="cu-form-group" v-for="item in typeOptions" :key="item.value" @tap="checkTypeOption(item)">
          <view class="title">{{item.name}}</view>
          <radio :checked="item.value===typeValue" :value="item.value"></radio>
        </view>
      </radio-group>
    </view>
    <view class="fixed nav" v-if="curSelect==='feeSelect'" :style="'top:'+ (customBar +42 + 55) + 'px'">
      <radio-group class="block" v-model="feeValue">
        <view class="cu-form-group" v-for="item in feeOptions" :key="item.value" @tap="checkFeeOption(item)">
          <view class="title">{{item.name}}</view>
          <radio :checked="item.value===feeValue" :value="item.value"></radio>
        </view>
      </radio-group>
    </view>
    <view class="fixed nav" v-if="curSelect==='certSelect'" :style="'top:'+ (customBar +42 + 55) + 'px'">
      <radio-group class="block" v-model="certValue">
        <view class="cu-form-group" v-for="item in certOptions" :key="item.value" @tap="checkCertOption(item)">
          <view class="title">{{item.name}}</view>
          <radio :checked="item.value===certValue" :value="item.value"></radio>
        </view>
      </radio-group>
    </view>
    <view class="cu-card article" style="padding-bottom: 100px;margin-top:42px">
      <view class="cu-item shadow" v-for="item in courses" :key="item.id" @tap="toDetail(item.id)">
        <view class="title">
          <view class="text-cut">{{item.name}}</view>
        </view>
        <view class="content">
          <image :src="item.images[0]" mode="aspectFill"></image>
          <view class="desc">
            <view class="text-content">简介:{{item.description}}</view>
            <view>
              <view class="cu-tag bg-red light sm round">{{item.certificateName}}</view>
              <view class="cu-tag bg-blue light sm round">{{item.certificateLicensor}}</view>
            </view>
          </view>
        </view>
        <view class="padding flex justify-between">
          <view>{{item.startTime}}</view>
          <view class="text-red">￥{{item.price}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "course",
    props: {
      q: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        courses: [],
        last: false,
        qq: '',
        query: {
          city: wx.getStorageSync('curCity'),
          page: 0
        },
        curSelect: '',
        customBar: this.CustomBar,
        typeValue: '',
        certValue: '',
        feeValue: '',
        typeOptions: [
          {
            name: '全部类型',
            value: ''
          },
          {
            name: '户外登山',
            value: '1'
          }, {
            name: '医疗急救',
            value: '2'
          }, {
            name: '救援技能',
            value: '3'
          }, {
            name: '社区街道',
            value: '4'
          }
        ],
        feeOptions: [{
          name: '全部费用',
          value: ''
        }, {
          name: '免费',
          value: 'true'
        }, {
          name: '收费',
          value: 'false'
        }],
        certOptions: [{
          name: '全部证书',
          value: ''
        }, {
          name: '有证',
          value: 'true'
        }, {
          name: '无证',
          value: 'false'
        }]
      }
    },
    mounted() {
      this.qq = this.q;
      this.getCourse()
      uni.$once('onReachBottom', (data) => {
        if (!this.last) {
          this.query.page++
          this.getCourse()
        }
      })
    },
    computed: {
      typeName() {
        return this.typeOptions.find(item => item.value === this.typeValue).name
      },
      feeName() {
        return this.feeOptions.find(item => item.value === this.feeValue).name
      },
      certName() {
        return this.certOptions.find(item => item.value === this.certValue).name
      }
    },
    methods: {
      getCourse() {
        this.query.professionId = this.typeValue
        this.query.free = this.feeValue
        this.query.hasCert = this.certValue
        this.query.name = this.qq
        api.get('/v1/courses', this.query).then(data => {
          this.courses.push(...data.content)
          this.last = data.last
        })
      },
      toDetail(id) {
        uni.navigateTo({url: '/pages/course/detail?id=' + id})
      },
      changeSelect(type) {
        if (this.curSelect === type) {
          this.curSelect = '';
        } else {
          this.curSelect = type;
        }
      },
      checkTypeOption(item) {
        this.typeValue = item.value
        this.curSelect = ''
        this.courses = []
        this.query.page = 0
        this.getCourse()
      },
      checkFeeOption(item) {
        this.feeValue = item.value
        this.curSelect = ''
        this.courses = []
        this.query.page = 0
        this.getCourse()
      },
      checkCertOption(item) {
        this.certValue = item.value
        this.curSelect = ''
        this.courses = []
        this.query.page = 0
        this.getCourse()
      },
      search() {
        this.courses = []
        this.last = false
        this.query.page = 0
        this.getCourse()
      }
    }
  }
</script>

<style scoped>

</style>