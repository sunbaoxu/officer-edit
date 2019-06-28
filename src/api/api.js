import {fetch} from './config.js';
import {
  BMISAPIEDIT,
  ULOGINNC,
  ULOGINNCCLC,
  ULOGINNCLBC,
  TTBAPIBUSER,
  backorderv1,
  OPERATEREPORT,
  CONTRACT,
  BMISAPITRADER,
  BMISAPIPRELOAN,
  BMISAPI,
  TRADERSTAFF,
  SYSTEMSERVE
} from './baseUrl';
export default {
//*统一登入*/
//验证token中的手机号的验证码
vailPhoneCode(params){return fetch(`${ULOGINNCCLC}phone/vcode/vali`,params,'post')},
//手机号获取验证码
reQueryVailCode(params){return fetch(`${ULOGINNCLBC}phone/vcode/send/`,params,'post')},
//根据手机号验证码修改密码
rePWByPhone(params){return fetch(`${ULOGINNCCLC}phone/vcode/pwd/edit/`,params,'post')},
//根据手机/邮箱密码登录
loginByPhonePW(params){return fetch(`${ULOGINNCCLC}passport/pwd/login/`,params,'post')},
//根据老密码修改自己的密码
oldpwdChange(params){return fetch(`${ULOGINNCCLC}passport/pwd/oldpwd/edit/`,params,'post')},
//重置当天尝试修改密码总次数
resetChangePWTimes(params){return fetch(`${ULOGINNC}passport/pwd/admin/resetEditCount/`,params,'post')},
//查询绑定状态
getBindingState(params){return fetch(`${ULOGINNCCLC}passport/binding/status/get/library_card_b/`,params,'get')},
//  密码图片验证码
getVcode(params){return fetch(`${ULOGINNCLBC}img/vcode/get/${params.phone}?${Math.random()}`,params,'')} ,
//更改手机号
EditPhones(params){return fetch(`${BMISAPITRADER}updateMngPhone`,params,'post')},
//是否使用默认名片内容
NameCard(params){return fetch(`${BMISAPITRADER}isUseDefaultCard`,params,'get')},
//获取员工已开通名片列表

getOpenedCardList(params){return fetch(`${TRADERSTAFF}getOpenedCardList`,params,'post')},
//是否使用默认名片内容接口
getCardTemplateInfo(params){return fetch(`${BMISAPITRADER}getCardTemplateInfo`,params,'get')},
//是否替换默认名片
ChooseReplace(params){return fetch(`${BMISAPITRADER}setCardDefaultInfo`,params,'get')},
//修改员工使用默认名片
EditOpenCard(params){return fetch(`${TRADERSTAFF}modify`,params,'post')},

// 根据pid获取企业信息
getTraderInfoByPid(params){return fetch(`${BMISAPITRADER}getTraderInfoByPid`,params,'get')},
//基本信息提交
updateTrader(params){return fetch(`${BMISAPITRADER}update`,params,'post')},
// 员工列表
staffList(params){return fetch(`${TRADERSTAFF}list`,params,'post')},
// 部门列表
deptList(params){return fetch(`${BMISAPITRADER}dept/list`,params,'get')},
// 新增部门
addDept(params){return fetch(`${BMISAPITRADER}dept/add`,params,'post')},
// 获取角色
getTraderRoles(params){return fetch(`${BMISAPITRADER}roles`,params,'get')},
// 新增员工
staffDdd(params){return fetch(`${TRADERSTAFF}add`,params,'post')},
// 删除部门
deleteDept(params){return fetch(`${BMISAPITRADER}dept/delete`,params,'post')},
// 修改部门
updateDept(params){return fetch(`${BMISAPITRADER}dept/update`,params,'post')},
// 上传头像图片
uploadMultipleFile(params){return fetch(`${TTBAPIBUSER}uploadAvatar`,params,'post')},
// 删除员工
deleteStaff(params){return fetch(`${TRADERSTAFF}delete`,params,'get')},
// 修改员工
modifyStaff(params){return fetch(`${TRADERSTAFF}update`,params,'post')},
//禁用商家
DisMerchants(params){return fetch(`${BMISAPITRADER}accountCardInfo`,params,'get')},
//修改名片
addCardTemplateInfo(params){return fetch(`${BMISAPITRADER}addCardTemplateInfo`,params,'post')},



//更新小程序底部导航
EditMinParam(params){return fetch(`${BMISAPITRADER}addCProgTabs`,params,'post')},
//获取小程序底部导航
getMinParam(params){return fetch(`${BMISAPITRADER}getCProgram`,params,'get')},







//*登录*/
//退出
logout(params){return fetch(`${ULOGINNCCLC}passport/logout`, params,'post')},





/*交易管理*/
//根据用户手机号|身份证号+busAppId查询订单信息(全部订单)
queryOrders(params) {return fetch(`${backorderv1}orders/`, params,'get')},
//根据订单二级状态分页查询订单信息，按照时间倒序
queryOrderStatusInfo(params) {return fetch(`${backorderv1}orders/status/`, params,'get')},
//修改订单状态 20181126
changeOrderStatus(params) {return fetch(`${backorderv1}adminUpdateOrder/`, params,'post')},


//根据关联id和type查询相应订单详情
queryOrderInfo(params) {return fetch(`${backorderv1}order/${params.relativeId}/${params.type}/`, params,'get')},
//取消订单
cancelOrder(params) {return fetch(`${backorderv1}order/cancel/${params.orderId}/`, params,'post')},
//请款
askOrder(params) {return fetch(`${backorderv1}order/money/${params.orderId}/`, params,'post')},
//推送还款计划
queryPlan(params) {return fetch(`${backorderv1}plans/`, params,'post')},
//划扣轨迹查询
queryTrack(params) {return fetch(`${BMISAPI}backend/repayment/order/v2/deductTrack`, params,'get')},
//还款计划查询
askRepaymentList(params) {return fetch(`${BMISAPI}backend/repayment/order/v2/repaymentList/${params.relativeId}/${params.type}`, params,'get')},

//订单审核基本信息
queryRiskBasicInfo(params) {return fetch(`${BMISAPI}user/users/${params.pid}/`, params,'get')},
//订单审核多重负债信息
queryRiskLiabilitiesInfo(params) {return fetch(`${BMISAPIPRELOAN}liabilities/${params.pid}/`, params,'get')},
//订单审核-运营商信息  1
queryRiskOperatorInfo(params) {return fetch(`${OPERATEREPORT}basicInfo/${params.pid}/`, params,'get')},
//联系人区域汇总    1
queryAreaCollect(params) {return fetch(`${OPERATEREPORT}areaCollect/${params.currentPage}/${params.pageSize}/${params.pid}`, params,'get')},
//主要服务  1
queryMajorService(params) {return fetch(`${OPERATEREPORT}majorService/${params.currentPage}/${params.pageSize}/${params.pid}`, params,'get')},
//运营商通话详情1
queryOperCallCollect(params) {return fetch(`${OPERATEREPORT}operCallCollect/${params.currentPage}/${params.pageSize}/${params.pid}`, params,'get')},
//运营商数据汇总
queryOperDataCollect(params) {return fetch(`${OPERATEREPORT}operDataCollect/${params.currentPage}/${params.pageSize}/${params.pid}`, params,'get')},
//出行分析   1
queryTravelAnalysis(params) {return fetch(`${OPERATEREPORT}travelAnalysis/${params.currentPage}/${params.pageSize}/${params.pid}`, params,'get')},



//订单审核-获取某人电话调查信息
queryRiskRelsurveyInfo(params) {return fetch(`${BMISAPIPRELOAN}relsurvey/${params.pid}/${params.phoneNum}/`, params,'get')},
//订单审核-获取电话调查
queryRiskTelsurveyInfo(params) {return fetch(`${BMISAPIPRELOAN}telsurvey/${params.pid}/`, params,'get')},
//订单审核-保存电话调查信息
querySaveTelInfo(params) {return fetch(`${BMISAPIPRELOAN}saveTelInfo/`, params,'post')},
//订单审核-新增联系人
queryRelation(params) {return fetch(`${BMISAPIPRELOAN}relation`, params,'post')},
//订单审核-风险排查信息
queryRiskInves(params) {return fetch(`${BMISAPIPRELOAN}riskInves/${params.pid}/`, params,'get')},
//  订单审核-保存风险排查信息
querySaveriskInfo(params) {return fetch(`${BMISAPIPRELOAN}saveriskInfo`, params,'post')},
//订单审核-审核决策信息
queryAuditDecision(params) {return fetch(`${BMISAPIPRELOAN}auditDecision/${params.pid}/`, params,'get')},
//订单审核-保存审核决策信息
querySaveAuditDecision(params) {return fetch(`${BMISAPIPRELOAN}saveAuditInfo/`, params,'post')},
//获取催收记录
getGollectionRecord(params) {return fetch(`${BMISAPI}afterLoan/getGollectionRecord`, params,'post')},
//保存催收处理信息
collectionPro(params) {return fetch(`${BMISAPI}afterLoan/collectionPro`, params,'post')},
//获取联系人信息
getContacArr(params) {return fetch(`${BMISAPI}afterLoan/getContacArr`, params,'post')},

/*合同管理*/
//查询合同列表
getAllContactInfo(params) {return fetch(`${CONTRACT}getAllContactInfo/`, params,'get')},
//查询异常合同列表
getExceptionContactInfo(params) {return fetch(`${CONTRACT}getExceptionContactInfo/`, params,'get')},
//生成合同
generatContactInfo(params) {return fetch(`${CONTRACT}generatContactInfo/`, params,'post')},
//生成导出合同列表
getContractList(params) {return fetch(`${CONTRACT}getContractList/`, params,'get')},
//导出合同
exportContractInfo(params) {return fetch(`${CONTRACT}exportContractInfo/`, params,'post')},


//*用户管理*/
queryCustomerInfo(params) {return fetch(`${BMISAPI}user/users/list`, params,'post')},
//查询用户详情
queryCustomerInfoDetails(params) {return fetch(`${BMISAPI}user/users/${params.pid}/`, params,'get')},
//查询管理员列表
querySysUserList(params) {return fetch(`${BMISAPI}sys/users/${params.currentPage}/${params.pageSize}/${params.userParam}/`, params,'get')},
//编辑管理员
editSysUser(params) {return fetch(`${BMISAPI}sys/edit/`, params,'post')},
//获取权限菜单
queryMenu(params) {return fetch(`${BMISAPI}sys/operate/`, params,'get')},
//获取角色
queryRole(params) {return fetch(`${BMISAPI}sys/roles/`, params,'get')},



/** 动态官网 */
//上传图片
uploadAvatar(params) {return fetch(`${TTBAPIBUSER}uploadAvatar`, params,'post')},
//新增或者修改企业资讯信息
addOrUpdateWebsiteNews(params) {return fetch(`${BMISAPIEDIT}addOrUpdateWebsiteNews`, params,'post')},
//获取企业部门列表以及部门下人员列表
getDepAndStaffInfoList(params) {return fetch(`${BMISAPIEDIT}getDepAndStaffInfoList`, params,'get')},
//获取企业资讯信息列表
getWebsiteNewsList(params) {return fetch(`${BMISAPIEDIT}getWebsiteNewsList`, params,'get')},
//删除企业资讯信息
deleteWebsiteNews(params) {return fetch(`${BMISAPIEDIT}deleteWebsiteNews`, params,'get')},

//获取企业招聘信息列表
getRecruitmentInfoList(params) {return fetch(`${BMISAPIEDIT}getRecruitmentInfoList`, params,'get')},
//新增或者修改企业招聘信息
addOrUpdateRecruitmentInfo(params) {return fetch(`${BMISAPIEDIT}addOrUpdateRecruitmentInfo`, params,'post')},
//保存或者发布编辑中的模板信息
saveOrIssueTemplateInfo(params) {return fetch(`${BMISAPIEDIT}saveOrIssueTemplateInfo`, params,'post')},
//删除企业招聘信息
deleteRecruitmentInfo(params) {return fetch(`${BMISAPIEDIT}deleteRecruitmentInfo`, params,'get')},
//判断官网是否有未发布的模板
checkTemplateIssueStatue(params) {return fetch(`${BMISAPIEDIT}checkTemplateIssueStatue`, params,'get')},
//获取编辑模板或者主模板.type=0:编辑中的模板;type=1:已发布的主模板
getTemplateInfo(params) {return fetch(`${BMISAPIEDIT}getTemplateInfo`, params,'get')},
//新增或者修改话术组名
addOrUpdateVerbalTrickGroup(params) {return fetch(`${SYSTEMSERVE}addOrUpdateVerbalTrickGroup`, params,'post')},
//获取话术库列表
getVerbalTrickList(params) {return fetch(`${SYSTEMSERVE}getVerbalTrickList`, params,'get')},
//删除话术组
deleteVerbalTrickGroupById(params) {return fetch(`${SYSTEMSERVE}deleteVerbalTrickGroupById`, params,'get')},
//新增或者修改话术详情
addOrUpdateVerbalTrickDetail(params) {return fetch(`${SYSTEMSERVE}addOrUpdateVerbalTrickDetail`, params,'post')},
//删除话术详情
deleteVerbalTrickDetailById(params) {return fetch(`${SYSTEMSERVE}deleteVerbalTrickDetailById`, params,'get')},
//获取系统通知列表
getSystemInformList(params) {return fetch(`${SYSTEMSERVE}getSystemInformList`, params,'post')},
//发布系统通知
issueSystemInform(params) {return fetch(`${SYSTEMSERVE}issueSystemInform`, params,'post')},
//上传视频
saveAndGetFile(params,config){return fetch(`${TTBAPIBUSER}saveFile`,params,'date',config)},

//动态设置
//获取企业动态
getDynamic(params) {return fetch(`dynamicapi/dynamic/date/List`, params,'post')},
//查询企业
inquireDynamic(params) {return fetch(`dynamicapi/dynamic/did/get`, params,'post')},
//保存动态
saveDynamic(params) {return fetch(`dynamicapi/dynamic/attribute/mid/save`, params, 'post')},
//发布动态
publishDynamic(params) {return fetch(`dynamicapi/dynamic/release`, params, 'post')},
//上传多张图片
uploadMultipleImage(params) {return fetch(`${TTBAPIBUSER}uploadMultipleFile`, params,'post')},

}
