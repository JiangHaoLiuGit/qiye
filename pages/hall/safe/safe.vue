<template>
	<view class="page2">
		<u-navbar title="保险档案" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			
		</u-navbar>
		<view class="box paddingLeftRight">
			<view class="search u-flex" @click="carShow = true">
				<image src="../../../static/pic20.png" mode="aspectFit" class="img"></image>
				<input type="text" disabled maxlength="8" placeholder=" 请输入车牌号" v-model="carValue">
			</view>
			<u-keyboard ref="uKeyboard" mode="car" @change="valChange" @backspace="backspace" v-model="carShow"
				@confirm="searchCar"></u-keyboard>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 por" v-for="(item,index) in order" @click="go(item.id)">
					<view class="u-padding-top-24 u-padding-left-30 u-padding-bottom-20 u-flex">
						<view class="u-margin-right-80">
							车头：{{item.carNumber}}
						</view>
						<view v-if="item.gCarNumber != null && item.gCarNumber != ''">
							挂车：{{item.gCarNumber}}
						</view>
					</view>
					<view class="u-flex u-padding-left-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8 u-row-between">
						<view class="">
							<view class="u-flex u-marign-bottom-20">
								<view class="inText nineColor">
									交强险到期日：
								</view>
								<view class="inText nineColor">
									{{item.jqxExpired}}
								</view>
							</view>
							<view class="u-flex u-padding-top-20">
								<view class="inText nineColor">
									保险公司：
								</view>
								<view class="inText nineColor">
									{{item.insuranceCompanyName}}
								</view>
							</view>
						</view>
						<view class="u-padding-right-30">
							<Icon :iconType="'iconfanhui2'" class="icon" style="color: #999;font-size: 28rpx;"></Icon>
						</view>
					</view>
				</view>
			</mescroll-body>
			
			
			
			
		</view>
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
				carShow: false,
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 没有保险信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				type:"2",
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false,
				carValue:""
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
				
					ajax.get(config.safeList_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
						carNumber:this.carValue
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									let list = res.data.list
									this.type = 2
									for(let i = 0 ; i < res.data.list.length ; i++){
										if(res.data.list[i].insuredDate){
											this.one = this.timer(res.data.list[i].insuredDate)
											res.data.list[i].insuredDate = this.timer(res.data.list[i].insuredDate)
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
			to(){
				uni.navigateTo({
					url:"/pages/hall/search/search?type=" + 2
				})
			},
			go(id){
				uni.navigateTo({
					url:"/pages/hall/safeInfo/safeInfo?id="+id+"&&one="+this.one+"&&two="+this.two
				})
			},
			valChange(val) {
				console.log(val)
				if(this.carValue.length < 8){
					this.carValue += val
				}
			},
			backspace() {
				if (this.carValue) {
					this.carValue = this.carValue.substr(0, this.carValue.length - 1)
				}
			},
			//个人车辆搜索
			searchCar() {
				this.order = []
				this.mescroll.resetUpScroll()
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
	
	.userInfo{
		height: 80rpx;
		line-height: 80rpx;
	}
	.box{
		margin-top: 20rpx;
	}
	
	.page .mescroll-empty{
		padding: 100rpx 50rpx!important;
	}
	
</style>
