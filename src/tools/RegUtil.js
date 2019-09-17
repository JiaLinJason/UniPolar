/**
 * 正则表达式校验类
 */

import LogUtil from "./LogUtil";

/**
 * 手机号验证
 * @param phone
 * @returns {boolean}
 */
export function checkPhone(phone) {
    let reg = new RegExp(/^1[\d]{10}$/);
    return reg.test(phone);
}

/**
 * 密码复杂度验证
 * @param psw
 * @returns {boolean}
 */
export function checkPassword(psw) {
    let lengthReg = new RegExp(/^.{5,9}$/);
    let complexReg = new RegExp(/^.*(?=.*\d)(?=.*[A-Z]+)(?=.*[a-z]+).*$/);
    return lengthReg.test(psw)&&complexReg.test(psw);
}

/**
 * 身份证验证
 * @param idCard
 * @returns {boolean}
 */
export function checkIdCard(idCard) {
    let id1 = new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);
    let id2 = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/);
    return id1.test(idCard) || id2.test(idCard);
}

/**
 * Email检测
 * @param email
 * @returns {boolean}
 */
export function checkEmail(email) {
    let reg = new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    return reg.test(email);
}

/**
 * 中文检测
 * @param str
 * @returns {boolean}
 */
export function checkChinese(str) {
    let reg = new RegExp(/^([\u4E00-\u9FA5])*$/);
    return reg.test(str);
}

/**
 * 数字检测
 * @param num
 * @returns {boolean}
 */
export function checkNum(num) {
    let reg = new RegExp(/^[0-9]*$/);
    return reg.test(num);
}

export function checkReg(value, verify) {
    let reg = new RegExp(eval('/' + verify + '/'));
    return reg.test(value);
}

/**
 * url 检测
 */

export function checkUrl(value) {
    let reg = new RegExp(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/);
    return reg.test(value)
}

/**
 * 联系人姓名最大长度判断
 **/

export function checkMaxLength(value) {
    if (typeof value !== 'string') {
        return false
    }
    return value.length < 20

}

/**
 * 去除首尾空格
 * @param str
 * @returns {string}
 */
export function trim(str = '') {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
export function phoneTrim(str = ''){
    str = str+'';
    return str.replace(/\s/g,"").replace(/-/g,"");
}

/**
 * 判断字符串是否带有表情符号
 * @param substring
 * @returns {boolean}
 */
export function isEmojiCharacter(substring) {
    for (let i = 0; i < substring.length; i++) {
        let hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                let ls = substring.charCodeAt(i + 1);
                let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            let ls = substring.charCodeAt(i + 1);
            if (ls === 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030
                || hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b
                || hs === 0x2b50) {
                return true;
            }
        }
    }
}
