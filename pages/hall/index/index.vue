<template>
	<view class="page">
		<view class="top por">
			<view class="head paddingTop u-flex u-row-between poa">
				<view class="icons" @click="news">
					<image src="../../../static/pic12.png" style="width: 36rpx;height: 36rpx;" mode="aspectFit"></image>
					<text>消息</text>
				</view>
				<view class="text u-padding-left-35">
					货灵鸟企业端
				</view>
				<view class="news u-flex">
					<view class="icons u-margin-right-30" @click="jion">
						<Icon :iconType="'iconjiameng'" class="icon"></Icon>
						<text>加盟</text>
					</view>
					<view class="icons" @click="call">
						<Icon :iconType="'iconkefu'" class="icon"></Icon>
						<text>客服</text>
					</view>
				</view>
			</view>
			<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="20000"
				:duration="500">
				<swiper-item>
					<view class="swiper-item u-flex u-row-center">
						<image src="../../../static/bg1.png" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item u-flex u-row-center">
						<image src="../../../static/bg2.png" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item u-flex u-row-center">
						<image src="../../../static/bg3.png" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="center">
			<view class="item" @click="enter(1)">
				<view class="round blue">
					<Icon :iconType="'iconcheliangguanli'" class="icon"></Icon>
				</view>
				<view class="text">
					车辆管理
				</view>
			</view>
			<view class="item" @click="enter(2)">
				<view class="round yellow">
					<image src="../../../static/pic005.png" style="width: 48rpx;height: 41rpx;" mode="aspectFit">
					</image>
				</view>
				<view class="text">
					员工档案
				</view>
			</view>
			<view class="item" @click="enter(3)">
				<view class="round purple">
					<image src="../../../static/pic006.png" style="width: 52rpx;height: 34rpx;" mode="aspectFit">
					</image>
				</view>
				<view class="text">
					车主档案
				</view>
			</view>
			<view class="item" @click="enter(4)">
				<view class="round lightBlue">
					<Icon :iconType="'iconfangxiangpan'" class="icon"></Icon>
				</view>
				<view class="text">
					驾驶员
				</view>
			</view>

			<view class="item" @click="enter(5)">
				<view class="round purple">
					<Icon :iconType="'iconzu305'" class="icon"></Icon>
				</view>
				<view class="text">
					违章预警
				</view>
			</view>
			<view class="item" @click="enter(6)">
				<view class="round lightBlue">
					<image src="../../../static/pic007.png" style="width: 39rpx;height: 49rpx;" mode="aspectFit">
					</image>
				</view>
				<view class="text">
					保险档案
				</view>
			</view>
			<view class="item" @click="enter(7)">
				<view class="round blue">
					<Icon :iconType="'iconzu307'" class="icon"></Icon>
				</view>
				<view class="text">
					出险档案
				</view>
			</view>
			<view class="item" @click="enter(8)">
				<view class="round yellow">
					<Icon :iconType="'iconjilu'" class="icon"></Icon>
				</view>
				<view class="text">
					培训考试
				</view>
			</view>
		</view>
		<view class="bottom">
			<text class="title">
				预警统计
			</text>
			<view class="u-flex">
				<view class="widthHalf">
					<view class="tit nineColor inText u-flex u-row-center por" style="top: 20rpx;" v-if="blean">
						预警数量{{firstSum}}个
					</view>
					<view class="chart">
						<view class="charts-box active">
							<!--  :echartsH5="true" :echartsApp="true" -->
							<qiun-data-charts type="pie" :chartData="PieA" />
						</view>
					</view>
					
				</view>
				<view class="widthHalf">
					<view class="tit nineColor inText u-flex u-row-center por" style="top: 20rpx;" v-if="blean">
						到期数量{{secondSum}}个
					</view>
					<view class="chart">
						<view class="charts-box active">
							<!--  :echartsH5="true" :echartsApp="true" -->
							<qiun-data-charts type="pie" :chartData="PieB" />
						</view>
					</view>
					
				</view>
			</view>
			<view class="bottoms u-padding-left-40 u-padding-right-40 u-flex u-row-between" v-if="blean">
				<view class="item first">
					<view class="u-flex">
						<view class="dian"></view>
						<view>车辆年审</view>
					</view>
					<view class="u-flex text u-margin-top-14">
						<view class="sum">
							{{obj.annual.warnCount}}个
						</view>
						<view>
							预警数量
						</view>
					</view>
					<view class="u-flex text u-margin-top-8">
						<view class="sum">
							{{obj.annual.expiredCount}}个
						</view>
						<view>
							到期数量
						</view>
					</view>
				</view>
				<view class="item second">
					<view class="u-flex">
						<view class="dian"></view>
						<view>营运证年审</view>
					</view>
					<view class="u-flex text u-margin-top-14">
						<view class="sum">
							{{obj.operation.warnCount}}个
						</view>
						<view>
							预警数量
						</view>
					</view>
					<view class="u-flex text u-margin-top-8">
						<view class="sum">
							{{obj.operation.expiredCount}}个
						</view>
						<view>
							到期数量
						</view>
					</view>
				</view>
				<view class="item thired">
					<view class="u-flex">
						<view class="dian"></view>
						<view>公司合约</view>
					</view>
					<view class="u-flex text u-margin-top-14">
						<view class="sum">
							{{obj.contract.warnCount}}个
						</view>
						<view>
							预警数量
						</view>
					</view>
					<view class="u-flex text u-margin-top-8">
						<view class="sum">
							{{obj.contract.expiredCount}}个
						</view>
						<view>
							到期数量
						</view>
					</view>
				</view>
				<view class="item fourth">
					<view class="u-flex">
						<view class="dian"></view>
						<view>交强险</view>
					</view>
					<view class="u-flex text u-margin-top-14">
						<view class="sum">
							{{obj.jqx.warnCount}}个
						</view>
						<view>
							预警数量
						</view>
					</view>
					<view class="u-flex text u-margin-top-8">
						<view class="sum">
							{{obj.jqx.expiredCount}}个
						</view>
						<view>
							到期数量
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="title u-flex u-row-between por">
				<text>
					车辆统计
				</text>
				<text class="nineColor smallText poa" style="right: 30rpx;top: 10rpx;">数量</text>
			</view>
			<view class="charts-boxs" style="height: 550rpx;">
				<qiun-data-charts type="column" :eopts="columneopts" :chartData="chartsDataColumn5" :echartsH5="true"
					:echartsApp="true" />
			</view>
		</view>
		<view class="bottom" style="padding: 20rpx 0;" @click="pei">
			<text class="title u-flex u-row-between por">
				<text>培训统计</text>
				<Icon :iconType="'iconfanhui2'" class="icon poa"
					style="color: #999;font-size: 24rpx;right: 30rpx;top: 4rpx;"></Icon>
			</text>
		</view>
		<view class="view paddingLeftRight u-margin-bottom-30">
				<view v-if="order.length > 0">
					<view
						class="fffBackground u-padding-top-32  u-margin-top-20 u-padding-bottom-32 u-padding-right-20 u-padding-left-30 borderRadius boxShadow"
						v-for="(item,index) in order" @click="to(item)">
						<view class="u-flex u-row-between u-margin-bottom-20">
							<view class="threeColor inText">
								{{item.planName}}
							</view>
							<view class="ricahgn blue" v-if="item.type == 1">
								日常培训
							</view>
							<view class="ricahgn zi" v-else-if="item.type == 2">
								岗前培训
							</view>
							<view class="ricahgn yellow" v-else-if="item.type == 3">
								违章培训
							</view>
							<view class="ricahgn yellow" v-else-if="item.type == 4">
								两类人员
							</view>
						</view>
						<view class="u-flex u-row-between">
							<view class="smallText nineColor">
								<text class="u-padding-right-20">总人数</text>
								<text style="color: #FF7F2D;" v-if="item.allCount == null">0人</text>
								<text style="color: #FF7F2D;" v-else>{{item.allCount}}人</text>
							</view>
							<view class="smallText nineColor">
								<text class="u-padding-right-20">培训完成人数</text>
								<text style="color: #FF7F2D;">{{item.one}}人</text>
							</view>
							<view class="smallText nineColor">
								<text class="u-padding-right-20">考试完成人数</text>
								<text style="color: #FF7F2D;">{{item.two}}人</text>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有培训统计信息
					</text>
				</view>
		</view>
		<u-modal confirm-text="立即更新" cancel-text="暂不更新" border-radius="28" :show-cancel-button="mustPull == 0" :show-title="false" v-model="updateShow" @confirm="goUpdate" @cancel="cancelUpdata">
			<view class="slot-content">
				<view class="slot-left">本次更新</view>
				<scroll-view class="slot-right" scroll-y="true">
					<view v-for="(item,index) of updateContent">{{ item }}</view>
				</scroll-view>
			</view>
		</u-modal>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#999999" icon-size="40"
			active-color="#2D84FF" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import demodata from '@/mockdata/demodata.json';
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				upOption:{
					empty:{
						tip: '~ 没有培训信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
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
				current: 0,
				firstSum: "",
				secondSum: "",
				PieA: {},
				PieB: {},
				//横向柱状图的配置，您也可以把默认配置写在config-echarts.js中
				columneopts: {
					grid: {
						left: '3%',
						right: '4%',
						bottom: 30,
						top: 10,
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01],
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},
					yAxis: {
						type: 'category',
						data: []
					},
					//series模板，会覆盖至chartData中的series中的每一个数组内
					seriesTemplate: {
						"label": {
							"show": true,
							"color": "#666666",
							"position": 'right',
						},
					}
				},
				chartsDataPie1: {},
				chartsDataColumn1: {},
				chartsDataColumn5: {},
				blean: false,
				order:[],
				obj:{},
				//最新版本
				forbiddenShow: false,
				banben:"",
				updateContent: [],
				isIos: true,
				updateShow: false,
				mustPull: '',
				pullUrl: '',
				newVersion:"",
			}
		},
		onLoad(option) {
			// 
			this.pageList()
			// ajax.get(config.warnReport_url,{},
			// ).then(res = >{
			// 	if(res.code == 0){
			// 		this.obj = res.data
			// 	}
			// })
		},
		onShow() {
			//#ifdef APP-PLUS
			let $platform = '';
			if(uni.getSystemInfoSync().brand === 'Apple') {
				$platform = 'ios';
			} else {
				$platform = 'android';
			}
			ajax.get(config.version_url,{
				version: plus.runtime.version,
				appId: plus.runtime.appid,
				platform: $platform
			}).then(res => {
				console.log(res)
				if(res.code == 0) {
					if(res.data) {
						let contentUrl = res.data.contentUrl;
						this.mustPull = res.data.mustPull;
						this.pullUrl = res.data.pullUrl;
						this.newVersion = res.data.version
						uni.request({  
							url: contentUrl,
							success: res => {
								console.log(res);
								let item = res.data.split('；');
								this.updateContent = item;
							}
						})
						if(this.mustPull == 1) {
							this.updateShow = true;
						} else {
							uni.getStorage({
							    key: 'updateStatus',
							    success: reg => {
									//判断版本需不需要更新
									if(reg.data == this.newVersion){
										this.updateShow = false;
									}else{
										this.updateShow = true;
									}
							    },
								fail: err => {
									this.updateShow = true;
								}
							})
						}
					} else {
						//01-25改动
						this.updateShow = false;
						uni.removeStorage({
						    key: 'updateStatus'
						});
					}
				} else {
					console.log(res)
				}
			}).catch(err => {
				console.log(err)
			})
			//#endif
		},
		onReady() {
			setTimeout(() => {
				this.getServerData();
			}, 1000);

			//演示变更数据后显示loading状态，如果不想展示loading状态，则不需要此步，可以注释掉看效果
			setTimeout(() => {
				this.chartsDataColumn1.series = [];
			}, 4000);

			setTimeout(() => {
				//模拟新的柱状图
				this.chartsDataColumn1 = JSON.parse(JSON.stringify(demodata.Line));
			}, 5000);
		},
		methods: {
			// 立即更新
			goUpdate() {
				if(this.isIos) {
					let appleId = 1565467803 //app的appleId
					plus.runtime.launchApplication({
						action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
					}, function(e) {
						console.log('Open system default browser failed: ' + e.message);
					});
				} else {
					uni.showToast({
						title: "正在后台更新应用,稍后自动安装",
						icon: 'none',
						duration: 1000
					})
					uni.downloadFile({//执行下载
						url: this.pullUrl, //下载地址
						success: downloadResult => {//下载成功
							if (downloadResult.statusCode == 200) {
								plus.runtime.install(//安装
									downloadResult.tempFilePath, {
										force: true
									},
									function(res) {
										utils.showToast('更新成功，重启中');
										plus.runtime.restart();
									}
								);
							}
						}
					});
					// plus.runtime.openURL(this.pullUrl);
				}
			},
			
			// 暂不更新
			cancelUpdata() {
				this.updateShow = false;
				uni.setStorage({
				    key: 'updateStatus',
				    data: this.newVersion,
				});
			},
			/*上拉加载的回调: */
			pageList() {
				let data = {
					pageIndex: 1,
					pageSize: 5,
					isReport: 0
				}
				ajax.get(config.userStudyList_url, data).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list != null) {
							if (res.data.list.length > 0) {
								let list = res.data.list
								let hours = Math.floor(res.data.duration / 3600)
								//js取小时之后的 余数(余数就是 - 分钟和秒)
								let yu = res.data.duration % 3600
								let minute = Math.floor(yu / 60)
								let second = yu % 60
								if (hours == 0) {
									if (minute == 0) {
										res.data.duration = second + "秒"
									} else {
										res.data.duration = minute + "分钟"
										if (second != 0) {
											res.data.duration += second + "秒"
										}
									}
								} else {
									res.data.duration = hours + "小时"
									if (minute != 0) {
										res.data.duration += minute + "分钟"
										if (second != 0) {
											res.data.duration += second + "秒"
										}
									}
								}
								for (let i = 0; i < res.data.list.length; i++) {
									res.data.list[i].one = 0
									res.data.list[i].two = 0
									if (res.data.list[i].preExamYesCount) {
										res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i]
											.preExamYesCount)
									}
									if (res.data.list[i].checkNotCount) {
										res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i]
											.checkNotCount)
									}
									if (res.data.list[i].checkNoCount) {
										res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i]
											.checkNoCount)
									}
									if (res.data.list[i].checkYesCount) {
										res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i]
											.checkYesCount)
									}

									if (res.data.list[i].checkNotCount) {
										res.data.list[i].two = res.data.list[i].two + Number(res.data.list[i]
											.checkNotCount)
									}
									if (res.data.list[i].checkNoCount) {
										res.data.list[i].two = res.data.list[i].two + Number(res.data.list[i]
											.checkNoCount)
									}
									if (res.data.list[i].checkYesCount) {
										res.data.list[i].two = res.data.list[i].two + Number(res.data.list[i]
											.checkYesCount)
									}


								}
							} else if (res.data.list.length == 0) {
								this.order = []

								return
							}
							let curPageData = res.data.list;
							let curPageLen = res.data.list.length;
							let hasNext = res.data.hasNextPage;
							this.order = this.order.concat(curPageData); //追加新数据
						} else {
							console.log("获取货源列表接口数据返回失败 error is :" + err);
						}
					} else {
						
					}
				}).catch(err => {
					console.log("获取货源列表接口数据返回失败 error is :" + err);
				})
			},
			getServerData() {




				ajax.get(config.multipleReport_url, {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.chartsDataColumn5 = {
							categories: ["总车辆", "车头数", "在线车辆", "挂车数", "车主数量", "司机数量", "公司数量", "违章总数", "违章未处理"],
							series: [{
								data: [res.data.carAllCount, res.data.carHeadCount, res.data
									.carOnlineCount, res.data.carGuaCount, res.data.carOwnerCount,
									res.data.driverCount, res.data.companyCount, res.data
									.violationCount, res.data.violationPendCount
								]
							}]
						};
					}
				})
				ajax.get(config.warnReport_url, {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.obj = res.data
						this.blean = true
						this.secondSum = Number(res.data.annual.expiredCount) + Number(res.data.operation
							.expiredCount) + Number(res.data.contract.expiredCount) + Number(res.data.jqx
							.expiredCount)
						this.PieB = {
							series: [{
								
								data: [{
									"name": "车辆年审",
									"value": Number(res.data.annual.expiredCount)
								}, {
									"name": "营运证年审",
									"value": Number(res.data.operation.expiredCount)
								}, {
									"name": "公司合约",
									"value": Number(res.data.contract.expiredCount)
								}, {
									"name": "交强险",
									"value": Number(res.data.jqx.expiredCount)
								}],
								format: "pieDemo"
							}]
						}
						this.firstSum = Number(res.data.annual.warnCount) + Number(res.data.operation.warnCount) +
							Number(res.data.contract.warnCount) + Number(res.data.jqx.warnCount)
						this.PieA = {
							series: [{
								data: [{
									"name": "车辆年审",
									"value": Number(res.data.annual.warnCount)
								}, {
									"name": "营运证年审",
									"value": Number(res.data.operation.warnCount)
								}, {
									"name": "公司合约",
									"value": Number(res.data.contract.warnCount)
								}, {
									"name": "交强险",
									"value": Number(res.data.jqx.warnCount)
								}],
								format: "pieDemo"
							}]
						}
					}
				})

			},
			complete(e) {
				console.log("渲染完成事件", e);
			},
			getIndex(e) {
				console.log("获取点击索引事件", e);
			},
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			jion() {
				uni.navigateTo({
					url: "/pages/user/join/join"
				})
			},
			news() {
				uni.navigateTo({
					url: "/pages/user/news/news"
				})
			},
			enter(e) {
				if (e == 1) {
					uni.navigateTo({
						url: "/pages/hall/car/car"
					})
				} else if (e == 2) {
					uni.navigateTo({
						url: "/pages/hall/staff/staff"
					})
				} else if (e == 3) {
					uni.navigateTo({
						url: "/pages/hall/carOwner/carOwner"
					})
				} else if (e == 4) {
					uni.navigateTo({
						url: "/pages/hall/driver/driver"
					})
				} else if (e == 5) {
					uni.navigateTo({
						url: "/pages/hall/viol/viol"
					})
				} else if (e == 6) {
					uni.navigateTo({
						url: "/pages/hall/safe/safe"
					})
				} else if (e == 7) {
					uni.navigateTo({
						url: "/pages/hall/danger/danger"
					})
				} else if (e == 8) {
					uni.navigateTo({
						url: "/pages/hall/trainHall/trainHall"
					})
				}
			},
			pei() {
				uni.navigateTo({
					url: "/pages/hall/trainHall/trainHall"
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
			clic() {
				uni.reLaunch({
					url: "/pages/indexs/indexs"
				})
			},
			to(item){
				uni.navigateTo({
					url: "/pages/hall/trainInfo/trainInfo?id=" + item.planId,
				});
			},
		}
	}
</script>

<style scoped lang="less">
	.page {
		.none{
			position: initial;
			margin-bottom:0;
		}
		.top {
			.head {
				width: 100%;
				top: 0;
				left: 0;
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

			.swiper {
				height: 450rpx;

				swiper-item {
					.swiper-item {
						image {
							height: 420rpx;
							width: 100%;
						}

						line-height: 420rpx;
					}

					.swiper-item.one {
						background: #2D84FF;
					}

					.swiper-item.two {
						background: #FF0000;
					}

					.swiper-item.three {
						background: #FF9900;
					}
				}

			}
		}
		.chart{
			height: 320rpx;
			overflow: hidden;
		}
		.charts-boxs {
			height: 600rpx;
		}
		.charts-box {
			height: 360rpx;
		}
		.charts-box.active{
			transform: scale(0.9);
			position: relative;
			bottom: 20rpx;
		}
		.center {
			position: relative;
			bottom: 24rpx;
			background-color: #fff;
			border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx;
			padding: 0 12rpx 20rpx;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.item {
				margin-top: 40rpx;
				width: 25%;

				.round {
					width: 96rpx;
					margin: 0 auto 10rpx;
					height: 96rpx;
					border-radius: 50%;
					box-shadow: 0 2rpx 4rpx #2D84FF;
					display: flex;
					align-items: center;
					justify-content: center;

					.icon {
						color: #fff;
						font-size: 40rpx;
					}
				}

				.round.blue {
					background: linear-gradient(180deg, #ADCEFE 0%, #2D84FF 100%);
				}

				.round.yellow {
					background: linear-gradient(180deg, #FFCDAC 0%, #FF7F2D 100%);
				}

				.round.purple {
					background: linear-gradient(180deg, #DFB6FE 0%, #AC3DFF 100%);
				}

				.round.lightBlue {
					background: linear-gradient(180deg, #9EEFFC 0%, #2DE2FF 100%);
				}

				.text {
					text-align: center;
					line-height: 34rpx;
					font-size: 24rpx;
					color: #333;
				}
			}
		}

		

		.bottom {
			.bottoms{
				.item{
					padding: 0;
					background-color: #fff;
					width: auto;
					.dian{
						width: 24rpx;
						height: 24rpx;
						margin-right: 20rpx;
					}
					font-size: 24rpx;
					color: #999;
					line-height: 34rpx;
				}
				.text{
					font-size: 20rpx;
					line-height: 28rpx;
					color: #999;
					.sum{
						margin-right: 12rpx;
					}
				}
				
				.item.first{
					.dian{
						background-color: #4388EB;
					}
				}
				.item.second{
					.dian{
						background-color: #91cb74;
					}
				}
				.item.thired{
					.dian{
						background-color: #fac858;
					}
				}
				.item.fourth{
					.dian{
						background-color: #ee6666;
					}
				}
			}
			.car {
				justify-content: space-evenly;
			}

			background-color: #fff;
			padding: 20rpx 0 30rpx;
			margin-bottom: 20rpx;

			.title {
				color: #333333;
				font-size: 32rpx;
				line-height: 44rpx;
				padding-left: 30rpx;
				display: block;
				font-weight: bold;
			}

			.item {
				width: 236rpx;
				padding: 24rpx 40rpx 32rpx 20rpx;
				background-color: #f8f6fa;

				text.text {
					color: #242424;
					padding-left: 28rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					margin-bottom: 30rpx;
					width: 100%;
					text-align: center;
					display: block;
				}

				.total {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 16rpx;

					text {
						padding-right: 14rpx;
					}

					.icon {
						width: 36rpx;
						font-size: 20rpx;
					}

					.sum {
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}

				.total.first {

					.icon,
					.sum {
						color: #2D84FF;
					}
				}

				.total.second {

					.icon,
					.sum {
						color: #FF7F2D;
					}
				}

				.total.third {

					.icon,
					.sum {
						color: #2DE2FF;
					}
				}
			}
		}
	}
	
</style>
