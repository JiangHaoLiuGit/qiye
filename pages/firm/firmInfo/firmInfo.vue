<template>
	<view class="page">
		<view class="head">
			<view class="top u-flex u-row-between" style="height: 88rpx;">
				<view class="tops" @click="tui">
					<Icon :iconType="'iconfanhui2'" class="icon" style="font-size: 30rpx;"></Icon>
				</view>
				<text class="fffColor bigText">公司详情</text>
				<text></text>
			</view>
			<view class="bottom u-flex u-row-center por" v-if="ajaxBlean">
				<view class="box u-flex u-row-center" @click="fixedBlean = !fixedBlean">
					<view>{{options.name}}</view>
					<Icon :iconType="'iconfanhui2'" class="icon" :class="fixedBlean?'active':''" style="color: #fff;"></Icon>
				</view>
				<view class="boxs" v-show="fixedBlean">
					<view class="options" :class="options.name == item.name?'active':''" v-for="(item,index) in optionList" @click.stop="small(index)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<u-line color="#DDD"></u-line>
		<view class="fixed" v-show="fixedBlean" @click="big">
			<!-- <view class="options" v-for="(item,index) in optionList" @click.stop="small(index)">
				{{item.name}}
			</view> -->
		</view>
		<view></view>
		<view class="paddingLeftRight u-padding-bottom-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);margin-top: 264rpx;">
			<view class="current u-padding-top-20 u-padding-bottom-20" v-if="imgList.length > 0">
				<view class="textView">
					公司图片
				</view>
				<view class="timerView timerViews u-flex">
					<view class="views" v-for="(item,index) in imgList" :key='index'>
						<image class="img" @click="img(item.src)" :src="item.src" mode="aspectFill"></image>
						<view class="threeColor u-padding-top-10 inText textAlign">{{item.name}}</view>
					</view>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					公司简称
				</view>
				<view class="timerView">
					{{obj.companyNickName}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					法定代表人
				</view>
				<view class="timerView">
					{{obj.legalPerson}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					统一社会信用代码
				</view>
				<view class="timerView">
					{{obj.socialUniformCode}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
		</view>
		<view class="paddingLeftRight u-padding-bottom-20 u-margin-top-20 u-margin-bottom-20 marginLeftRight borderRadius fffBackground" style="width: calc(100% - 60rpx);">
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					法人电话
				</view>
				<view class="timerView">
					{{obj.corporatePhone}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					公司类型
				</view>
				<view class="timerView">
					{{obj.companyType}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					实际管理人
				</view>
				<view class="timerView">
					{{obj.manager}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					实际管理人电话
				</view>
				<view class="timerView">
					{{obj.managerPhone}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					注册地址
				</view>
				<view class="timerView u-flex">
					{{obj.registeredAddress}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					注册资本
				</view>
				<view class="timerView">
					{{obj.registeredCapital}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					道路运输字号
				</view>
				<view class="timerView">
					{{obj.dlysFontSize}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					发证日期
				</view>
				<view class="timerView">
					{{obj.issuanceDate}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					经营范围
				</view>
				<view class="timerView active u-line-1">
					{{obj.businessScope}}
					<view class="small" v-if="obj.businessScope" @click="open(obj.businessScope,'经营范围')">详情</view>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView u-line-1">
					道路运输范围
				</view>
				<view class="timerView active u-line-1">
					{{obj.dlysScope}}
					<view class="small" v-if="obj.dlysScope" @click="open(obj.dlysScope,'道路运输范围')">详情</view>
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
			<view class="current u-padding-top-20 u-padding-bottom-20">
				<view class="textView">
					成立日期
				</view>
				<view class="timerView">
					{{obj.setUpDate}}
				</view>
			</view>
			<u-line color="#EFEFEF"></u-line>
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
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				 id:"",
				 obj:"",
				 title:"",
				 imgList:[],
				 show:false,
				 showTitle:"",
				 showType:"",
				 imgs:false,
				 imgRul:"",
				 fixedBlean:false,
				 ajaxBlean:false,
				 optionList: [
					 // {
				 	// 	name: "全部",
				 	// 	id: 0,
				 	// },
				 	// {
				 	// 	name: "日常培训",
				 	// 	id: 1,
				 	// },
				 	// {
				 	// 	name: "岗前培训",
				 	// 	id: 2,
				 	// },
				 	// {
				 	// 	name: "两类人员培训",
				 	// 	id: 4,
				 	// },
				 	// {
				 	// 	name: "违章培训",
				 	// 	id: 3,
				 	// }
				 ],
				 options:""
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			if (option.name) {
				this.options = {
					name:option.name,
					id:1
				}
			}
			this.pageList()
			ajax.get(config.firmList_url, {
				pageIndex: 0,
				pageSize: 0,
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					if (res.data.list != null) {
						this.ajaxBlean = true
						for(let i = 0 ; i < res.data.list.length ; i ++){
							let obj = {}
							obj.id = res.data.list[i].id
							obj.name = res.data.list[i].companyName
							this.optionList.push(obj)
						}
						
						console.log(this.optionList)
					}
				}
			})	
		},
		onShow(){
			
		},
		methods: {
			pageList(){
				ajax.get(config.firmList_url + '/' + this.id, {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						// res.data.businessScope = "我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草1我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草我草ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd哒哒哒哒哒哒多多多多多多多多多多多多多多多多ddddddddddddddddddddddd"
						this.obj = res.data
						this.title = this.obj.companyName
						if (this.obj.issuanceDate) {
							this.obj.issuanceDate = this.timer(this.obj.issuanceDate)
						}
						if (this.obj.setUpDate) {
							this.obj.setUpDate = this.timer(this.obj.setUpDate)
						} 
						if(this.obj.yezzPath){
							let img = {
								src:this.obj.yezzPath,
								name:"营业执照"
							}
							this.imgList.push(img)
						}
						if(this.obj.dlyszPath){
							let img = {
								src:this.obj.dlyszPath,
								name:"道路运输证"
							}
							this.imgList.push(img)
						}
						if(this.obj.frzpPath){
							let img = {
								src:this.obj.frzpPath,
								name:"法人照片"
							}
							this.imgList.push(img)
						}
						console.log(this.imgList)
					}
				}).catch(err => {
					console.log("获取货源列表接口数据返回失败 error is :" + err);
				})
			},
			big(){
				this.fixedBlean = false
			},
			tui(){
				console.log("tui")
				uni.navigateBack()
			},
			small(index){
				this.fixedBlean = false
				this.id = this.optionList[index].id
				this.options = this.optionList[index]
				this.imgList = []
				this.pageList()
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
			open(text,type){
				this.show = true
				this.showType = type
				this.showTitle = text
			},
			img(url) {
				this.imgs = true
				this.imgRul = url
			},
			ss(){
				
			},
		}
	}
</script>

<style scoped lang="less">
	.head{
		padding-top: 44rpx;
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: linear-gradient(180deg, #2D84FF, #50CAE9);
		.top{
			padding: 0 30rpx;
			.tops{
				transform: rotate(180deg);
				.icon{
					color:#fff;
					
				}
			}
		}
		.bottom{
			padding: 20rpx 0 20rpx;
			width: 100%;
			z-index: 100;
			
			.box{
				width: fit-content;
				padding: 0 30rpx;
				height: 60rpx;
				background-color: rgba(255,255,255,.15);
				border-radius:30rpx;
				color: #fff;
				.icon{
					font-size: 24rpx;
					transform: rotate(90deg);
					margin-left: 10rpx;
				}
				.icon.active{
					transform: rotate(270deg);
				}
			}
			.boxs{
				width: 100%;
				max-height: 880rpx;
				overflow-y: scroll;
				position: absolute;
				left: 0;
				top: 96rpx;
				.options{
					text-align: center;
					padding-left: 30rpx;
					background-color: #fff;
					height: 88rpx;
					line-height: 88rpx;
					color: #999;
					border-bottom: 2rpx solid #EFEFEF;
				}
				.options.active{
					color: #333;
					font-weight: bold;
				}
			}
		}
	}
	
	
	.textView{
		color: #999;
		font-size: 28rpx;
	}
	.timerView{
		color: #333;
		font-size: 32rpx;
		margin-top: 20rpx;
		width: 100%;
		padding: 0;
	}
	.fixed{
		z-index: 10;
		background: rgba(0,0,0,.21);
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		
		
	}
	.timerViews{
		width: 100%;
		padding: 0;
		.views{
			.img{
				width: 180rpx;
				height: 120rpx;
				margin-right: 20rpx;
			}
		}
	}
	
	
</style>
