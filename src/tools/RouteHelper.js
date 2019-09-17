import history from '../depend/history';

/**
 * 界面跳转
 * @param action    '/somewhere'
 * @param search    '?some=search-string'
 */
function locationTo(action, search) {
    let aim = {pathname: action, search: search};
    history.push(aim);
}

/**
 * 替换当前页面
 * @param action
 * @param search
 */
function locationReplace(action, search) {
    let aim = {pathname: action, search: search};
    history.replace(aim);
}

/**
 * 返回上级
 */
function locationBack() {
    history.goBack();
}

/**
 * 获取当前页面url中的参数
 * @param name
 * @returns {string | null}
 */
function getParam(name) {
    return (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [, ""])[1].replace(/\+/g, '%20') || null;
}

/**
 * 打开新页面
 * @param action
 * @param target
 */
function navigateTo(action, target) {
    const openWindow = window.open(action, target)
}

export default {
    locationTo,
    locationReplace,
    locationBack,
    getParam
};