<template>
	<view class="page2">
		<u-navbar title="员工档案" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			
		</u-navbar>
		<view class="box paddingLeftRight">
			<view class="search u-flex" @click="show = true">
				<image src="../../../static/pic20.png" mode="aspectFit" class="img"></image>
				<input type="text" disabled maxlength="10" v-model="phone" placeholder=" 请输入手机号">
			</view>
			<u-keyboard mode="number" v-model="show" @change="valChange" @backspace="backspace" @confirm="phones" :mask="true"></u-keyboard>
			<!-- smallTitle -->
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 borderRadius boxShadow por" v-for="(item,index) in order" @click="go(item.id)">
					<view class="u-padding-top-24 u-padding-left-30 u-padding-bottom-20 u-flex">
						<view class="u-margin-right-20" style="min-width: 100rpx;">
							{{item.userName}}
						</view>
						<view class="smallTitle" v-if="item.position != null && item.position != ''">
							{{item.position}}
						</view>
						<view v-else>
						</view>
					</view>
					<view class="u-flex u-padding-left-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8 u-row-between">
						<view class="">
							<view class="u-flex u-marign-bottom-20">
								<view class="inText nineColor u-marign-right-20">
									手机号码
								</view>
								<view class="inText nineColor">
									{{item.phone}}
								</view>
							</view>
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
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 没有员工信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				orderBlean:false,
				startBlean:true,
				canReset:false,
				show:false,
				phone:""
			}
		},
		onLoad(option) {
			
		},
		onShow(){
			this.order = []
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
				
					ajax.get(config.staffList_url, {
						phone:this.phone,
						state:"1",
						pageIndex: pageNum,
						pageSize: pageSize,
						// carNumber:"555"
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									let list = res.data.list
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
									this.mescroll.endSuccess(0, false);
									return
								}
								
								let curPageData = res.data.list;
								let curPageLen = res.data.list.length;
								let hasNext = res.data.hasNextPage;
								if(page.num == 1) this.order = []; //如果是第一页需手动置空列表
								
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
			go(id){
				uni.navigateTo({
					url:"/pages/hall/staffInfo/staffInfo?id="+id
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
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				if(this.phone.length <= 10){
					this.phone += val;
				}
				console.log(this.value);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.phone.length) this.phone = this.phone.substr(0, this.phone.length - 1);
			},
			phones(){
				this.order = []
				this.mescroll.resetUpScroll()
			}
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
