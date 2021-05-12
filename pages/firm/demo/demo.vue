<template>
	<view class="page">
		<u-navbar title="用户服务协议" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<Icon :iconType="'iconmima'" class="u-margin-left-8" style="font-size: 40rpx;margin-left: 10rpx !important;color: #2D84FF;"></Icon>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				 
			}
		},
		onLoad(option) {

		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	
</style>
