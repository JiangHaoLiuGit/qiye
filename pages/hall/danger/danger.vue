<template>
	<view class="page2">
		<u-navbar title="出险档案" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			
		</u-navbar>
		<view class="box paddingLeftRight">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 borderRadius boxShadow por" v-for="(item,index) in order" @click="go(item.id)">
					<view class="firms u-padding-top-24 u-padding-left-30 u-padding-right-30 u-padding-bottom-20 u-flex u-row-between" :class="item.isEnd == '0'?'block':'blue'">
						<view class="u-margin-right-20 fffColor bigText">
							车牌号：{{item.carNumber}}
						</view>
						<view class="fffColor inText" v-if="item.isEnd == 0">
							未结案
						</view>
						<view class="fffColor inText" v-else-if="item.isEnd == 1">
							已结案
						</view>
						<view class="bx" :class="item.isEnd == '0'?'block':'blue'"></view>
					</view>
					<view class="u-padding-left-30 u-padding-bottom-30 u-padding-top-10 u-padding-bottom-8">
						<view class="u-flex u-marign-bottom-20 u-padding-top-20">
							<view class="inText nineColor u-marign-right-20">
								所属公司：
							</view>
							<view class="inText nineColor">
								{{item.companyName}}
							</view>
						</view>
						<view class="u-flex u-marign-bottom-20 u-padding-top-20">
							<view class="inText nineColor u-marign-right-20">
								保险公司：
							</view>
							<view class="inText nineColor">
								{{item.safeCompanyName}}
							</view>
						</view>
					</view>
					<view class="u-padding-left-30 u-padding-bottom-24 u-padding-top-24 u-padding-right-30 u-flex u-row-between" style="box-shadow: 0px 2rpx 8rpx rgba(0, 0, 0, 0.16);overflow: unset;">
						<view class="u-flex">
							<view class="inText">
								驾驶员：
							</view>
							<view class="inText">
								{{item.driverName}}
							</view>
						</view>
						<view class="u-flex">
							<view class="inText">
								出险时间：
							</view>
							<view class="inText">
								{{item.outDangerDate}}
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
						// icon: "../../../static/huoyuan.png",
						tip: '~ 没有出险信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				canReset:false,
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
					ajax.get(config.dangerList_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									let list = res.data.list
									for(let i = 0 ; i < res.data.list.length ; i++){
										
										if(res.data.list[i].outDangerDate){
											res.data.list[i].outDangerDate = this.timer(res.data.list[i].outDangerDate)
										}
										// if(res.data.list[i].jqxExpired){
										// 	this.two = this.timer(res.data.list[i].jqxExpired)
										// 	res.data.list[i].jqxExpired = this.timer(res.data.list[i].jqxExpired)	
										// }
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
					url:"/pages/hall/dangerInfo/dangerInfo?id="+id
				})
			},
			timer(info){
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
	
	
	.userInfo{
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.page .mescroll-empty{
		padding: 100rpx 50rpx!important;
	}
	
</style>
