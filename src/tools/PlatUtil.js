
function isIos() {
    return /(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent);
}

function isAndroid() {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}
export function isWeiXin() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger")
        return true;
    else
        return false;
}

function isWebView() {
    if (isAndroid()) {
        return !!window.CommonBridge
    }
    if (isIos()) {
        return window._dsbridge || window._dswk || navigator.userAgent.indexOf("_dsbridge") !== -1
    }
}

function isIphoneX() {
    if (/(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent) && window.screen.height == 812 && window.screen.width == 375) {
        return true;
    }
    if (/(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent) && window.screen.height == 896 && window.screen.width == 414) {
        return true;
    }
    return false;
}

export default {
    isIos, isAndroid,isWebView,isIphoneX
}