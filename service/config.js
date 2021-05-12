let pathPrefix = "/api/"
const mock = "http://114.215.83.61:3100/mock/106/2.0/company/"
let ip = "http://121.196.54.73"
//#ifdef APP-PLUS
//测试地址
// pathPrefix = "http://hab.hangliu.com.cn/hab-app-2/"
//生产地址
pathPrefix = "https://api.clicksync.cn/hab-app-2/"
//#endif
const config = {
	mock:mock,
	login_url: pathPrefix + "reg-login/hln2",//用户注册/登录
	check_url: pathPrefix + "usercenter/check",//注册校验手机号
	code_url: pathPrefix + "validate-code",//获取登录验证码 
	deleteUsername_url: mock + "usercenter/delete-username",//注销
	replacePhone_url: pathPrefix + "replace-phone",//修改手机号
	resetPass_url: pathPrefix + "reset-pass",//修改手机号
	
	oss_url: pathPrefix + "file-upload",//oss图片上传
	refresh_url: pathPrefix + "token/refresh",//refresh获取新token
	userInfo_url: pathPrefix + "car-owner-app/user-info",//个人信息
	bdData_url: pathPrefix + "bd-data-dict/dictList",//获取字典根据key查询下拉选的值(系统)
	bizDict_url: pathPrefix + "parametric/biz-dict",//获取字典根据key查询下拉选的值(业务)
	version_url: pathPrefix + "version/find",//版本查询
	carReport_url: pathPrefix + "enterprise-app/car-report",//车辆统计
	carList_url: pathPrefix + "car-manager/car",//车辆列表
	appCar_url: pathPrefix + "enterprise-app/car",//车辆列表
	staffList_url: pathPrefix + "user-manager/user",//员工列表
	carOwner_url: pathPrefix + "car-manage/car-owner",//车主列表
	driverList_url: pathPrefix + "driver-manager/driver",//驾驶员列表
	violationList_url: pathPrefix + "violation-manager/violation",//违章列表
	safeList_url: pathPrefix + "safe-manager/safe",//保险列表
	safeInfo_url: pathPrefix + "enterprise-app/safe",//保险列表
	dangerList_url: pathPrefix + "out-danger-manager/outDanger",//出险列表
	userStudyList_url: pathPrefix + "report/plan-report",//培训列表 
	planRecordList_url: pathPrefix + "train/plan-record",//培训搜索列表
	userStudySecondList_url: pathPrefix + "train/plan-complete-Info",//培训完成详情
	userStudyFenList_url: pathPrefix + "train/study-record-score",//培训人员得分列表
	plan_url: pathPrefix + "train/plan",//培训列表
	firmList_url: pathPrefix + "company-manager/company",//公司列表列表
	warnReport_url: pathPrefix + "report/warn-report",//首页预警
	multipleReport_url: pathPrefix + "report/multiple-report",//车辆统计
	//
}
module.exports = config