import BridgeHelper from "./BridgeHelper";
import PlatUtil from "./PlatUtil";
import LogUtil from "./LogUtil";
import Storage from './Storage';


const BASE = 'bank';
const BANK_SIGN = 'bankSign';
const PHONE = 'phone';
const USER_ID = 'id';
const TOKEN = 'token';
const DEVICES = 'devices';


function getAllObj() {
    let allObj = getItem(BANK_SIGN);
    if (!allObj) {
        allObj = '{}'
    }
    allObj = JSON.parse(allObj);
    return allObj;
}


function setItem(key, value) {
    if (!PlatUtil.isWebView()) {
        Storage.setItem(key, value);
        return;
    }
    let base = BridgeHelper.nativeApiGetItem(BASE);
    if (base) {
        base = JSON.parse(base)
    } else {
        base = {}
    }
    base[key] = value;
    base = JSON.stringify(base);
    return BridgeHelper.nativeApiSetItem(BASE, base)
}

function getItem(key) {
    if (!PlatUtil.isWebView()) {
        return Storage.getItem(key);
    }
    let base = BridgeHelper.nativeApiGetItem(BASE);
    if (base) {
        base = JSON.parse(base);
        return base[key] ? base[key] : ''
    } else {
        return ''
    }
}

export function setAuInfo(type, info) {
    return setItem(type, info)
}

export function getAuInfo(type) {
    return getItem(type)
}

export function setDevices(devices) {
    return setItem(DEVICES, devices)
}

export function getDevices() {
    if (!PlatUtil.isWebView()) {
        return {}
    }
    let devices = getItem(DEVICES);
    if (devices) {
        return devices;
    } else {
        let devicesInfo = BridgeHelper.getDevicesInfo({});
        let devices;
        try {
            devicesInfo = JSON.parse(devicesInfo);
            let systemInfo = JSON.parse(devicesInfo['systemInfo']);
            let clientInfo = JSON.parse(devicesInfo['clientInfo']);
            devices = {...systemInfo, ...clientInfo};
        } catch (e) {
            devices = {};
        }
        setDevices(devices);
        return devices
    }
}


export function getManagerID() {
    if (PlatUtil.isWebView()) {
        return BridgeHelper.nativeApiGetItem('mid')
    } else {
        let allObj = JSON.parse(getItem(BANK_SIGN));
        if (!allObj) {
            return ''
        }
        return allObj['mid'] ? allObj['mid'] : ''
    }
}

export function setManagerID(mid) {
    if (PlatUtil.isWebView()) {
        BridgeHelper.nativeApiSetItem('mid', mid)
    } else {
        let newObj = {...getAllObj(), mid: mid};
        setItem(BANK_SIGN, JSON.stringify(newObj));
    }
}

export function getPhone() {
    if (PlatUtil.isWebView()) {
        return BridgeHelper.nativeApiGetItem('phone')
    } else {
        let allObj = JSON.parse(getItem(BANK_SIGN));
        if (!allObj) {
            return ''
        }
        return allObj['phone'] ? allObj['phone'] : ''
    }

}

export function setPhone(phone) {
    if (PlatUtil.isWebView()) {
        BridgeHelper.nativeApiSetItem('phone', phone)
    } else {
        let newObj = {...getAllObj(), phone: phone};
        setItem(BANK_SIGN, JSON.stringify(newObj));
    }
}
export function setName(name) {
    if (PlatUtil.isWebView()) {
        BridgeHelper.nativeApiSetItem('name', name)
    } else {
        let newObj = {...getAllObj(), name: name};
        setItem(BANK_SIGN, JSON.stringify(newObj));
    }
}
export function getName() {
    if (PlatUtil.isWebView()) {
        return BridgeHelper.nativeApiGetItem('name')
    } else {
        let allObj = JSON.parse(getItem(BANK_SIGN));
        if (!allObj) {
            return ''
        }
        return allObj['name'] ? allObj['name'] : ''
    }
}
export function setWorkNumber(wknum) {
    if (PlatUtil.isWebView()) {
        BridgeHelper.nativeApiSetItem('wknum', wknum)
    } else {
        let newObj = {...getAllObj(), wknum: wknum};
        setItem(BANK_SIGN, JSON.stringify(newObj));
    }
}

export function getWorkNumber() {
    if (PlatUtil.isWebView()) {
        return BridgeHelper.nativeApiGetItem('wknum')
    } else {
        let allObj = JSON.parse(getItem(BANK_SIGN));
        if (!allObj) {
            return ''
        }
        return allObj['wknum'] ? allObj['wknum'] : ''
    }
}


export function getHeadPortraitUrl() {
    if (PlatUtil.isWebView()) {
        return BridgeHelper.nativeApiGetItem('headPortraitUrl')
    } else {
        let allObj = JSON.parse(getItem(BANK_SIGN));
        if (!allObj) {
            return ''
        }
        return allObj['headPortraitUrl'] ? allObj['headPortraitUrl'] : ''
    }

}

export function setHeadPortraitUrl(url) {
    if (PlatUtil.isWebView()) {
        BridgeHelper.nativeApiSetItem('headPortraitUrl', url)
    } else {
        let newObj = {...getAllObj(), headPortraitUrl: url};
        setItem(BANK_SIGN, JSON.stringify(newObj));
    }
}

export function getAuStatus() {
    if (PlatUtil.isWebView()) {
        return BridgeHelper.nativeApiGetItem('auStatus')
    } else {
        let allObj = JSON.parse(getItem(BANK_SIGN));
        if (!allObj) {
            return ''
        }
        return allObj['auStatus'] ? allObj['auStatus'] : ''
    }

}
export function setAuStatus(auStatus) {
    if (PlatUtil.isWebView()) {
        BridgeHelper.nativeApiSetItem('auStatus', auStatus)
    } else {
        let newObj = {...getAllObj(), auStatus: auStatus};
        setItem(BANK_SIGN, JSON.stringify(newObj));
    }
}

//清除用户信息
export function removeItem() {
    setManagerID('');
    setPhone('');
    setName('');
    setWorkNumber('');
}

export default {
    setItem,
    getItem,
}

