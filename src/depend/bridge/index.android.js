/* ************************************ 路由相关 ***************************************** */
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
 *
 * finishFlag:       alert关闭标识
 */
function routeNavigate(params) {
    let message = getMessage('route', 'route_navigate', params);
    sendNativeMessage(message);
}

/**
 * 返回到上一级页面
 */
function routeBack(params) {
    let message = getMessage('route', 'route_back', params);
    sendNativeMessage(message);
}

/**
 * 返回到首页
 */
function routePopToTop(params) {
    let message = getMessage('route', 'route_pop_to_top', params);
    sendNativeMessage(message);
}

/* ************************************ Native Api 相关 ***************************************** */
/**
 *  toast
 * @param content   提示内容
 * @param time      提示时长 long short（默认short）
 */
function nativeApiToast(content, time = 2) {
    let message = getMessage('native_api', 'native_api_toast', {
        message: content,
        length: time
    });
    sendNativeMessage(message);
}

/**
 * dialog show
 */
function nativeApiShowDialog(params) {
    let message = getMessage('native_api', 'native_api_show_dialog', params);
    sendNativeMessage(message);
}

/**
 * dialog dismiss
 */
function nativeApiDismissDialog() {
    let message = getMessage('native_api', 'native_api_dismiss_dialog');
    sendNativeMessage(message);
}

/**
 *  存储值
 * @param key
 * @param value
 */
function nativeApiSetItem(key, value) {
    let message = getMessage('native_api', 'native_api_set_item', {
        key, value
    });
    sendNativeMessage(message);
}

/**
 * 获取值
 * @param key
 */
function nativeApiGetItem(key) {
    let message = getMessage('native_api', 'native_api_get_item', {
        key
    });
    return sendNativeMessage(message);
}

/* ************************************ 权限 相关 ***************************************** */
/**
 * 检查权限
 * @param permission    权限标识（多个用英文逗号隔开）
 * @returns {*}
 */
function permissionCheck(permission) {
    let message = getMessage('permission', 'permission_check', {permission});
    return sendNativeMessage(message);
}

/**
 * 权限申请
 * @param permission    权限标识（多个用英文逗号隔开）
 * @param message       权限申请失败显示文字
 * @param requestCode   权限申请码
 */
function permissionRequest(permission, message, requestCode) {
    let msg = getMessage('permission', 'permission_request', {
        permission, message, requestCode
    });
    return sendNativeMessage(msg);
}

/**
 * 相机
 * @param params
 * @returns {*}
 */
function openCamera(params) {
    let message = getMessage('image', 'image_take', params);
    return sendNativeMessage(message);
}

/**
 * 相册
 * @param params
 * @returns {*}
 */
function imageSelect(params) {
    let message = getMessage('image', 'image_select', params);
    return sendNativeMessage(message);
}

/**
 * 关关闭启动页
 */
function dismissSplashScreen() {
    let message = getMessage('native_api', 'native_api_dismiss_splansh_screen');
    sendNativeMessage(message);
}

/**
 * 打开有盾
 * @param params
 * @returns {*}
 */
function openUdOcr(params) {
    let message = getMessage('sdk', 'sdk_ud_ocr', {
        outOrderId: params.orderId,
        authkey: 'b0d238d4-ab28-4c5d-b63b-118b04201eda',
        notificationUrl: params.notify,
        isManualOCR: 'true',
        showInfo: 'true',
        safeMode: 'FVSafeLowMode',
        isCopy: 'true',
        isExposureDetection: "true"
    });
    return sendNativeMessage(message);
}

/**
 * 获取状态栏高度
 * @param key
 * @returns {*}
 */
function getStatusBarHeight(key) {
    let message = getMessage('native_api', 'native_api_get_status_bar_height');
    return sendNativeMessage(message);
}

/**
 * 打开通讯录选择单个联系人
 * @param params
 */
function contactStartSelect(params) {
    let message = getMessage('native_api', 'native_api_get_contacts', params);
    sendNativeMessage(message);
}

/**
 * 获取通讯录全部信息
 * @param params
 */
function contactGetAll(params={}) {
    let message = getMessage('native_api', 'native_api_get_all_contacts', params);
    sendNativeMessage(message);
}

/**
 * 获取用户地理位置信息
 */
function getLocationInfo(params = {}) {
    let message = getMessage('native_api', 'native_api_get_location',params);
    sendNativeMessage(message);
}

/**
 * 获取设备信息
 */
function getDevicesInfo(params={}){
    let message = getMessage('native_api', 'native_api_get_device_infomation',params);
    return sendNativeMessage(message);
}

/**
 * get请求
 * @param params
 * @returns {*}
 */
function getRequest(params) {
    let message = getMessage('native_api', 'native_api_get_request',params);
    return sendNativeMessage(message);
}

//极光推送相关
/**
 *
 */
function setJPushAlias(params) {
    if (!params) {
        return;
    }
    params = {
        alias: CryptoUtil.md5(params),
        sequence: params
    };
    let message = getMessage('sdk', 'sdk_jpush_set_alias', params);
    return sendNativeMessage(message);
}

/**
 * 删除别名
 */
function deleteJPushAlias(params) {
    //传入params 删除别名
    if (!params) {
        return;
    }
    params = {sequence: params};
    let message = getMessage('sdk', 'sdk_jpush_delete_alias', params);
    return sendNativeMessage(message);
}
/**
 * 转换方法
 */
function getMessage(moduleName, methodName, params) {
    let obj = {
        moduleName, methodName, params
    };
    return JSON.stringify(obj);
}

/**
 * 发送native事件
 * @param message
 */
function sendNativeMessage(message) {
    return window.CommonBridge && window.CommonBridge.distribute(message);
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
    //相机
    openCamera,
    imageSelect,
    dismissSplashScreen,
    openUdOcr,
    getStatusBarHeight,
    //联系人
    contactStartSelect,
    contactGetAll,
    getLocationInfo,
    getDevicesInfo,
    //请求方法
    getRequest,
    //极光推送方法
    setJPushAlias,
    deleteJPushAlias
}
