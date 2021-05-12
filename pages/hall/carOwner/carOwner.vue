<template>
	<view class="page2">
		<u-navbar title="车主档案" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			
		</u-navbar>
		<view class="box paddingLeftRight">
			<view class="search u-flex">
				<image src="../../../static/pic20.png" mode="aspectFit" class="img"></image>
				<input type="text" maxlength="10" v-model="phone" @confirm="phones" placeholder=" 请输入姓名">
			</view>
			<u-keyboard mode="number" v-model="show" @change="valChange" @backspace="backspace" @confirm="phones" :mask="true"></u-keyboard>
			<!-- smallTitle -->
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption"  @down="downCallback" @up="upCallback">
				<view class="fffBackground u-margin-top-20 u-padding-left-30 borderRadius boxShadow por" v-for="(item,index) in order" @click="go(item)">
					<view class="poa inText" style="top: 26rpx;color: #FF7F2D;right: 30rpx;">{{item.carCounts}}辆</view>
					<view class="u-padding-top-24 u-padding-bottom-20 u-flex">
						<view class="u-margin-right-20 fontWeight bigText" style="min-width: 100rpx;">
							{{item.carOwner}}
						</view>
					</view>
					<view class="u-flex u-margin-bottom-20">
						<view class="inText nineColor u-margin-right-10">
							手机号码：
						</view>
						<view class="inText nineColor">
							{{item.phone}}
						</view>
					</view>
					<view class="u-flex u-margin-bottom-20">
						<view class="inText nineColor u-margin-right-10">
							身份证号：
						</view>
						<view class="inText nineColor">
							{{item.idCard}}
						</view>
					</view>
					<view class="u-padding-bottom-32 u-flex">
						<image src="../../../static/pic16.png" mode="widthFix" style="width: 36rpx;" class="u-margin-right-20"></image>
						<text class="inText fontWeight">{{item.companyName}}</text>
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
						tip: '~ 没有车主档案信息 ~', // 提示
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
				ajax.get(config.carOwner_url, {
					carOwner:this.phone,
					pageIndex: pageNum,
					pageSize: pageSize,
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
			go(item){
				uni.navigateTo({
					url:"/pages/hall/carOwnerInfo/carOwnerInfo?id="+item.id + "&&userId=" + item.userId
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
				uni.hideKeyboard(res => {
				  console.log(res)
				})
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
