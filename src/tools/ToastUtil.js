import {Toast} from 'antd-mobile';
import PlatUtil from "./PlatUtil";
import BridgeHelper from "./BridgeHelper";

class ToastUtil {
    static showToast({msg = 'Loading...', duration = 1.5, callback}) {
        if (typeof msg !== 'string') {
            return;
        }
        if (PlatUtil.isWebView()) {  //如果是内部 直接调用原生的toast
            BridgeHelper.nativeApiToast(msg);
            return
        }
        return Toast.info(msg, duration, null, false)
    }

    static loading({msg = '加载中...', duration = 100}) {
        return Toast.loading(msg, duration,);
    }
}

export default ToastUtil