import {post, upLoad} from "../tools/NetUtil";

export function netLogin(params) {
    return post('/app/login', {...params})
}

//
export function netManagerLogin(params) {
    return post('/appManager/managerLogin', {...params})
}
//修改密码
export function netUpdataPassWord(params) {
    return post('/app/updatePassWord', {...params})
}
//认证
//获取认证中心列表
export function netGetAuthenList(params){
    return post ('/appManager/selectManagerConfig',{...params})

}
//
export function getAuBasicContainer(params){
    return post('/appManager/selectManagerProductConfig',{...params})
}
//设置用户信息参数
export function netSetCustomerInfo(params){
    return post ('/appManager/updateManagerInfo',{...params})
}
//上传base64图片
export function upLoadBase64(params){
    return upLoad ('/fdfs/uploadByBase64',{...params})
}
//请求会员信息
export function netSearchMembers(params){
    return post('/app/selectCustomerPool',{...params})
}

//请求会员信息
export function netGetGroupingUsers(params){
    return post('/app/getGroupingUsers',{...params})
}
//请求会员信息
export function netGetClientOptional(params){
    return post('/app/selectUnGroupingMemberList',{...params})
}
//新建联合分组保存信息
export function netSaveGrouping(params) {
    return post('/app/saveGrouping',{...params})
}
//客户经理提交用户全部信息
export function netSubmitClientInfo(params){
    return post('/appManager/submitManagerInfo',{...params})
}
//客户经理提交用户全部信息
export function netGetCreditList(params){
    return post('/appCustomer/selectCustomerCredit',{...params})
}
//客户经理提交用户全部信息
export function netGroupingInfo(params){
    return post('/app/submitInfo',{...params})
}

//删除当前分组中的用户
export function netReduceUser(params){
    return post('/app/reduceUser',{...params})
}
//增加用户到分组
export function netAddGroupingUser(params){
    return post('/app/addGroupingUser',{...params})
}
//提交用户征信报告 submit1
export function netSetAuCredit(params){
    return post('/appCustomer/updateCustomerCredit',{...params})
}

//客户经理查询客户统计数据
export function netQueryStatus(params){
    return post('/app/selectCustomerStatistics',{...params})
}
//解散分组
export function netDisbandGroup(params){
    return post('/app/disbandGroup',{...params})
}

