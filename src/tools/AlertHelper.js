import {Modal, Toast} from 'antd-mobile'
import ToastUtil from "./ToastUtil";

const alert = Modal.alert;

class AlertHelper {
    static showHint({operateMsg = '出错了', operateTitle = '提示', callback, color}) {
        Toast.hide();
        alert(operateTitle, operateMsg, [
            {text: '确定', onPress: callback && callback, style: 'default'},
        ]);
    }

    static showOperate({operateMsg = '提示', operateTitle = '标题', cancelCallback, sureCallback}) {
        Toast.hide();
        alert(operateTitle, operateMsg, [
            {text: '取消', onPress: cancelCallback, style: 'default'},
            {text: '确定', onPress: sureCallback},
        ]);
    }

    static showProgress({msg, duration}) {
        ToastUtil.loading({msg, duration})
    }

    static dismiss() {
        Toast.hide()
    }
}

export default AlertHelper
