<template>
	<i class="iconfont" :class="[iconCls, extClass]"></i>
</template>

<script>
var iconMap = {
	// 验证码
	iconyanzhengma: "iconyanzhengma",
    // 手机
	iconshouji: "iconhuiyuan1",
	// 密码
	iconmima: "iconmima",
	// 闭眼
	iconyanjing: "iconzujian1171",
	// 睁眼
	iconzhengyan: "iconshaixuan",
	//消息
	iconzu315:"iconzu315",
	// 加盟
	iconjiameng:"iconjiameng",
	// 客服
	iconkefu:"iconkefu",
	// 车辆
	iconcheliangguanli:"iconcheliangguanli",
	// 员工档案
	iconzu364:"iconzu364",
	// 驾驶员
	iconfangxiangpan:"iconfangxiangpan",
	// 违章预警
	iconzu305:"iconzu305",
	// 出险档案
	iconzu307:"iconzu307",
	// 大车
	iconicondache:"iconicondache",
	// 中车
	iconzu311:"iconzu311",
	// 小车
	iconiconxiaoche:"iconiconxiaoche",
	// 培训考试
	iconjilu:"iconjilu",
	// 培训咨询
	iconzu314:"iconzu314",
	// XX
	iconfanhui:"iconfanhui",
	// 修改
	iconxiugai:"iconxiugai",
	// 身份
	iconzu366:"iconzu366",
	// 个人身份验证
	iconyingyezhizhao2:"iconyingyezhizhao2",
	// 营业执照
	iconqiyerenzheng:"iconqiyerenzheng",
	// 隐私设置
	iconyinsi:"iconyinsi",
	// 设置
	iconshezhi:"iconshezhi",
	// 右箭头
	iconfanhui2:"iconfanhui2",
	// XX
	iconshuaxin:"iconshuaxin",
	// XX
	iconzu318:"iconzu318",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
	// XX
	icon:"icon",
}
export default {
    props:{
        iconType:{//自定义图标
            type: String,
            required: true
        },
        extClass:{//自定义图标样式
            type: String,
            default: ""
        }
    },
    computed: {
        iconCls() {
            return iconMap[this.iconType];
        }
    }
}
</script>

<style scoped>
	@import '../font/iconfont.css';
	/* @import 'https://at.alicdn.com/t/font_2282178_uiq1o22ju0c.css'; */
</style>
