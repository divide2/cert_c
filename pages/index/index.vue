<template>
	<view>
		<mine v-if="PageCur==='mine'"></mine>
		<course v-if="PageCur==='course'"></course>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="course">
				<view v-if="PageCur==='course'" class="cuIcon-activityfill text-green"></view>
				<view v-else class="cuIcon-activityfill"></view>
				<view :class="PageCur==='course'?'text-green':'text-gray'">管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view v-if="PageCur==='mine'" class="cuIcon-peoplefill text-green"></view>
				<view v-else class="cuIcon-peoplefill"></view>
				<view :class="PageCur==='mine'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Mine from "../mine/index";
	import Course from "../course/index";
	export default {
		components: {Course, Mine },
		data() {
			return {
				PageCur: 'course'
			}
		},
		onLoad(option) {
			if (option.pageCur) {
				this.PageCur = option.pageCur
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
