import axios from 'axios';
import ToastHelper from "./ToastUtil";
import LogHelper from "./LogUtil";
import CryptoUtil from "./CryptoUtil";
import PlatUtil from "./PlatUtil";
import BridgeHelper from "./BridgeHelper";
import * as Config from "../Config";

//获取请求头
function getNetHeader() {
    let devicesInfo = BridgeHelper.getDevicesInfo({});
    console.log(devicesInfo);
    let devices;
    try {
        devices = JSON.parse(devicesInfo);
    } catch (e) {
        devices = {};
    }
    return devices
}

function instance() {
    let header = getNetHeader();
    console.log(getNetHeader());
    return axios.create({
        timeout: 10000,
        headers: {'platform': PlatUtil.isAndroid() ? 'android' : 'ios',}
    });
}
// todo:// 根据服务器接口数据格式处理
function parseErrorMessage(response) {
    LogHelper.log('server data：', response);
    let status, message, info;
    try {
        status = Number(response.data.status);
        message = response.data.msg;
        info = response.data['objs'];
    } catch (e) {
        let error = new Error('网络异常或其它');
        error.name = 'typeError';
        throw error;
    }
    switch (status) {
        case 200:
            return info;
        case 0:
            let err = new Error();
            err.name = 'customErr';
            err.message = message;
            throw err;
        case 2:
            let erro = new Error();
            erro.name = 'unLogin';
            erro.message = message;
            throw erro;
        default:
            let defaultError = new Error();
            defaultError.name = 'default';
            defaultError.message = message;
            throw defaultError;
    }
    return response.data;
}

//解密
function enParams(data) {
    if (!data) {
        data = {};
    }
    let paramStr = JSON.stringify(data);
    let versionStr = JSON.stringify({version: '1.0.1'});
    let wow = 'dsxs';
    let rand = Math.floor(Math.random() * 10000);
    let flag = CryptoUtil.md5(wow + rand);
    let key = flag.substring(0, 16);

    let params = CryptoUtil.aesEncryptMine(paramStr, key);

    let version = CryptoUtil.aesEncryptMine(versionStr, key);
    return {rand, params, version};
}

//加密
function deResult(data, rand) {
    try {
        let wow = 'dsxs';
        let flag = CryptoUtil.md5(wow + rand);
        let key = flag.substring(0, 16);

        let content = CryptoUtil.aesDecryptMine(data, key);
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
}
/**
 * post请求
 * @param url
 * @param data
 * @param appendUrl 是否拼接url前缀
 * @returns {Promise<void>}
 */
export async function post(url, data, appendUrl = false) {

    LogHelper.log('post params=', data);
    // data = enParams(data);
    // data = paramsToFormData(data);
    // url = Config.baseUrl + url ;
    console.log(url);
    // url = appendUrl ? BasicUrl + url : url;
    return new Promise((resolve, reject) => {
        return instance().post(url, data)
            .then(parseErrorMessage)
            .then((res) => {
                resolve(res)
            })
            .catch(function (err) {
                console.log(err);
                // clearInterval(tt);
                if (err.name === 'default') {
                    reject(err.message);
                } else if (err.name === 'typeError') {
                    ToastHelper.showToast({msg: err.message});
                } else if (err.name === 'loginErr') {
                    reject();
                    ToastHelper.showToast({msg: err.message});
                } else if (err.name === 'unLogin') {
                    reject();
                    ToastHelper.showToast({msg: err.message});
                } else if (err.toString().search('timeout') > 0) {
                    reject();
                    ToastHelper.showToast({msg: '网络连接超时'});
                } else if (err.toString().search('Network') > 0) {
                    reject();
                    ToastHelper.showToast({msg: '请检查您的手机是否联网'});
                } else {
                    reject();
                    ToastHelper.showToast({msg: '服务器开小差了，请重试'});
                }
            });
    });
}


/**
 * get请求
 * @param url
 * @returns {Promise<void>}
 */
export async function get(url) {
    return new Promise(function (resolve, reject) {
        return axios.get(url)
        // .then(checkStatus)
        //     .then(parseErrorMessage)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
                LogHelper.err(err);
            });
    });
}

/**
 * 上传图片
 * @param url
 * @param data
 * @returns {Promise<*>}
 */
export async function upLoad(url, data) {
    // url = Config.baseUrl + url ;
    return new Promise((resolve, reject) => {
        return instance().post(url, data)
            .then((res) => {
                return res.data
            })
            .then((res) => {
                resolve(res)
            })
            .catch(function (err) {
                if (err.name === 'customErr') {
                    reject(err.message);
                } else if (err.name === 'typeError') {
                    ToastHelper.showToast({msg: err.message});
                } else if (err.name === 'loginErr') {
                    reject();
                    ToastHelper.showToast({msg: err.message});
                } else if (err.name === 'unLogin') {
                    reject();
                    ToastHelper.showToast({msg: err.message});
                } else if (err.toString().search('timeout') > 0) {
                    reject();
                    ToastHelper.showToast({msg: '网络连接超时'});
                } else if (err.toString().search('Network') > 0) {
                    reject();
                    ToastHelper.showToast({msg: '请检查您的手机是否联网'});
                } else {
                    reject();
                    ToastHelper.showToast({msg: '服务器开小差了，请重试'});
                }
            });
    });
}
