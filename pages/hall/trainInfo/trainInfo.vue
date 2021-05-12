<template>
	<view class="page">
		<u-navbar title="培训详情" title-color="#fff" back-icon-color="#fff" :background="{ background: '#2D84FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<u-line color="#DDD"></u-line>
		<view class="paddingLeftRight u-padding-bottom-20 u-margin-top-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);">
			<view class="u-padding-top-30 inText threeColor fontWeight u-line-1">{{obj.planName}}</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					所属公司
				</view>
				<view class="timerView">
					{{obj.companyName}}
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					计划开始时间
				</view>
				<view class="timerView">
					{{obj.planBeginDate}}
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					计划结束时间
				</view>
				<view class="timerView">
					{{obj.planEndDate}}
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					总时长
				</view>
				<view class="timerView">
					{{obj.duration}}
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					课件数
				</view>
				<view class="timerView" v-if="obj.classNum!=null">
					{{obj.classNum}}个
				</view>
				<view class="timerView" v-else>
					
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					培训总人数
				</view>
				<view class="timerView">
					{{obj1.planReport.allCount}}人
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					考试通过人数
				</view>
				<view class="timerView">
					{{obj1.planReport.examYesCount}}人
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					未考试人数
				</view>
				<view class="timerView">
					{{obj1.planReport.examNotCount}}人
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					试卷类型
				</view>
				<view class="timerView" v-if="obj.type == 1">
					日常培训
				</view>
				<view class="timerView" v-else-if="obj.type == 2">
					岗前培训
				</view>
				<view class="timerView" v-else-if="obj.type == 3">
					违章培训
				</view>
				<view class="timerView" v-else-if="obj.type == 4">
					两类人员
				</view>
			</view>
			<view class="current u-padding-top-20 u-padding-bottom-20 smallText nineColor u-flex">
				<view class="textView nineColor">
					试卷总分
				</view>
				<view class="timerView" v-if="obj.paper.paperAllScore!=null">
					{{obj.paper.paperAllScore}}分
				</view>
				<view class="timerView" v-else>
					
				</view>
			</view>
			
		</view>
		<view class="paddingLeftRight u-padding-bottom-30 u-padding-top-30 u-margin-top-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);">
			<view class="box u-flex u-row-between">
				<view class="first block">
					排名
				</view>
				<view class="second">
					姓名
				</view>
				<view class="thired">
					培训状态
				</view>
				<view class="fourth block">
					考试分数
				</view>
			</view>
			<view class="box u-flex u-row-between" v-for="(item,index) in fenList" :key="index">
				<view class="first text" v-if="index == 0">
					<view class="sum">
						1
					</view>
					<image src="../../../static/pic24.png" mode="aspectFill"></image>
				</view>
				<view class="first text" v-else-if="index == 1">
					<view class="sum">
						2
					</view>
					<image src="../../../static/pic25.png" mode="aspectFill"></image>
				</view>
				<view class="first text" v-else-if="index == 2">
					<view class="sum">
						3
					</view>
					<image src="../../../static/pic26.png" mode="aspectFill"></image>
				</view>
				<view class="first" v-else>
					<view class="sum">
						{{index+1}}
					</view>
				</view>
				<view class="second">
					{{item.userName}}
				</view>
				<view class="thired" v-if="item.status == 4">
					<image src="../../../static/pic17.png" mode="aspectFill"></image>
				</view>
				<view class="thired" v-else-if="item.status == 3">
					<image src="../../../static/pic32.png" mode="aspectFill"></image>
				</view>
				<view class="thired" v-else-if="item.status == 5">
					<image src="../../../static/pic18.png" mode="aspectFill"></image>
				</view>
				<view class="thired s u-flex u-row-center" v-else-if="item.status == 1 || item.status == 2">
					<s></s>
					<s></s>
				</view>
				<view class="fourth" v-if="item.status == 4">
					{{item.score}}
				</view>
				<view class="fourth s u-flex u-row-center" v-else>
					<s></s>
					<s></s>
				</view>
			</view>
			<!-- <view class="box u-flex u-row-between">
				<view class="first text">
					<view class="sum">
						2
					</view>
					<image src="../../../static/pic25.png" mode="aspectFill"></image>
				</view>
				<view class="second">
					的
				</view>
				<view class="thired">
					<image src="../../../static/pic17.png" mode="aspectFill"></image>
				</view>
				<view class="fourth">
					80
				</view>
			</view>
			<view class="box u-flex u-row-between">
				<view class="first text">
					<view class="sum">
						3
					</view>
					<image src="../../../static/pic26.png" mode="aspectFill"></image>
				</view>
				<view class="second">
					的
				</view>
				<view class="thired">
					<image src="../../../static/pic17.png" mode="aspectFill"></image>
				</view>
				<view class="fourth">
					80
				</view>
			</view>
			<view class="box u-flex u-row-between">
				<view class="first">
					<view class="sum">
						4
					</view>
				</view>
				<view class="second">
					的
				</view>
				<view class="thired">
					<image src="../../../static/pic17.png" mode="aspectFill"></image>
				</view>
				<view class="fourth s u-flex u-row-center">
					<s></s>
					<s></s>
				</view>
			</view> -->
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
				 one:"",
				 two:"",
				 obj:{
					 paper:{}
				 },
				 obj1:{
					 planReport:{}
				 },
				 imgList:[],
				 fenList:[]
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
		},
		onShow(){
			
			ajax.get(config.plan_url + '/' + this.id, {}).then(res => {
				console.log(res)
				if (res.code == 0) {
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
					this.obj = res.data
					// planBeginDate planEndDate
					if (this.obj.planBeginDate) {
						this.obj.planBeginDate = this.timer(this.obj.planBeginDate)
					}
					if (this.obj.planEndDate) {
						this.obj.planEndDate = this.timer(this.obj.planEndDate)
					}
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
			ajax.get(config.userStudySecondList_url + '/' + this.id, {}).then(res => {
				if (res.code == 0) {
					this.obj1 = res.data
				}
			}).catch(err => {
				console.log("获取货源列表接口数据返回失败 error is :" + err);
			})
			ajax.get(config.userStudyFenList_url + "/" + this.id, {
				
			}).then(res => {
				if (res.code == 0) {
					console.log(res)
					if(res.data.list.length < 10){
						this.fenList = res.data.list
					}else{
						this.fenList = res.data.list.slice(0,10)
					}
					console.log(this.fenList)
					
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
	
	.textView,.timerView{
		font-size: 26rpx;
		color: #999;
	}
	.paddingLeftRight{
		.box{
			padding-bottom: 44rpx;
			text-align: center;
			.first{
				width: 70rpx;
				color: #999999;
				font-size: 28rpx;
				line-height: 40rpx;
				position: relative;
				height: 40rpx;
			}
			.first.text{
				font-size: 16rpx;
				line-height: 22rpx;
				color: #fff;
				z-index: 1;
				.sum{
					position: absolute;
					top: 10rpx;
					left: 34rpx;
					z-index: 1;
				}
				image{
					position: absolute;
					top: 0;
					left: 20rpx;
					width: 36rpx;
					height: 30rpx;
					z-index: 0;
				}
			}
			.second{
				width: 200rpx;
			}
			.thired{
				width: 120rpx;
				image{
					width: 36rpx;
					height: 36rpx;
					position: relative;
					top: 6rpx;
				}
			}
			.thired.s{
				s{
					width: 16rpx;
					height: 4rpx;
					background-color: #B2B2B2;
					display: block;
					margin-right: 2rpx;
				}
			}
			.fourth{
				width: 120rpx;
				color: #35E558;
			}
			.block{
				color: #303133;
			}
			.fourth.s{
				s{
					width: 16rpx;
					height: 4rpx;
					background-color: #B2B2B2;
					display: block;
					margin-right: 2rpx;
				}
			}
			
		}
	}
	
</style>
