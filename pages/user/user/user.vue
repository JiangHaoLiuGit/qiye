<template>
	<view class="page">
		<view class="top">
			<view class="head u-flex u-row-between">
				<view class="icons">
					
				</view>
				<view class="news u-flex">
					<view class="icons" @click="call">
						<Icon :iconType="'iconkefu'" class="icon"></Icon>
						<text>客服</text>
					</view>
				</view>
			</view>
			<view class="user u-flex">
				<view class="img">
					<image class="img" src="../../../static/userImg.png" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="u-flex">
						<view class="userName fffColor">{{my.nickName}}</view>
						<!-- <Icon :iconType="'iconxiugai'" class="icon fffColor edit"></Icon> -->
					</view>
					<view class="u-flex u-margin-top-14">
						<view class="firm fffBackground u-flex u-margin-right-10">
							<Icon :iconType="'iconzu366'" class="icon"></Icon>
							<text>
								企业认证
							</text>
						</view>
						<view class="admin">
							系统管理员
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="member">
			<view class="item u-flex u-row-between">
				<view class="left">
					<image src="../../../static/pic09.png" mode="aspectFit"></image>
					<text>
						VIP中心
					</text>
				</view>
				<view class="centers">
					学习管理一站式服务
					为企业而生
				</view>
				<view class="right">
					<!-- <image src="../../../static/pic10.png" mode="aspectFit"></image>
					<view class="box u-flex u-row-between">
						<text>开通VIP</text>
						<Icon :iconType="'iconfanhui2'" class="icon"></Icon>
					</view> -->
					
				</view>
			</view>
		</view>
		
		<view class="center">
			<text class="title">
				功能服务
			</text>
			<view class="box">
				<!-- <view class="item" @click="enter(1)">
					<view class="round blue">
						<Icon :iconType="'iconyingyezhizhao2'" class="icon"></Icon>
					</view>
					<view class="text">
						实名认证
					</view>
				</view>
				<view class="item"  @click="enter(2)">
					<view class="round yellow">
						<Icon :iconType="'iconqiyerenzheng'" class="icon"></Icon>
					</view>
					<view class="text">
						企业认证
					</view>
				</view> -->
				<view class="item"  @click="enter(3)">
					<view class="round purple">
						<Icon :iconType="'iconshezhi'" class="icon"></Icon>
					</view>
					<view class="text">
						账号管理
					</view>
				</view>
				<view class="item"  @click="enter(4)">
					<view class="round lightBlue">
						<Icon :iconType="'iconyinsi'" class="icon"></Icon>
					</view>
					<view class="text">
						隐私设置
					</view>
				</view>
			</view>
		</view>
		
		<view class="ad">
			<view class="img" @click="call">
				<image src="../../../static/pic11.png" mode="aspectFit"></image>
			</view>
		</view>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#999999" icon-size="40"
		 active-color="#2D84FF" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
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
				current: 2,
				my:""
			}
		},
		onLoad(option) {
			ajax.get(config.userInfo_url, {
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.my = res.data
				}
			})
		},
		methods: {
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
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
			enter(e){
				if(e == 1){
					// uni.navigateTo({
					// 	url:"/pages/hall/car/car"
					// })
				}else if(e == 2){
					// uni.navigateTo({
					// 	url:"/pages/demo/demo"
					// })
				}else if(e == 3){
					uni.navigateTo({
						url:"/pages/user/myInfo/myInfo"
					})
				}else if(e == 4){
					uni.navigateTo({
						url:"/pages/user/userSolit/userSolit"
					})
					
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.top {
		height: 382rpx;
		background: linear-gradient(180deg, #2D84FF 0%, #50CAE9 100%);
		padding-top: 70rpx;

		.head {
			width: 100%;
			padding: 0 30rpx;
			z-index: 100;

			.text {
				font-size: 38rpx;
				line-height: 50rpx;
				color: #fff;
			}

			.news {}

			.icons {
				color: #fff;
				font-size: 20rpx;
				line-height: 28rpx;
				text-align: center;

				.icon {
					font-size: 36rpx;
					color: #fff;
				}

				text {
					display: block;
					font-size: 20rpx;
					color: #fff;
				}
			}
		}

		.user {
			margin-top: 40rpx;
			padding: 0 34rpx;

			.img {
				width: 112rpx;
				height: 112rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.info {
				.userName {
					font-size: 32rpx;
					line-height: 36rpx;
					margin-right: 90rpx;
				}

				.edit {
					font-size: 30rpx;
				}
				.edit.icon{
					font-size: 20rpx;
				}
				.firm {
					padding: 0 10rpx;
					border-radius: 4rpx;

					.icon {
						font-size: 20rpx;
						color: #999;
					}

					text {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #999;
						margin-left: 8rpx;
					}
				}

				.admin {
					padding: 2rpx 12rpx;
					background-color: #FF7F2D;
					font-size: 20rpx;
					line-height: 28rpx;
					color: #fff;
				}
			}
		}
	}
	
	.member{
		height: 120rpx;
		background: #fff;
		padding: 0 30rpx;
		.item{
			position: relative;
			bottom: 90rpx;
			height: 182rpx;
			border-radius: 16rpx;
			background: #fff;
			box-shadow:0 6rpx 12rpx rgba(0,0,0,.16);
			padding: 0 24rpx 0 32rpx;
			.left{
				text-align: center;
				width: 100rpx;
				image{
					width: 80rpx;
					height: 55rpx;
				}
				text{
					color: #999999;
					font-size: 28rpx;
					line-height: 36rpx;
				}
			}
			.centers{
				width: 252rpx;
				color: #333;
				font-weight: bold;
				font-size: 28rpx;
				line-height: 36rpx;
			}
			.right{
				width: 170rpx;
				height: 100rpx;
				position: relative;
				
				image{
					position: absolute;
					width: 170rpx;
					height: 100rpx;
					left: 0;
					top: 0;
					z-index: 1;
				}
				.box{
					padding: 0 20rpx;
					position: absolute;
					width: 170rpx;
					height: 100rpx;
					left: 0;
					top: 0;
					z-index: 2;
					text{
						color: #666;
						font-weight: bold;
						font-size: 28rpx;
						line-height: 36rpx;
					}
					.icon{
						font-size: 12rpx;
						color: #666;
					}
				}
				
			}
		}
	}
	
	.center{
		background-color: #fff;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		padding: 0 30rpx 20rpx;
		
		.title{
			color: #333333;
			font-size: 32rpx;
			line-height: 44rpx;
			display: block;
			font-weight: bold;
		}
		.box{
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			// justify-content: space-between;
			align-items: center;
			.item{
				margin-top: 30rpx;
				width: 25%;
				
				.round{
					width: 96rpx;
					margin: 0 auto 10rpx;
					height: 96rpx;
					border-radius: 50%;
					box-shadow:0 2rpx 4rpx #2D84FF;
					display: flex;
					align-items: center;
					justify-content: center;
					.icon{
						color: #fff;
						font-size: 40rpx;
					}
				}
				.round.blue{
					background: linear-gradient(180deg, #ADCEFE 0%, #2D84FF 100%);
				}
				.round.yellow{
					background: linear-gradient(180deg, #FFCDAC 0%, #FF7F2D 100%);
				}
				.round.purple{
					background: linear-gradient(180deg, #DFB6FE 0%, #AC3DFF 100%);
				}
				.round.lightBlue{
					background: linear-gradient(180deg, #9EEFFC 0%, #2DE2FF 100%);
				}
				.text{
					text-align: center;
					line-height: 34rpx;
					font-size: 24rpx;
					color: #333;
				}
			}
		}
		
	}
	.ad{
		margin-top: 10rpx;
		background-color: #fff;
		height: 344rpx;
		padding: 22rpx 30rpx 28rpx;
		.img{
			width: 690rpx;
			height: 300rpx;
			// background: linear-gradient(180deg, #00ffd4 0%, #50CAE9 100%);
			border-radius: 8rpx;
			image{
				width: 690rpx;
				height: inherit;
				border-radius: 8rpx;
			}
		}
	}
</style>
