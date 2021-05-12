<template>
	<view class="page">
		<u-navbar title="出险详情" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
		</u-navbar>
		<!-- <u-line color="#DDD"></u-line> -->
		<view class="tab u-flex u-row-between borderRadius">
			<view class="view" :class="tab == 1?'active':''" style="border-top-left-radius:8rpx; border-bottom-left-radius:8rpx;" @click="tabs(1)">
				基本信息
			</view>
			<view class="view por" :class="tab == 2?'active':''" @click="tabs(2)">
				附件照片
			</view>
		</view>
		
		
		<view v-if="typeBlean">
			<view class="tab1" v-if="tab == 1">
				<view v-if="obj.carNumber != null">
					<view class="paddingLeftRight marginLeftRight borderRadius fffBackground u-margin-bottom-20 u-padding-bottom-20" style="width: calc(100% - 60rpx);">
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								车牌号码
							</view>
							<view class="timerView">
								{{obj.carNumber}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								所属公司
							</view>
							<view class="timerView">
								{{obj.companyName}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								车主姓名
							</view>
							<view class="timerView">
								{{obj.carOwner}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								车主联系电话
							</view>
							<view class="timerView">
								{{obj.phone}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								驾驶员姓名
							</view>
							<view class="timerView">
								{{obj.driverName}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								驾驶员联系电话
							</view>
							<view class="timerView">
								{{obj.driverPhone}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								对方驾驶人姓名
							</view>
							<view class="timerView">
								{{obj.opposingDriver}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								对方驾驶人联系电话
							</view>
							<view class="timerView">
								{{obj.opposingDriverPhone}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								报案人
							</view>
							<view class="timerView">
								{{obj.informant}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								报案方式
							</view>
							<view class="timerView" v-if="obj.reportMethod == 1">
								电话
							</view>
							<view class="timerView" v-else-if="obj.reportMethod == 2">
								上门
							</view>
							<view class="timerView" v-else-if="obj.reportMethod == 3">
								传真
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								出险时间
							</view>
							<view class="timerView">
								{{obj.outDangerDate}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								出险地点
							</view>
							<view class="timerView active u-line-1">
								{{obj.outDangerAddress}}
								<view class="small" v-if="obj.outDangerAddress" @click="open(obj.outDangerAddress,'出险地点')">详情</view>
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								有无人伤
							</view>
							<view class="timerView" v-if="obj.noHurt == 1">
								有人受伤
							</view>
							<view class="timerView" v-else-if="obj.noHurt == 2">
								无人受伤
							</view>
							<view class="timerView" v-else-if="obj.noHurt == 3">
								有人死亡
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								保险公司
							</view>
							<view class="timerView">
								{{obj.safeCompanyName}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								定责信息
							</view>
							<view class="timerView">
								{{obj.responsibility}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								事故经过
							</view>
							<view class="timerView u-line-1 active">
								{{obj.afterAccident}}
								<view class="small" v-if="obj.afterAccident" @click="open(obj.afterAccident,'事故经过')">详情</view>
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								打款时间
							</view>
							<view class="timerView">
								{{obj.paymentTime}}
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								实际理赔总金额
							</view>
							<view class="timerView">
								{{obj.claimAmount}}元
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
							理赔状态
							</view>
							<view class="timerView" v-if="obj.claimStatus == 1">
								已报案登记
							</view>
							<view class="timerView" v-else-if="obj.claimStatus == 2">
								已提交保险公司
							</view>
							<view class="timerView" v-else-if="obj.claimStatus == 3">
								已录入凭条
							</view>
							<view class="timerView" v-else-if="obj.claimStatus == 4">
								赔付金已领回
							</view>
							<view class="timerView" v-else-if="obj.claimStatus == 5">
								赔付金已结算
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
							<view class="textView">
								是否结案
							</view>
							<view class="timerView" v-if="obj.isEnd == 0">
								未结案
							</view>
							<view class="timerView" v-else-if="obj.isEnd == 1">
								已结案
							</view>
						</view>
						<u-line color="#EFEFEF"></u-line>
						<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
						 style="min-height: 200rpx;">
							事故备注：<text v-if="obj.accidentRemarks" class="huan">{{obj.accidentRemarks}}</text>
						</view>
						<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
						 style="min-height: 200rpx;">
							备注：<text v-if="obj.remark" class="huan">{{obj.remark}}</text>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有到出险信息
					</text>
				</view>
			</view>
			<view v-else-if="tab == 2" class="tab1">
				<view class="paddingLeftRight marginLeftRight u-padding-top-56 u-padding-bottom-26 u-padding-left-36 u-margin-bottom-38 borderRadius fffBackground"
				 style="width: calc(100% - 60rpx);" v-if="obj.pictureList.length>0">
					<swiper class="swiper1" :indicator-dots="true" :circular="true" :autoplay="true" :interval="4000" :duration="500">
						<swiper-item v-for="(item,index) in obj.pictureList" :key="index">
							<view class="swiper-item one uni-bg-red">
								<image :src="item.path" mode="aspectFit" @click="img(item.path)"></image>
								<view class="inText threeColor u-margin-top-10 u-margin-bottom-10 u-text-center">{{item.name}}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有附件照片
					</text>
				</view>
			</view>
		</view>
		<view class="blockBox" v-show="imgs" @click="imgs = false">
			<image :src="imgRul" class="img" @click="imgs = false" mode="aspectFit"></image>
		</view>
		<view class="popup" v-if="show" @click="show = false">
			<view class="pros por u-flex u-row-center">
				<view class="block fffBackground" @click.stop>
					<view class="hintTit">{{showType}}</view>
					<view class="hintCon">{{showTitle}}</view>
					<view class="hintBtn" @click="show = false">
						<view style="color: #2D84FF;width: 100%;">我知道了</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				id: "",
				obj: "",
				typeBlean: false,
				imgList: [],
				quType: "",
				tab:"1",
				show:false,
				showType:"",
				showTitle:"",
				imgs:false,
				imgRul:""
			}
		},
		onLoad(option) {
			// ajax.get(config.bdData_url + '/DRIVE_FORM', {}).then(res => {
			// 	console.log("系统驱动形式")
			// 	console.log(res)
			// 	if (res.code == 0) {
			// 		//车辆类别
			// 		this.quType = res.data
			// 	}
			// })
			if (option.id) {
				this.id = option.id
			}
		},
		onShow(){
			this.imgList = []
			ajax.get(config.dangerList_url + '/' + this.id, {}).then(res => {
				console.log("车辆详情")
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					this.typeBlean = true
					// outDangerDate paymentTime
					if (this.obj.outDangerDate) {
						this.obj.outDangerDate = this.timer(this.obj.outDangerDate)
					}
					if (this.obj.paymentTime) {
						this.obj.paymentTime = this.timer(this.obj.paymentTime)
					}
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
		},
		methods: {
			img(url) {
				this.imgs = true
				this.imgRul = url
			},
			tabs(index){
				this.tab = index
				
			},
			open(text,type){
				this.show = true
				this.showType = type
				this.showTitle = text
			},
			timer(info) {
				//.replace(/-/g, '/')
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
	.daoqi{
		height: calc(100vh - 300rpx);
		width: calc(100% - 60rpx);
		position: relative;
		.boxs{
			bottom: 0;
			left: 0;
		}
	}
	.tab1{
		.timerView{
			text-align: right;
		}
	}
	.tab{
		margin: 20rpx 30rpx;
		border:2rpx solid #2D84FF;
		.view{
			width: 50%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-right: 2rpx solid #2D84FF;
			background: #fff;
			color: #2D84FF;
			.dian{
				position: absolute;
				width: 16rpx;
				height: 16rpx;
				background-color: #ef4534;
				top: 32rpx;
				right: 30rpx;
				border-radius: 50%;
			}
		}
		.view:last-child{
			border-right: none;
		}
		.view.active{
			background: #2D84FF;
			color: #fff;
		}
	}

</style>
