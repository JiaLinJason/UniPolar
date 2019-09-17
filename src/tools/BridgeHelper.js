import androidBridge from '../depend/bridge/index.android';
import iosBridge from '../depend/bridge/index.ios';
import PlatUtil from './PlatUtil';

let BridgeHelper;

if (PlatUtil.isIos()) {
    BridgeHelper = iosBridge
} else {
    BridgeHelper = androidBridge
}

export default BridgeHelper