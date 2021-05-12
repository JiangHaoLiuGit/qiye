<template>
	<view class="page">
		<u-navbar title="查询" title-color="#333" back-icon-color="#333" :background="{ background: '#fff' }"
			:borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<view class="box paddingLeftRight u-margin-top-20">
			<view class="search u-flex borderRadius" @click="carShow = true" v-if="searchType == 1">
				<image src="../../../static/pic20.png" mode="widthFix" style="width: 30rpx;" class="img"></image>
				<input type="text" disabled maxlength="8" placeholder=" 请输入车牌号" v-model="carValue">
			</view>
			<view class="search u-flex borderRadius" v-else-if="searchType == 2">
				<image src="../../../static/pic20.png" mode="widthFix" style="width: 30rpx;" class="img"></image>
				<input type="text" maxlength="10" placeholder=" 请输入培训计划名称" @confirm="sears" v-model="planName">
			</view>
			<u-keyboard ref="uKeyboard" mode="car" @change="valChange" @backspace="backspace" v-model="carShow"
				@confirm="searchCar"></u-keyboard>
			<view
				class="searchAnnal borderRadius u-margin-top-20 u-margin-bottom-50 fffBackground u-padding-top-24 u-padding-bottom-30 u-padding-left-20 u-padding-right-20"
				style="box-shadow: 0 0 4rpx rgba(0,0,0,.16);">
				<view class="u-flex u-row-between">
					<view class="sixColor smallText">
						<text v-if="searchType == 2">
							搜索结果
						</text>
						<text v-else-if="searchType == 1">
							<text v-if="type == 1">
								搜索记录
							</text>
							<text v-if="type == 2">
								搜索结果
							</text>
						</text>
					</view>
					<view v-if="searchType == 2">
						<view class="u-flex" @click="shua">
							<Icon class="icon u-margin-right-10 smallText nineColor" style="font-size: 24rpx;"
								:iconType="'iconshuaxin'"></Icon>
							<text class="sixColor smallText nineColor">刷新</text>
						</view>
					</view>
					<view v-else-if="searchType == 1">
						<view class="u-flex" v-if="type == 1" @click="clear">
							<Icon class="icon u-margin-right-10 smallText nineColor" style="font-size: 24rpx;"
								:iconType="'iconzu318'"></Icon>
							<text class="sixColor smallText nineColor">清除记录</text>
						</view>
						<view class="u-flex" v-else-if="type == 2" @click="shua">
							<Icon class="icon u-margin-right-10 smallText nineColor" style="font-size: 24rpx;"
								:iconType="'iconshuaxin'"></Icon>
							<text class="sixColor smallText nineColor">刷新</text>
						</view>
					</view>
					
				</view>
				<view class="searchList u-padding-top-24" v-if="type == 1">
					<view v-if="searchType == 1">
						<view v-if="annalList.length > 0">
							<view v-for="(item,index) in annalList" :key="index">
								<view class="item u-padding-top-24 u-padding-bottom-24 u-padding-left-24 u-flex u-border-bottom u-row-between" v-if="index <= 9" style="border-color: #ddd;">
									<view @click="to1(item)" style="width: 500rpx;">
										<view class="bigText 000Color bold">{{item.carNumber}}</view>
										<view class="smallText nineColor u-margin-top-10 u-line-1">所属公司: {{item.companyName}}</view>
									</view>
									<image src="../../../static/pic23.png" style="width: 24rpx;height: 24rpx;" mode="aspectFit" @click="del(index)"></image>
								</view>
							</view>
						</view>
						<view v-else class="inText nineColor u-flex u-row-center" style="height: 250rpx;">
							暂无记录
						</view>
					</view>
					<view v-else-if="searchType == 2">
						<!-- <view v-if="safeList.length > 0">
							<view v-for="(item,index) in safeList" :key="index">
								<view class="item u-padding-top-24 u-padding-bottom-24 u-padding-left-24 u-flex u-border-bottom u-row-between" v-if="index <= 9" style="border-color: #ddd;">
									<view @click="to1(item)" style="width: 500rpx;">
										
										<view class="bigText 000Color bold">{{item.planName}}</view>
										<view class="smallText nineColor u-margin-top-10 u-line-1">结束时间: {{item.planEndDate}}</view>
									</view>
									<image src="../../../static/pic23.png" style="width: 24rpx;height: 24rpx;" mode="aspectFit" @click="del(index)"></image>
								</view>
							</view>
						</view>
						<view v-else class="inText nineColor u-flex u-row-center" style="height: 250rpx;">
							暂无记录
						</view> -->
					</view>
				</view>
				<view class="searchList u-padding-top-24" v-else-if="type == 2">
					<view v-if="searchType == 1">
						<view v-if="pageBlean" class="u-flex u-row-center nineColor smallText u-padding-top-40">
							暂无更多
						</view>
						<view v-else>
							<view v-for="(item,index) in list" :key="index" class="item u-padding-top-24 u-flex" style="border-color: #ddd;" @click="to(item)">
								<view class="">
									<image src="../../../static/pic20.png" style="width: 28rpx;height: 28rpx;" mode="aspectFit" class="u-margin-right-20 img"></image>
								</view>
								<view class="u-border-bottom " style="border-color: #ddd;width: calc(100% - 48rpx);">
									<view class="bigText 000Color bold u-margin-bottom-10">{{item.carNumber}}</view>
									<view class="smallText nineColor u-margin-bottom-20 u-line-1">所属公司: {{item.companyName}}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else-if="searchType == 2">
						<view v-if="pageBlean" class="u-flex u-row-center nineColor smallText u-padding-top-40">
								暂无更多
							</view>
						</view>
						<view v-for="(item,index) in safeList" :key="index" class="item u-padding-top-24 u-flex" style="border-color: #ddd;" @click="to(item)">
							<view class="">
								<image src="../../../static/pic20.png" style="width: 28rpx;height: 28rpx;" mode="aspectFit" class="u-margin-right-20 img"></image>
							</view>
							<view class="u-border-bottom " style="border-color: #ddd;width: calc(100% - 48rpx);">
								<view class="bigText 000Color bold u-margin-bottom-4">{{item.planName}}</view>
								<view class="smallText nineColor u-margin-bottom-20 u-line-1">结束时间: {{item.planEndDate}}</view>
							</view>
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
				carShow: false,
				carValue: "",
				//1是搜索记录,2是搜索列表
				type:1,
				//1是个人车辆,2是保险
				searchType:1,
				pageIndex:1,
				pageSize:10,
				pageBlean:false,
				//个人车辆列表历史记录
				annalList: [],
				//保险列表历史记录
				safeList:[],
				//个人车辆列表
				list:[
					
				],
				//培训计划名字
				planName:"",
			}
		},
		onLoad(option) {
			if(option.type){
				this.searchType = option.type
				if(this.searchType == 2){
					this.type = 2
					this.pageBlean = true
				}
			}
			if(this.searchType == 1){
				uni.getStorage({
					key:"annalList",
					success:res => {
						console.log(res)
						if(typeof res.data == "string" && res.data != ''){
							let obj = JSON.parse(res.data)
							if(typeof obj == "object"){
								this.annalList = obj
								console.log(this.annalList)
								console.log(this.annalList.length)
							}
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			}else if(this.searchType == 2){
				
				// uni.getStorage({
				// 	key:"safeList",
				// 	success:res => {
				// 		console.log(res)
				// 		if(typeof res.data == "string" && res.data != ''){
				// 			let obj = JSON.parse(res.data)
				// 			if(typeof obj == "object"){
				// 				this.safeList = obj
				// 				console.log(this.safeList)
				// 			}
				// 		}
				// 	},
				// 	fail: err => {
				// 		console.log(err)
				// 	}
				// })
			}
		},
		onShow(){
			// this.pageIndex = 0
			// this.list = []
			// this.safeList = []
			
			// if(this.searchType == 1){
				
			// }else if(this.searchType == 2){
				
			// }
		},
		onReachBottom() {
			console.log('页面到底了')
			// if(this.searchType == 1){
			// 	this.searchCar();
			// }else if(this.searchType == 2){
			// 	this.searchCar();
			// }
			
		},
		onHide(){
			this.type = 1
		},
		onUnload(){
			this.type = 1
		},
		methods: {
			del(index){
				if(this.searchType == 1){
					this.annalList.splice(index,1)
					let list = JSON.stringify(this.annalList)
					uni.setStorage({
						key: 'annalList',
						data: list
					})
				}else if(this.searchType == 2){
					this.safeList.splice(index,1)
					let list = JSON.stringify(this.safeList)
					uni.setStorage({
						key: 'safeList',
						data: list
					})
				}
				
				
			},
			clear(){
				if(this.searchType == 1){
					this.annalList = []
					uni.setStorage({
						key: 'annalList',
						data: ""
					})
				}else if(this.searchType == 2){
					this.safeList = []
					uni.setStorage({
						key: 'safeList',
						data: ""
					})
				}
				
			},
			valChange(val) {
				if(this.carValue.length < 8){
					this.carValue += val
				}
				
			},
			backspace() {
				if (this.carValue) {
					this.carValue = this.carValue.substr(0, this.carValue.length - 1)
				}
			},
			//刷新接口
			shua(){
				this.list = []
				this.safeList = []
				if(this.searchType == 1){
					ajax.get(config.carList_url, {
						fuzzyQuery: this.carValue,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(res.data.list.length == 0){
								this.pageBlean = true
							}else{
								this.pageBlean = false
							}
							this.type = 2
							this.pageIndex++
							this.list = res.data.list
						}
					}).catch(err => {
						console.log(err)
					})
					
				}else if(this.searchType == 2){
					ajax.get(config.planRecordList_url, {
						planName: this.planName,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(res.data.list.length == 0){
								this.pageBlean = true
							}else{
								this.pageBlean = false
							}
							this.type = 2
							this.pageIndex++
							for(let i = 0 ; i < res.data.list.length ; i ++){
								res.data.list[i].planEndDate = this.timer(res.data.list[i].planEndDate)
							}
							this.safeList = res.data.list
						}
					}).catch(err => {
						console.log(err)
					})
				}
				
			},
			//个人车辆搜索
			searchCar() {
				if(this.searchType == 1){
					//去搜索
					//this.pageSize
					//this.pageIndex
					ajax.get(config.carList_url, {
						fuzzyQuery: this.carValue,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							
							if(res.data.list.length == 0){
								this.pageBlean = true
							}else{
								this.pageBlean = false
							}
							this.type = 2
							
							// this.pageIndex++
							this.list = res.data.list
						}
					}).catch(err => {
						console.log(err)
					})
				}else if(this.searchType == 2){
					//去搜索
					ajax.get(config.planRecordList_url, {
						planName: this.planName,
						pageIndex:0,
						pageSize:0,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if(res.data.list.length == 0){
								this.pageBlean = true
							}else{
								this.pageBlean = false
							}
							for(let i = 0 ; i < res.data.list.length ; i ++){
								res.data.list[i].planEndDate = this.timer(res.data.list[i].planEndDate)
							}
							this.type = 2
							this.pageIndex++
							this.safeList = this.safeList.concat(res.data.list)
						}
					}).catch(err => {
						console.log(err)
					})
				}
				
			},
			sears(){
				this.safeList = []
				this.searchCar()
				uni.hideKeyboard(res => {
				  console.log(res)
				})
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
			to(item){
				if(this.searchType == 1){
					let arr = [item]
					let list = this.annalList.concat(arr)
					list = JSON.stringify(list)
					for(let i = 0 ; i < this.annalList.length ; i ++){
						if(this.annalList[i].carNumber == item.carNumber){
							uni.navigateTo({
								url:"/pages/hall/carInfo/carInfo?id="+item.id
							})
							return true
						}
					}
					uni.setStorage({
						key: 'annalList',
						data: list
					})
					uni.navigateTo({
						url:"/pages/hall/carInfo/carInfo?id="+item.id
					})
					
				}else if(this.searchType == 2){
					// let arr = [item]
					// let list = this.safeList.concat(arr)
					// list = JSON.stringify(list)
					// for(let i = 0 ; i < this.safeList.length ; i ++){
					// 	if(this.safeList[i].carNumber == item.carNumber){
					// 		uni.navigateTo({
					// 			url:"/pages/hall/safeInfo/safeInfo?id="+item.id
					// 		})
					// 		return true
					// 	}
					// }
					// uni.setStorage({
					// 	key: 'safeList',
					// 	data: list
					// })
					uni.navigateTo({
						url: "/pages/hall/trainInfo/trainInfo?id=" + item.id,
					});
				}
				
			},
			to1(item){
				if(this.searchType == 1){
					uni.navigateTo({
						url:"/pages/hall/carInfo/carInfo?id="+item.id
					})
				}else if(this.searchType == 2){
					uni.navigateTo({
						url:"/pages/hall/safeInfo/safeInfo?id="+item.id
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="less">

</style>
