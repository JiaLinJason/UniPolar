import PlatUtil from "./PlatUtil";
import BridgeHelper from "./BridgeHelper";

function getWidth() {
  return window.screen.width;
}

let iphoneHeight = null;

const devicesHeight = window.screen.height;  //设备高度

function getHeight() {
  //获取的高度是否正确
  let whetherRight = false;
  let iosHeader = false;
  if (PlatUtil.isWebView()) {
    return window.innerHeight;  //设备可用高度
  }
  if (PlatUtil.isIphoneX()) {
    // 设备高度减去安全距离如果大于 window.innerHeight 则高度传入正确;
    whetherRight = devicesHeight - 78 > window.innerHeight;
    iosHeader = devicesHeight - 88 === window.innerHeight;

    if (iphoneHeight) {
      return iphoneHeight
    }
    if (whetherRight) {
      if (iosHeader) {
        iphoneHeight = window.innerHeight - 34;
        return iphoneHeight;
      }
      iphoneHeight = window.innerHeight;
      return iphoneHeight;
    }
    if (devicesHeight === window.innerHeight) {
      iphoneHeight = window.innerHeight;
      return iphoneHeight;
    }
    if (!whetherRight) {
      iphoneHeight = window.innerHeight + 78;
      return iphoneHeight;
    }
  }

  if (PlatUtil.isIos()) {
    // 设备高度减去安全距离如果大于 window.innerHeight 则高度传入正确;
    whetherRight = devicesHeight - 20 > window.innerHeight;
    if (iphoneHeight) {
      return iphoneHeight
    }
    if (whetherRight) {
      iphoneHeight = window.innerHeight;
      return iphoneHeight;
    }
    if (!whetherRight) {
      iphoneHeight = window.innerHeight + 20;
      return iphoneHeight;
    }
  }
  return window.innerHeight;
}

let loginHeight = null;

function setLoginHeight(height) {
  loginHeight = height;
}

function getLoginHeight() {
  return loginHeight;
}

function getStatusBarHeight() {
  if(!PlatUtil.isWebView()){
    return 0
  }
  if (PlatUtil.isIphoneX()) {
    return 44;
  }
  if (PlatUtil.isIos()) {
    return 20;
  }
  if (PlatUtil.isAndroid()) {
    return Number(BridgeHelper.getStatusBarHeight())
  }
}

function headerHeight(height = 45) {
  return height + getStatusBarHeight();
}

/**
 * 可滚动区域高度 （首页）
 * @returns {number}
 */
function scrollHeight(height, selfHeader = false) {
  if (PlatUtil.isWebView()) {
    if (selfHeader) {
      return 55 + height;
    }
    return 55
  }
  return headerHeight(height) + 55;
}


export default {
  getWidth,
  getHeight,
  setLoginHeight,
  getLoginHeight,
  getStatusBarHeight,
  headerHeight,
  scrollHeight,
};
