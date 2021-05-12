<template>
	<view class="page">
		<u-navbar title="培训统计" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }"
			:borderBottom="false">
			<view slot="right" class="u-padding-right-40 smallText u-flex" style="font-size: 22rpx;color: #fff;">
				
				<view @click="searchs"><Icon :iconType="'iconlujing1'" class="icon" style="color: #fff;"></Icon></view>
				<!-- <text>添加</text> -->
			</view>
		</u-navbar>
		<view class="filter">
			<view class="item u-flex" @click="fixedBlean = !fixedBlean">
				<view class="text bigText">
					{{options.name}}
				</view>
				<Icon :iconType="'iconfanhui2'" class="icon" :class="fixedBlean?'active':''"></Icon>
			</view>
		</view>
		<view class="display">

		</view>
		<view class="fixed" v-show="fixedBlean" @click="big">
			<view class="options" v-for="(item,index) in optionList" @click.stop="small(index)">
				{{item.name}}
			</view>
			
		</view>
		<view class="box">
			<view class="video u-margin-bottom-40">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" @down="downCallback" @up="upCallback">
					<view class="item u-flex" v-for="(item,index) in order" @click="to(item)">
						<view class="itemLeft">
							<image :src="item.homePage" mode="aspectFill"></image>
							<view class="small yellow" v-if="item.planStatus == 0">未结束</view>
							<view class="small yellow" v-if="item.planStatus == 1">未结束</view>
							<view class="small blue" v-else>已结束</view>
						</view>
						<view class="itemRight">
							<view class="inText sixColor u-margin-bottom-8">{{item.planName}}</view>
							<view class="u-flex u-margin-bottom-8">
								<view class="tooSmallText u-margin-right-20 nineColor" v-if="item.allCount == null">
									培训总人数：0人
								</view>
								<view class="tooSmallText u-margin-right-20 nineColor" v-else>
									培训总人数：{{item.allCount}}人
								</view>
							</view>
							<view class="u-flex u-row-between">
								<view>
									<view class="tooSmallText nineColor u-margin-bottom-10">
										培训完成人数：{{item.one}}人
									</view>
									
									<view class="tooSmallText nineColor">
										考试通过人数：{{item.two}}人
									</view>
								</view>
								
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
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				upOption:{
					empty:{
						// icon: "https://www.mescroll.com/img/mescroll-empty.png",
						tip: '~ 沒有培训统计信息 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				options: {
					name: "全部",
					id: 0,
				},
				order:[],
				pageIndex:1,
				pageSize:20,
				canReset:false,
				fixedBlean:false,
				
				optionList: [{
						name: "全部",
						id: 0,
					},
					{
						name: "日常培训",
						id: 1,
					},
					{
						name: "岗前培训",
						id: 2,
					},
					{
						name: "两类人员培训",
						id: 4,
					},
					{
						name: "违章培训",
						id: 3,
					}
				]
			}
		},
		onLoad(option) {

		},
		onShow(){
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
			// ajax.get(config.userStudyList_url,{
			// }).then(res => {
			// 	console.log(res)
			// 	if(res.code == 0){
			// 		this.list = res.data.list
			// 	}
			// }).catch(err => {
			// 	console.log(err)
			// })
		},
		methods: {
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条
				//直接返回暂无消息
				let data = {
					pageIndex: pageNum,
					pageSize: pageSize,
					isReport:0
				}
				if(this.options.id != 0){
					data.type = this.options.id
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
									if(hours == 0){
										if(minute == 0){
											res.data.duration = second + "秒"
										}else{
											res.data.duration = minute + "分钟"
											if(second != 0){
												res.data.duration += second + "秒"
											}
										}
									}else{
										res.data.duration = hours + "小时"
										if(minute != 0){
											res.data.duration += minute + "分钟"
											if(second != 0){
												res.data.duration += second + "秒"
											}
										}
									}
									for(let i = 0 ; i < res.data.list.length ; i ++){
										res.data.list[i].one = 0
										res.data.list[i].two = 0
										if(res.data.list[i].preExamYesCount){
											res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i].preExamYesCount)
										}
										if(res.data.list[i].checkNotCount){
											res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i].checkNotCount)
										}
										if(res.data.list[i].checkNoCount){
											res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i].checkNoCount)
										}
										if(res.data.list[i].checkYesCount){
											res.data.list[i].one = res.data.list[i].one + Number(res.data.list[i].checkYesCount)
										}
										
										if(res.data.list[i].checkNotCount){
											res.data.list[i].two = res.data.list[i].two + Number(res.data.list[i].checkNotCount)
										}
										if(res.data.list[i].checkNoCount){
											res.data.list[i].two = res.data.list[i].two + Number(res.data.list[i].checkNoCount)
										}
										if(res.data.list[i].checkYesCount){
											res.data.list[i].two = res.data.list[i].two + Number(res.data.list[i].checkYesCount)
										}
										
										
									}
								}else if(res.data.list.length == 0){
									this.order = []
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
			big(){
				this.fixedBlean = false
			},
			small(index){
				this.fixedBlean = false
				this.options = this.optionList[index]
				this.mescroll.resetUpScroll()
			},
			to(item){
				uni.navigateTo({
					url: "/pages/hall/trainInfo/trainInfo?id=" + item.planId,
				});
			},
			searchs(){
				console.log(":asdf")
				uni.navigateTo({
					url:"/pages/hall/search/search?type=" + 2
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		background: #fff;
	}

	.display {
		height: 20rpx;
		background-color: #F8F8F8;
	}
	.fixed{
		z-index: 10;
		background: rgba(0,0,0,.21);
		width: 100%;
		position: fixed;
		top: 166rpx;
		left: 0;
		height: calc(100% - 166rpx);
		.options{
			padding-left: 30rpx;
			background-color: #fff;
			height: 88rpx;
			line-height: 88rpx;
			color: #333;
			border-bottom: 2rpx solid #EFEFEF;
			
		}
	}
	.filter {
		padding: 16rpx 0 20rpx 40rpx;

		.item {
			width: max-content;

			.text {
				color: #666;
				margin-right: 10rpx;
			}

			.icon {
				font-size: 24rpx;
				color: #666;
				transform: rotate(0deg);
			}
			.icon.active{
				transform: rotate(90deg);
			}
		}

	}

	.hidden image {
		width: 252rpx;
		height: 264rpx;
	}
</style>
