<template>
	<view class="page">
		<u-navbar title="驾驶员详情" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<u-line color="#DDD"></u-line>
		<view class="paddingLeftRight u-padding-bottom-20 u-margin-top-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);">
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					姓名
				</view>
				<view class="timerView">
					{{obj.driver}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					手机号
				</view>
				<view class="timerView">
					{{obj.phone}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					地址
				</view>
				<view class="timerView active u-line-1">
					{{obj.address}}
					<view class="small" v-if="obj.address" @click="open(obj.address,'地址')">详情</view>
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
					所属公司
				</view>
				<view class="timerView">
					{{obj.companyName}}
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
					驾驶证初领时间
				</view>
				<view class="timerView">
					{{obj.driverLicenseIssuedate}}
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
					驾驶证类型
				</view>
				<view class="timerView">
					{{obj.driverLicenseType}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex u-row-between">
				<view class="textView">
					驾驶证有效结束时间
				</view>
				<view class="timerView">
					{{obj.driverLicenseEnddate}}
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
					紧急联系人手机号
				</view>
				<view class="timerView">
					{{obj.urgentPhone}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			
			<view class="u-margin-top-24 u-margin-bottom-20 u-padding-top-18 u-padding-right-20 u-padding-bottom-18 u-padding-left-20 f9fBackground inText nineColor borderRadius" style="min-height: 200rpx;">
				备注：<text v-if="obj.remark" class="huan">{{obj.remark}}</text>
			</view>
			
		</view>
		
		<view class="paddingLeftRight marginLeftRight u-margin-top-20 u-padding-top-26 u-padding-left-36 u-margin-bottom-38 borderRadius fffBackground" v-if="imgList.length > 0" style="width: calc(100% - 60rpx);">
			<view class="u-flex u-padding-bottom-20">
				<Icon :iconType="'iconzu361'" class="icon threeColor u-margin-right-18"></Icon>
				<text class="nineColor smallText">
					证件照片
				</text>
			</view>
			<swiper class="swiper1" :indicator-dots="true" :circular="true" :autoplay="true" :interval="4000" :duration="500">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<view class="swiper-item one uni-bg-red">
						<image :src="item.src" mode="aspectFit" @click="img(item.src)"></image>
						<view class="inText threeColor u-margin-top-10 u-margin-bottom-10 u-text-center">{{item.name}}</view>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<view class="popup" v-if="show" @click="show = false">
			<view class="pros por u-flex u-row-center">
				<view class="block fffBackground" @click.stop="ss()">
					<view class="hintTit">{{showType}}</view>
					<view class="hintCon">{{showTitle}}</view>
					<view class="hintBtn" @click="show = false">
						<view style="color: #2D84FF;width: 100%;">我知道了</view>
					</view>
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
				imgs:false,
				imgRul:"",
				 switch1:false,
				 switch2:false,
				 id:"",
				 one:"",
				 two:"",
				 obj:"",
				 imgList:[],
				 show:false,
				 showType:"",
				 showTitle:"",
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			if (option.one) {
				this.one = option.one
			}
			if (option.two) {
				this.two = option.two
			}
		},
		onShow(){
			this.imgList = []
			ajax.get(config.driverList_url + '/' + this.id, {}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					if (this.obj.driverLicenseIssuedate) {
						this.obj.driverLicenseIssuedate = this.timer(this.obj.driverLicenseIssuedate)
					}
					if (this.obj.driverLicenseEnddate) {
						this.obj.driverLicenseEnddate = this.timer(this.obj.driverLicenseEnddate)
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
	
	.timerView{
		text-align: right;
	}
	
</style>
