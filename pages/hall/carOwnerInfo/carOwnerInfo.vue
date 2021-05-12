<template>
	<view class="page">
		<u-navbar title="车主详情" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
		</u-navbar>
		<!-- <u-line color="#DDD"></u-line> -->
		<view class="tab u-flex u-row-between borderRadius">
			<view class="view" :class="tab == 1?'active':''" style="border-top-left-radius:8rpx; border-bottom-left-radius:8rpx;" @click="tabs(1)">
				车主信息
			</view>
			<view class="view por" :class="tab == 2?'active':''" @click="tabs(2)">
				绑定车辆
				<view class="dian" v-if="dian"></view>
			</view>
			<view class="view" :class="tab == 3?'active':''" style="border-top-right-radius:8rpx; border-bottom-right-radius:8rpx;" @click="tabs(3)">
				证件照片
			</view>
		</view>
		<view v-if="typeBlean">
			<view class="tab1" v-if="tab == 1">
				<!-- display: grid; c3中的网格布局. -->
				<view class="paddingLeftRight marginLeftRight borderRadius fffBackground u-margin-bottom-20" style="width: calc(100% - 60rpx);display: grid;">
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
							身份证号
						</view>
						<view class="timerView">
							{{obj.idCard}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							出生日期
						</view>
						<view class="timerView">
							{{obj.birthday}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							证件地址
						</view>
						<view class="timerView active u-line-1">
							{{obj.address}}
							<view class="small" v-if="obj.address" @click="open(obj.address,'证件地址')">详情</view>
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							联系电话
						</view>
						<view class="timerView">
							{{obj.phone}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							备用电话
						</view>
						<view class="timerView">
							{{obj.standbyTelphone}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							驾驶证档案号
						</view>
						<view class="timerView">
							{{obj.driverFileNumber}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							驾驶证号
						</view>
						<view class="timerView">
							{{obj.driverLicenseNumber}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							初领时间
						</view>
						<view class="timerView">
							{{obj.driverLicenseIssuedate}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							到期时间
						</view>
						<view class="timerView">
							{{obj.driverExpiryDate}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							准驾车型
						</view>
						<view class="timerView">
							{{obj.drivingType}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							紧急联系人
						</view>
						<view class="timerView">
							{{obj.urgentContacts}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
						<view class="textView">
							紧急手机号
						</view>
						<view class="timerView">
							{{obj.urgentPhone}}
						</view>
					</view>
					<u-line color="#EFEFEF"></u-line>
					
					<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius"
					 style="min-height: 200rpx;">
						备注：<text v-if="obj.remark" class="huan">{{obj.remark}}</text>
					</view>
				</view>
			</view>
			<view v-else-if="tab == 2" class="tab1">
				<view v-if="carList.length > 0">
					<view class="daoqi marginLeftRight">
						<view class="paddingLeftRight borderRadius fffBackground u-padding-bottom-28 u-margin-bottom-28 u-padding-top-40" v-for="(item,index) in carList" :key="index" @click="go(item)">
							<view class="u-flex">
								<image src="../../../static/pic16.png" mode="widthFix" style="width: 36rpx;" class="u-margin-right-20"></image>
								<text class="inText fontWeight">{{item.companyName}}</text>
							</view>
							<view class="u-flex u-row-between u-margin-top-22" style="flex-wrap: wrap;font-size: 26rpx;">
								<view class="widthHalf nineColor u-padding-bottom-12" v-if="item.carNumber != null" style="width:50%;">
									<text class="threeColor">车头牌号 :</text>{{item.carNumber}}
								</view>
								<view class="widthHalf nineColor u-padding-bottom-12" v-if="item.gCarNumber != null" style="width:50%;">
									<text class="threeColor">挂车牌号 :</text>{{item.gCarNumber}}
								</view>
								<view class="widthHalf nineColor u-padding-bottom-12" v-if="item.contractExpired != null" style="width:50%;">
									<text class="threeColor">营运到期 :</text>{{item.contractExpired}}
								</view>
								<view class="widthHalf nineColor u-padding-bottom-12" v-if="item.operationDue != null" style="width:50%;">
									<text class="threeColor">合约到期 :</text>{{item.operationDue}}
								</view>
								<view class="widthHalf nineColor u-padding-bottom-12" v-if="item.jqxExpired != null" style="width:50%;">
									<text class="threeColor">交强险到期 :</text>{{item.jqxExpired}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有绑定车辆
					</text>
				</view>
			</view>
			<view v-else-if="tab == 3">
				
				<view class="paddingLeftRight marginLeftRight u-padding-top-56 u-padding-bottom-26 u-padding-left-36 u-margin-bottom-38 borderRadius fffBackground"
				 style="width: calc(100% - 60rpx);" v-if="imgList.length>0">
					<swiper class="swiper1" :indicator-dots="true" :circular="true" :autoplay="true" :interval="4000" :duration="500">
						<swiper-item v-for="(item,index) in imgList" :key="index">
							<view class="swiper-item one uni-bg-red">
								<image :src="item.src" mode="aspectFit" @click="img(item.src)"></image>
								<view class="inText threeColor u-margin-top-10 u-margin-bottom-10 u-text-center">{{item.name}}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="none" v-else>
					<image src="../../../static/huoyuan.png" mode="aspectFit"></image>
					<text>
						没有证件照片
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
				switch2: false,
				switch1: false,
				one: "",
				two: "",
				id: "",
				obj: "",
				typeBlean: false,
				imgList: [],
				carType: "",
				carType1: "",
				paiType: "",
				quType: "",
				pinType: "",
				dian:false,
				tab:"1",
				carList:[],
				show:false,
				showType:"",
				showTitle:"",
				imgs:false,
				imgRul:"",
				userId:""
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			if (option.userId) {
				this.userId = option.userId
			}
			ajax.get(config.carList_url, {
				pageIndex: 0,
				pageSize: 0,
				carOwnerId:this.userId
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					if (res.data.list != null) {
						if (res.data.list.length > 0) {
							  
							for(let i = 0 ; i < res.data.list.length ; i ++){
								if (res.data.list[i].contractExpired) {
									res.data.list[i].contractExpired = this.timer(res.data.list[i].contractExpired)
								}
								if (res.data.list[i].operationDue) {
									res.data.list[i].operationDue = this.timer(res.data.list[i].operationDue)
								}
								if (res.data.list[i].jqxExpired) {
									res.data.list[i].jqxExpired = this.timer(res.data.list[i].jqxExpired)
								}
							}
							this.carList = res.data.list
						}
					}
				}
			})
			
		},
		onShow(){
			this.imgList = []
			ajax.get(config.carOwner_url + '/' + this.id, {}).then(res => {
				console.log("车辆详情")
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
			
					this.typeBlean = true
					if (this.obj.birthday) {
						this.obj.birthday = this.timer(this.obj.birthday)
					}
					if (this.obj.driverLicenseIssuedate) {
						this.obj.driverLicenseIssuedate = this.timer(this.obj.driverLicenseIssuedate)
					}
					if (this.obj.driverExpiryDate) {
						this.obj.driverExpiryDate = this.timer(this.obj.driverExpiryDate)
					}
					
					
					if (this.obj.idCardFacePath) {
						let img = {
							name: "身份证照片正面",
							src: this.obj.idCardFacePath
						}
						this.imgList.push(img)
					}
					if (this.obj.idCardBackPath) {
						let img = {
							name: "身份证照片反面",
							src: this.obj.idCardBackPath
						}
						this.imgList.push(img)
					}
					if (this.obj.driverLicenseFacePath) {
						let img = {
							name: "驾驶证照片正面",
							src: this.obj.driverLicenseFacePath
						}
						this.imgList.push(img)
					}
					if (this.obj.qualificationCertificatePath) {
						let img = {
							name: "资格证照片",
							src: this.obj.qualificationCertificatePath
						}
						this.imgList.push(img)
					}
					if (this.obj.otherDocumentsPath) {
						let img = {
							name: "其他类型证件照片",
							src: this.obj.otherDocumentsPath
						}
						this.imgList.push(img)
					}
					console.log(this.imgList)
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
			open(text,type){
				this.show = true
				this.showType = type
				this.showTitle = text
			},
			tabs(index){
				this.tab = index
				if(index == 2){
					this.dian = false
				}
			},
			timer(info) {
				let date = new Date(info.replace(/-/g, '/'));
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + MM + '-' + d;
			},
			go(item){
				uni.navigateTo({
					url:"/pages/hall/carInfo/carInfo?id="+item.id+"&&one="+item.violationCount+"&&two="+item.warnCount
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.daoqi{
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
			width: 33.3%;
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
