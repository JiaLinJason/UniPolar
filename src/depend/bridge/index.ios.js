import dsBridge from "dsbridge/index";
import CryptoUtil from "../../tools/CryptoUtil";

/**
 * 跳转新页面
 * 参数说明：
 * url：             需要访问的地址
 *
 * isUseToolbar:     是否显示Toolbar
 * barBgColor:       Toolbar背景颜色
 * barTitleColor:    Toolbar标题颜色
 * title:            Toolbar标题
 * isShowBackBtn:    是否显示返回按钮
 * barBackBtnColor:  Toolbar返回按钮颜色
 * operateText:      操作文字
 * operateTextColor: 操作文字颜色
 * operateImg:       操作图标
 * barBackBtnImgUrl  返回图标
 *
 * finishFlag:       alert关闭标识
 */
function routeNavigate(params = {}) {
    let message = getMessage(params);
    sendNativeMessage('routeNavigate', message);
}

/**
 * 返回到上一级页面
 */
function routeBack(params = {}) {
    sendNativeMessage('routeBack', params);
}

/**
 * 返回到首页
 */
function routePopToTop(params = {}) {
    let message = getMessage(params);
    sendNativeMessage('routePopToTop', message);
}

/* ************************************ Native Api 相关 ***************************************** */
/**
 *  toast
 * @param content   提示内容
 * @param time      提示时长 long short（默认short）
 */
function nativeApiToast(content, time = 2) {
    let message = getMessage({
        message: content,
        length: time
    });
    sendNativeMessage('toast', message);
}

/**
 * dialog show
 */
function nativeApiShowDialog(params) {
    let message = getMessage('show_dialog', params);
    sendNativeMessage('showDialog', message);
}

/**
 * dialog dismiss
 */
function nativeApiDismissDialog() {
    sendNativeMessage('dismissDialog', '');
}

/**
 *  存储值
 * @param key
 * @param value
 */
function nativeApiSetItem(key, value) {
    let message = {
        key, value
    };
    sendNativeMessage('setItem', message);
}

/**
 * 获取值
 * @param key
 */
function nativeApiGetItem(key) {
    let message = getMessage({
        key
    });
    return sendNativeMessage('getItem', message);
}

/* ************************************ 权限 相关 ***************************************** */
/**
 * 检查权限
 * @param permission    权限标识（多个用英文逗号隔开）
 * @returns {*}
 */
function permissionCheck(permission) {
    return true;
}

/**
 * 权限申请
 * @param permission    权限标识（多个用英文逗号隔开）
 * @param message       权限申请失败显示文字
 * @param requestCode   权限申请码
 */
function permissionRequest(permission, message, requestCode) {
    return true;
}

/**
 * 相机
 * @param params
 * @returns {*}
 */
function openCamera(params) {
    return sendNativeMessage('openCamera', params);
}

/**
 * 相册
 * @param params
 * @returns {*}
 */
function imageSelect(params) {
    return sendNativeMessage('openPhoto', params);
}

/**
 * 有盾扫脸
 * @param params
 * @returns {*}
 */
function openUdOcr(params) {
    return sendNativeMessage('openUDOCR', {
        outOrderId: params.orderId,
        authkey: 'b0d238d4-ab28-4c5d-b63b-118b04201eda',
        notificationUrl: params.notify,
        isManualOCR: "1",
        showInfo: "0",
        safeMode: 'UDIDSafeMode_Low',
        isCopy: 'true',
        isExposureDetection: "true"
    });
}

/**
 * 关闭启动页
 */
function dismissSplashScreen() {
    sendNativeMessage('splash', {})
}

/**
 * 获取状态栏高度
 * @param key
 * @returns {*}
 */
function getStatusBarHeight(key) {
    return '';
}

/**
 * 打开通讯录选择单个联系人
 * @param params
 */
function contactStartSelect(params) {
    sendNativeMessage('getContactInfo', params);
}

/**
 * 获取通讯录全部信息
 */
function contactGetAll() {
    sendNativeMessage('getContactInfo', '');
}

/**
 * 获取用户地理位置信息
 */
function getLocationInfo() {
    sendNativeMessage('getUserLatitudeLongitude', '');
}

/**
 * 获取设备信息
 */
function getDevicesInfo() {
    sendNativeMessage('getAllInfo', '');
}

/**
 * get请求数据
 * @param params
 * @returns {*}
 */
function getRequest(params) {
    return sendNativeMessage('getRequest', params);
}

/**
 * post请求数据
 * @param params
 * @returns {*}
 */
function postRequest(params) {
    return sendNativeMessage('postRequest', params);
}

//极光推送相关
/**
 * 设置推送别名
 */
function setJPushAlias(params){
    if(params){
        params = CryptoUtil.md5(params);
        return sendNativeMessage('setJPushAlias',params);
    }
}

/**
 * 删除别名
 */
function deleteJPushAlias(){
    return sendNativeMessage('deleteJPushAlias','')
}
/**
 * 数据转化
 * @param params
 * @returns {*}
 */
function getMessage(params) {
    return params;
}

/**
 * 发送native事件
 */
function sendNativeMessage(moduleName, message) {
    return dsBridge.call(`echo.${moduleName}`, message);
}


export default {
    //路由相关
    routeNavigate,
    routeBack,
    routePopToTop,
    //nativeApi
    nativeApiToast,
    nativeApiSetItem,
    nativeApiGetItem,
    //permission
    permissionCheck,
    permissionRequest,
    nativeApiShowDialog,
    nativeApiDismissDialog,
    //有盾扫脸
    openUdOcr,
    openCamera,
    imageSelect,
    dismissSplashScreen,
    getStatusBarHeight,
    //联系人
    contactStartSelect,
    contactGetAll,
    getLocationInfo,
    //获取设备信息
    getDevicesInfo,
    getRequest,
    postRequest,
    //极光推送
    setJPushAlias,
    deleteJPushAlias
}