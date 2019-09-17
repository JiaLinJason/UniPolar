import React from 'react';
import RouteHelper from "../tools/RouteHelper";
import AlertHelper from "../tools/AlertHelper";
// import {
//     getAppConfig,
//     getMember,
//     getRouterTime,
//     getTemp,
//     setID,
//     setIdent,
//     setRouterTime,
//     setToken
// } from "../tools/StorageUtil";
// import UserHelper from "../tools/UserHelper";
import PlatUtil from "../tools/PlatUtil";
// import {VERIFY_CODE_LOGIN, LOANS, AUTHEN_LIST} from "../const/locations";
import ToastUtil from "../tools/ToastUtil";
import {Toast} from "antd-mobile/lib/index";
// import {equals} from "../tools/CommomUtil";
// import LoanModalUtil from "../tools/LoanModalUtil";
// import {tabHelper} from "../tools/TabUtils";
import BridgeHelper from "../tools/BridgeHelper";
import LogUtil from "../tools/LogUtil";


class BaseContainer extends React.Component {

    componentDidMount() {
        this.sdComponentDidMount();
        document.addEventListener('bridge', (data) => {
            this.eventListener(data.params);
        });
        window.onPageResume = (params) => {
            if (params) {
                try {
                    params = params.replace(/[\r]/g, "\\r").replace(/[\n]/g, "\\n");
                    params = JSON.parse(params);
                } catch (e) {
                }
                let event = document.createEvent('HTMLEvents');
                event.initEvent("bridge");
                event.params = params;
                document.dispatchEvent(event);
            }
        }
    }

    sdComponentDidMount() {

    }

    eventListener(params) {

    }


    /****************************** Alert相关 *************************************/

    showProgressDialog(msg = '加载中...') {
        Toast.loading(msg, 0)
    }

    showHintDialog(operateMsg, hintCallback) {
        this.dismissDialog();
        AlertHelper.showHint({operateMsg, callback:hintCallback});
    }

    showOperateDialog(operateMsg, sureCallback, cancelCallback) {
        AlertHelper.showOperate({operateMsg, sureCallback, cancelCallback});
    }

    dismissDialog(callback) {
        Toast.hide();
        callback && callback()
    }

    /****************************** Route相关 *************************************/
    /**
     *
     * @param action  跳转地址
     * @param title  导航栏头部
     * @param search  传给H5的参数
     * @param params    传给原生的参数
     */
    navigate(action, title, search, params) {
        let endSearch = '?';
        for (let k in search) {
            endSearch += (k + "=" + search[k] + '&')
        }
        endSearch = endSearch.slice(0, -1);
        if (!PlatUtil.isWebView()) {  //如果是H5直接执行
            RouteHelper.locationTo(action, endSearch);
            return;
        }
        let current = '';
        // try {
        //     let storageTime = Number(getRouterTime());
        //     current = Math.round(new Date());
        //     let timeDel = Math.abs(current - storageTime);
        //     if (storageTime && timeDel < 500) {
        //         return;
        //     }
        // }
        // catch (e) {
        //
        // }
        // setRouterTime(current.toString());
        if (PlatUtil.isWebView()) {
            BridgeHelper.routeNavigate({
                ...{
                    url: `${window.location.protocol}//${window.location.host}${action}${endSearch}`,
                    title,
                    loadingTitle: '加载中...',
                    isFullScreen: 'true',
                    barTitleColor: '#00ADB5',
                }, ...params
            });
        }

    }


    toWeb(url, title, finishFlag, closeFlag) {
        if (PlatUtil.isWebView()) {
            BridgeHelper.routeNavigate({
                url, title, finishFlag,
                loadingTitle: '加载中...',
                isFullScreen: 'true',
                barTitleColor: 'black',
                closeFlag,
            });
            return
        }
        window.open(url)
    }

    locationReplace(action, search) {
        RouteHelper.locationReplace(action, search);
    }

    locationBack() {
        RouteHelper.locationBack();
    }

    //back方法 返回时执行上一个页面需要的参数 //{name:'bank',params:{bankId:'312321312321'}}
    finish(params = {name: 'refresh'}) {
        if (PlatUtil.isWebView()) {
            BridgeHelper.routeBack(params);
        } else {
            this.locationBack()
        }
    }

    navPopTop(params = {name: 'refresh'}) {
        BridgeHelper.routePopToTop(params)
    }

    locationGetParams(name) {
        return RouteHelper.getParam(name)
    }

    /**********************************Toast**********************************/
    toast(message) {
        if (typeof message === 'string') {
            if (PlatUtil.isWebView()) {
                BridgeHelper.nativeApiToast(message);
                return
            }
            ToastUtil.showToast({msg: message})
        }

    }

}

export default BaseContainer