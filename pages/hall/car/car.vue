<template>
	<view class="page1">
		<u-navbar title="车辆" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2d84ff' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40 smallText" style="font-size: 22rpx;color: #fff;">添加</view> -->
		</u-navbar>
		<view class="none" v-if="type == 1">
			<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
			<text>
				你没有添加车辆信息
			</text>
		</view>
		<view class="box" v-if="type == 2 && blean == true">
			<view class="boxItem clearfix">
				<view class="lf">
					<view class="u-padding-top-78">
						<view class="small">车辆总数</view>
						<view class="big">{{zon.carInfo.carCount}}</view>
					</view>
					<view class="u-padding-top-42">
						<view class="small">违章未处理</view>
						<view class="big">{{zon.violationInfo.allCount}}</view>
					</view>
				</view>
				<view class="ct"> 
					<zwp-ring-timing mode="chart" :barWidth="barWidth" centerBgColor="" :value="value" activeColor="#5be9ff" defaultColor="#93d5fa">
						<text class="timingText fffColor" style="display: block;width: 100%;text-align: center;padding-top: 50rpx;">{{value}}%</text>
						<text class="timingText fffColor" style="display: block;width: 100%;text-align: center;">在线率</text>
					</zwp-ring-timing>
					<!-- <load-line loadType="circle" :circleInfo="circleInfo" :loadPercent="loadPercent"></load-line> -->
					<!-- <load-line loadType="ball" :ballInfo="ballInfo" :loadPercent="loadPercent"></load-line> -->
				</view>
				<view class="rt">
					<view class="u-padding-top-78">
						<view class="small">在线数</view>
						<view class="big">{{zon.carInfo.carOnlineCount}}</view>
					</view>
					<view class="u-padding-top-42">
						<view class="small">到期总数</view>
						<view class="big">{{zon.warnInfo.allCount}}</view>
					</view>
				</view>
			</view>
			<view class="paddingLeftRight">
				
				<view class="u-flex u-row-between">
					<text class="inText threeColor">车辆列表</text>
					<view class="search u-flex" @click="to">
						<image src="../../../static/pic20.png" mode="widthFix" style="width: 26rpx;" class="img"></image>
						<input type="text" disabled maxlength="10" placeholder=" 搜索车牌号">
					</view>
				</view>
				<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback" height="700">
					<view class="fffBackground u-margin-top-20 por borderRadius" v-for="(item,index) in order" @click="go(item)" style="box-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.16);">
						<view class="u-padding-top-24 u-padding-left-30">
							<view>
								<image src="../../../static/tabBar06.png" mode="aspectFit" style="width: 36rpx;height: 36rpx;top: 6rpx;" class="por u-margin-right-20"></image>
								<text class="u-font-sm">{{item.companyName}}</text>
							</view>
						</view>
						<view class="u-flex u-row-between u-padding-left-30 u-margin-top-22 u-margin-bottom-20 u-padding-bottom-10" style="flex-wrap: wrap;">
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.phone != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">手机号码:</text>{{item.phone}}
							</view>
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.carNumber != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">车头牌号:</text>{{item.carNumber}}
							</view>
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.carOwner != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">车主姓名:</text>{{item.carOwner}}
							</view>
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.gCarNumber != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">挂车牌号:</text>{{item.gCarNumber}}
							</view>
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.contractExpired != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">合约到期:</text>{{item.contractExpired}}
							</view>
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.operationDue != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">营运到期:</text> {{item.operationDue}}
							</view>
							<view class="widthHalf nineColor u-padding-bottom-12 u-font-sm" v-if="item.jqxExpired != null" style="width:50%;">
								<text class="threeColor u-margin-right-10">交强险到期:</text>{{item.jqxExpired}}
							</view>
							
							
						</view>
						
					</view>
				</mescroll-body>
			</view>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import LoadLine from '@/components/load-line/load-line.vue'
	export default {
		components:{
			LoadLine
		},
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				barWidth:15,
				value:"10",
				lineInfo:{
					colorChange:true,
					loadColor:'#6ee2e1,#2ba98c,#a07e1e'
				},
				circleInfo:{
					foreground:'#5be9ff',
					background:'linear-gradient(180deg, #50CAE9 0%, #2d84ff 100%)',
					circleColor:'#93d5fa'
				},
				ballInfo:{
					ballType:'all',
					ballSize:150,
					waveColor:'#93d6fa',
					ballPadding:'5px',
				},
				loadPercent:0,
				loadText:'已下载',
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 没有车辆信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				type:"2",
				order:[],
				pageIndex:1,
				pageSize:20,
				canReset:false,
				zon:{},
				num:0,
				blean:false
			}
		},
		onLoad(option) {
			
			ajax.get(config.carReport_url, {
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.blean = true
					this.zon = res.data
					var sum = 0
					if(this.zon.carInfo.carOnlineCount != 0 && this.zon.carInfo.carOnlineCount != null){
						sum = (Number(this.zon.carInfo.carOnlineCount) / Number(this.zon.carInfo.carCount)).toFixed(2) * 100
						console.log(Number(this.zon.carInfo.carOnlineCount))
						console.log(Number(this.zon.carInfo.carCount))
						console.log(sum)
						this.value = sum
						// this.zon.carInfo.carOnlineCount .toFixed(2) * 100
					}else{
						this.value = 0
					}
					
					
					if(this.zon.warnInfo.allCount != null){
						if(this.zon.warnInfo.allCount > 0){
							console.log(this.zon.warnInfo.allCount)
							this.num =this.num + this.zon.warnInfo.allCount
						}
					}
					if(this.zon.warnInfo.jqxExpiredCount != null){
						if(this.zon.warnInfo.jqxExpiredCount > 0){
							console.log(this.zon.warnInfo.jqxExpiredCount)
							this.num =this.num + this.zon.warnInfo.jqxExpiredCount
						}
					}
					if(this.zon.warnInfo.annualReviewCount != null){
						if(this.zon.warnInfo.annualReviewCount > 0){
							this.num =this.num + this.zon.warnInfo.annualReviewCount
						}
					}
					if(this.zon.warnInfo.contractExpiredCount != null){
						if(this.zon.warnInfo.contractExpiredCount > 0){
							this.num =this.num + this.zon.warnInfo.contractExpiredCount
						}
					}
					if(this.zon.warnInfo.operationDueCount != null){
						if(this.zon.warnInfo.operationDueCount > 0){
							this.num =this.num + this.zon.warnInfo.operationDueCount
						}
					}
					
				}
			})
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
				
				ajax.get(config.carList_url, {
					pageIndex: pageNum,
					pageSize: pageSize,
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list != null) {
							if (res.data.list.length > 0) {
								
								let list = res.data.list
								this.type = 2
								// contractExpired operationDue jqxExpired
								for(let i = 0 ; i < res.data.list.length ; i++){
									if(res.data.list[i].contractExpired){
										this.one = this.timer(res.data.list[i].contractExpired)
										res.data.list[i].contractExpired = this.timer(res.data.list[i].contractExpired)
									}
									if(res.data.list[i].operationDue){
										this.one = this.timer(res.data.list[i].operationDue)
										res.data.list[i].operationDue = this.timer(res.data.list[i].operationDue)
									}
									if(res.data.list[i].jqxExpired){
										this.two = this.timer(res.data.list[i].jqxExpired)
										res.data.list[i].jqxExpired = this.timer(res.data.list[i].jqxExpired)	
									}
								}
							}else if(res.data.list.length == 0){
								this.type = 1
								this.mescroll.endSuccess(0, false);
								return
							}
							
							let curPageData = res.data.list;
							let curPageLen = res.data.list.length;
							let hasNext = res.data.hasNextPage;
							if(page.num == 1) this.order = []; //如果是第一页需手动置空列表
							
							this.order = this.order.concat(curPageData); //追加新数据
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
			to(){
				uni.navigateTo({
					url:"/pages/hall/search/search?type=" + 1
				})
			},
			go(item){
				uni.navigateTo({
					url:"/pages/hall/carInfo/carInfo?id="+item.id+"&&one="+item.violationCount+"&&two="+item.warnCount
				})
			},
			timer(info){
				let date = new Date(info.replace(/-/g, '/'));
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + MM + '-' + d;
			},
		}
	}
</script>

<style scoped lang="less">
	
	.boxItem{
		background: linear-gradient(180deg, #2d84ff 0%, #50CAE9 100%);
		padding: 34rpx 20rpx 66rpx;
		margin-bottom: 20rpx;
		
		.lf,.rt{
			float: left;
			width: 180rpx;
			text-align: center;
			.small{
				font-size: 24rpx;
				line-height: 34rpx;
				color: #dedede;
			}
			.big{
				font-size: 36rpx;
				line-height: 50rpx;
				color: #fff;
			}
		}
		.ct{
			float: left;
			width: 350rpx;
			height: 350rpx;
			border-radius: 50%;
		}
	}
	.box{
		.search{
			width: 322rpx;
			height: 44rpx;
			background-color: #fff;
			border-radius: 44rpx;
			padding-left: 20rpx;
			input{
				font-size: 24rpx;
			}
		}
	}
	
</style>
