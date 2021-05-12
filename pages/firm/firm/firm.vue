<template>
	<view class="page">
		<u-navbar title="全部公司" :is-back="false" back-icon-color="#333" title-color="#000" :background="{ background: '#fff' }" :borderBottom="false">
		</u-navbar>
		<view class="boxs">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-bottom-30 box por" v-for="(item,index) in order" @click="go(item)">
					<view class="bg bg1" v-if="item.ss == 1">
						<view class="u-margin-bottom-30 inText">统一社会信用代码</view>
						<view class="u-flex u-row-between">
							<view class="bigText">
								{{item.socialUniformCode}}
							</view>
							<Icon :iconType="'iconfanhui2'" style="font-size: 31rpx;color: #fff;"></Icon>
						</view>
					</view>
					<view class="bg bg2" v-else-if="item.ss == 2">
						<view class="u-margin-bottom-30 inText">统一社会信用代码</view>
						<view class="u-flex u-row-between">
							<view class="bigText">
								{{item.socialUniformCode}}
							</view>
							<Icon :iconType="'iconfanhui2'" style="font-size: 31rpx;color: #fff;"></Icon>
							
						</view>
					</view>
					<view class="bg bg3" v-else-if="item.ss == 3">
						<view class="u-margin-bottom-30 inText">统一社会信用代码</view>
						<view class="u-flex u-row-between">
							<view class="bigText">
								{{item.socialUniformCode}}
							</view>
							<Icon :iconType="'iconfanhui2'" style="font-size: 31rpx;color: #fff;"></Icon>
							
						</view>
					</view>
					<view class="title">{{item.companyName}}</view>
				</view>
			</mescroll-body>
		</view>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#999999" icon-size="40"
		 active-color="#2D84FF" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				list: [{
						iconPath: "../../../static/tabBar01.png",
						selectedIconPath: "../../../static/tabBar02.png",
						text: '首页',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar05.png",
						selectedIconPath: "../../../static/tabBar06.png",
						text: '公司',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar03.png",
						selectedIconPath: "../../../static/tabBar04.png",
						text: '我的',
						customIcon: false
					}
				],
				current: 1, 
				carShow: false,
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 没有公司信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false,
			}
		},
		onLoad(option) {

		},
		onShow(){
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
		},
		methods: {
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				//直接返回暂无消息
				// if(this.startBlean){
				// 	this.mescroll.endSuccess(0,true)
				// 	return
				// }
				
					ajax.get(config.firmList_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
						
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									for(let i = 0 ; i <res.data.list.length ; i++){
										if(i%3 == 0){
											res.data.list[i].ss = 1
										}else if(i%3 == 1){
											res.data.list[i].ss = 2
										}else if(i%3 == 2){
											res.data.list[i].ss = 3
										}
									}
								}else if(res.data.list.length == 0){
									this.mescroll.endSuccess(0, false);
									return
								}
								console.log(res.data.list)
								let curPageData = res.data.list;
								let curPageLen = res.data.list.length;
								let hasNext = res.data.hasNextPage;
								if(page.num == 1) this.order = []; //如果是第一页需手动置空列表上拉重新加载用到这里.上拉加载的是第一页数据需要手动清空
								this.order = this.order.concat(curPageData); //追加新数据
								console.log(this.order)
								this.mescroll.endSuccess(curPageLen, hasNext);
							} else {
								
								this.mescroll.endErr();
								console.log("获取货源列表接口数据返回失败 error is :" + err);
							}
						}else{
						uni.showToast({
							title:"网络错误,请重试",
							icon:'none',
							duration:2000
						})
					}
					}).catch(err => {
						this.mescroll.endErr();
						console.log("获取货源列表接口数据返回失败 error is :" + err);
					})
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			go(item){
				uni.navigateTo({
					url:"/pages/firm/firmInfo/firmInfo?id="+item.id + "&&name=" + item.companyName
				})
			},
			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/hall/index/index') {
					uni.reLaunch({
						url: "/pages/hall/index/index"
					})
				} else if (index == 1 && curRoute != 'pages/firm/firm/firm') {
					uni.reLaunch({
						url: "/pages/firm/firm/firm"
					})
				} else if (index == 2 && curRoute != 'pages/user/user/user') {
					uni.reLaunch({
						url: "/pages/user/user/user"
					})
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.boxs{
		padding: 20rpx 30rpx 50rpx;
		
	}
	.box{
		
		box-shadow: 0px 2rpx 2rpx rgba(0, 0, 0, 0.16);
		border-radius: 16rpx;
		overflow: hidden;
		color: #fff;
		.bg{
			padding: 40rpx 30rpx;
			
		}
		.bg.bg1{
			background-color: #C19F7D;
		}
		.bg.bg2{
			background-color: #353954;
		}
		.bg.bg3{
			background-color: #99A373;
		}
		.title{
			padding: 26rpx 0 30rpx;
			text-align: center;
			font-size: 32rpx;
			color: #333;
		}
	}
	
	
</style>
