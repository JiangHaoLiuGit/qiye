<template>
	<view class="page">
		<u-navbar title="员工详情" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<u-line color="#DDD"></u-line>
		<view class="paddingLeftRight u-padding-bottom-20 u-margin-top-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);">
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					姓名
				</view>
				<view class="timerView">
					{{obj.userName}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					手机号
				</view>
				<view class="timerView">
					{{obj.phone}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					身份证
				</view>
				<view class="timerView">
					{{obj.idCard}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					入职时间
				</view>
				<view class="timerView" v-if="obj.entryTime != null">
					{{obj.entryTime}}
				</view>
				<view class="timerView" v-else>
					
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					部门
				</view>
				<view class="timerView" v-if="obj.deptName != null">
					{{obj.deptName}}
				</view>
				<view class="timerView" v-else>
					
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					职位
				</view>
				<view class="timerView" v-if="obj.position != null">
					{{obj.position}}
				</view>
				<view class="timerView" v-else>
					
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					邮箱
				</view>
				<view class="timerView">
					{{obj.eMail}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20 u-flex">
				<view class="textView">
					拥有角色
				</view>
				<view class="timerView" v-if="obj.roleList.length > 0">
					{{obj.roleList[0].name}}
				</view>
				<view class="iconSecond" v-if="false">
					<Icon :iconType="'iconzu305'" class="icon threeColor"></Icon>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				 switch1:false,
				 switch2:false,
				 id:"",
				 obj:{
					 roleList:[]
				 },
				 imgList:[]
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			
		},
		onShow(){
			ajax.get(config.staffList_url + '/' + this.id, {}).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					if(this.obj.entryTime){
						this.obj.entryTime = this.timer(this.obj.entryTime)
					}
					// if(res.data.insuredDate){
					// 	if(res.data.insuredDate.indexOf(" ") != -1){
					// 		res.data.insuredDate = res.data.insuredDate.split(" ")[0]
					// 	}
					// }
					// if(res.data.jqxExpired){
					// 	if(res.data.jqxExpired.indexOf(" ") != -1){
					// 		res.data.jqxExpired = res.data.jqxExpired.split(" ")[0]
					// 	}
					// }
					// if(res.data.syxExpired){
					// 	if(res.data.syxExpired.indexOf(" ") != -1){
					// 		res.data.syxExpired = res.data.syxExpired.split(" ")[0]
					// 	}
					// }
					// if(res.data.gcxExpired){
					// 	if(res.data.gcxExpired.indexOf(" ") != -1){
					// 		res.data.gcxExpired = res.data.gcxExpired.split(" ")[0]
					// 	}
					// }
					// if(res.data.fjxExpired){
					// 	if(res.data.fjxExpired.indexOf(" ") != -1){
					// 		res.data.fjxExpired = res.data.fjxExpired.split(" ")[0]
					// 	}
					// }
					// if(this.obj.jqxFilePath){
					// 	let img = {
					// 		name:"交强险保单照片",
					// 		src:this.obj.jqxFilePath
					// 	}
					// 	this.imgList.push(img)
					// }
					// if(this.obj.syxFilePath){
					// 	let img = {
					// 		name:"商业险保单照片",
					// 		src:this.obj.syxFilePath
					// 	}
					// 	this.imgList.push(img)
					// }
					// if(this.obj.gcxFilePath){
					// 	let img = {
					// 		name:"挂车险保单照片",
					// 		src:this.obj.gcxFilePath
					// 	}
					// 	console.log(img)
					// 	this.imgList.push(img)
					// }
					// if(this.obj.fjxFilePathOne){
					// 	let img = {
					// 		name:"附加险保单照片",
					// 		src:this.obj.fjxFilePathOne
					// 	}
					// 	this.imgList.push(img)
					// }
					// if(this.obj.fjxFilePathTwo){
					// 	let img = {
					// 		name:"附加险保单照片",
					// 		src:this.obj.fjxFilePathTwo
					// 	}
					// 	this.imgList.push(img)
					// }
					// console.log(this.imgList)
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
			
		},
		methods: {
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
