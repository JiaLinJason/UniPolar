import LogUtil from "./LogUtil";

/**
 * 获取指定url中的参数
 * @param path
 * @param name
 * @returns {string | null}
 */
export function getUrlParam(path, name) {
    return (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(path) || [, ""])[1].replace(/\+/g, '%20') || null;
}

/**
 * 获取系统标志（0--电脑，1--android，2--iPhone）
 * @returns {number}
 */
export function getSystemFlag() {
    let system = navigator.userAgent;
    if (-1 < system.indexOf('Linux') || -1 < system.indexOf('Android'))
        return 1;
    else if (-1 < system.indexOf('iPhone'))
        return 2;
    else
        return 0;
}

/**
 * 判断字符串是否为空
 * @param str
 * @returns {*|boolean}
 */
export function isStrEmpty(str) {
    return !(str && str !== 'null' && str !== 'undefined' && str !== '');
}

/**
 * 判断两个数字是否相等（数字为：number或string）
 * @param num1
 * @param num2
 * @returns {boolean}
 */
export function equals(num1, num2) {
    return (num1 + '') === (num2 + '');
}


/**
 * 判断是否是在微信中
 * @returns {boolean}
 */
export function isWeiXin() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger")
        return true;
    else
        return false;
}

/**
 * 是否微信5之后
 * @returns {boolean}
 */
export function isWeiXin5() {
    let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
    if (!wechatInfo) {
        return false;
    } else if (wechatInfo[1] < "5.0") {
        return false;
    }
    return true;
}

export function getFontSize(width) {
    let fontSize = 12;
    if (width > 320 && width < 335) {
        fontSize = 12;
    } else if (width >= 335 && width < 350) {
        fontSize = 13;
    } else if (width >= 350 && width < 400) {
        fontSize = 14;
    } else if (width >= 400 && width < 750) {
        fontSize = 15;
    } else if (width >= 750) {
        fontSize = 16;
    }
    return fontSize;
}


/*
        去除输入前后的空格
 */
export function ClearSpace(Str) {
    var tempStr = Str.replace(/(^\s*)|(\s*)$/g, "");
    return tempStr;
}


//判断是否是字符串
export function isStr(str) {
    return (typeof str == 'string') && str.constructor == String;
}
function DateNumber(number) {
    return number < 10 ? '0' + number : number;
}

export function moment(date){
    let day = DateNumber(date.getDate());
    let month = DateNumber(date.getMonth() + 1);
    let year = date.getFullYear();
    return `${year}-${month}-${day}`
}

