import {fetch} from './config.js';
export default {

/** 动态官网 */
//上传图片
uploadAvatar(params) {return fetch(`uploadAvatar`, params,'post')},
//新增或者修改企业资讯信息
addOrUpdateWebsiteNews(params) {return fetch(`addOrUpdateWebsiteNews`, params,'post')},
//获取企业部门列表以及部门下人员列表
getDepAndStaffInfoList(params) {return fetch(`getDepAndStaffInfoList`, params,'get')},
//获取企业资讯信息列表
getWebsiteNewsList(params) {return fetch(`getWebsiteNewsList`, params,'get')},
//删除企业资讯信息
deleteWebsiteNews(params) {return fetch(`deleteWebsiteNews`, params,'get')},

//获取企业招聘信息列表
getRecruitmentInfoList(params) {return fetch(`getRecruitmentInfoList`, params,'get')},
//新增或者修改企业招聘信息
addOrUpdateRecruitmentInfo(params) {return fetch(`addOrUpdateRecruitmentInfo`, params,'post')},
//保存或者发布编辑中的模板信息
saveOrIssueTemplateInfo(params) {return fetch(`saveOrIssueTemplateInfo`, params,'post')},
//删除企业招聘信息
deleteRecruitmentInfo(params) {return fetch(`deleteRecruitmentInfo`, params,'get')},
//判断官网是否有未发布的模板
checkTemplateIssueStatue(params) {return fetch(`checkTemplateIssueStatue`, params,'get')},
//获取编辑模板或者主模板.type=0:编辑中的模板;type=1:已发布的主模板
getTemplateInfo(params) {return fetch(`getTemplateInfo`, params,'get')},
//上传视频
saveAndGetFile(params,config){return fetch(`saveFile`,params,'date',config)},


}
