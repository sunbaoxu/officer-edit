import {fetch} from './config.js';
import {
  BMISAPIEDIT,
  ULOGINNCCLC,
  TTBAPIBUSER,
  SYSTEMSERVE
} from './baseUrl';
export default {

//*登录*/
//退出
logout(params){return fetch(`${ULOGINNCCLC}passport/logout`, params,'post')},









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
