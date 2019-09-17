import NativeContainer from "../NativeContainer";
import {ImagePicker} from "antd-mobile";
import React from "react";
import PropTypes from "prop-types";
import BridgeHelper from "../../tools/BridgeHelper";
import {equals} from "../../tools/CommomUtil";
import {upLoadBase64} from "../../service/Service";
import PlatUtil from "../../tools/PlatUtil";

class SdImagePicker extends NativeContainer {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    eventPermission(params) { //处理权限
        if (params) {
            let obj = JSON.parse(params);
            if (equals(obj.requestCode, 100)) {
                BridgeHelper.permissionRequest(
                    'android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE',
                    '请在设置中授权获取存储权限', 101);
            } else if (equals(obj.requestCode, 101)) { //申请存储权限
                BridgeHelper.openCamera({maxSize: '500', imgCode: this.code});
            }
        }
    }

    eventReceive(params) {
        const {imgCode} = params;
        const {imgKey = 1} = this.props;
        if (equals(imgCode, imgKey)) {
            this.upLoad(params.base64, params.imgCode)
        }

    }

    NComponentDidMount() {  //初始化

    }

    addImageClick = (e) => {
        const {imgKey = 1} = this.props;
        e.preventDefault();
        // this.configCode = configCode;
        this.code = item.key;
        if (PlatUtil.isIos()) {
            BridgeHelper.openCamera({maxSize: '500', imgCode: imgKey})
        } else {
            let cameraCheckResult = BridgeHelper.permissionCheck('android.permission.CAMERA');
            let storageCheckResult = BridgeHelper.permissionCheck('android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE');
            if (cameraCheckResult === 'true' && storageCheckResult === 'true') {
                BridgeHelper.openCamera({maxSize: '500', imgCode: imgKey})
            } else if (cameraCheckResult === 'false') {
                let cameraResult = BridgeHelper.permissionRequest(
                    'android.permission.CAMERA',
                    '相机权限', 100);
                if (cameraResult === 'false') {
                    this.toast('请在设置中开启相机权限');
                }
            } else if (storageCheckResult === 'false') {
                let storageResult = BridgeHelper.permissionRequest(
                    'android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE',
                    '请在设置中授权获取存储权限', 101);
                if (storageResult === 'false') {
                    this.toast('请在设置中开启存储权限');
                }
            }
        }
    };
    onChange = () => {

    };

    render() {
        const {files} = this.state;
        return (
            <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < maxLength}
                multiple={false}
                onAddImageClick={this.addImageClick}
                length={3}
                {...this.props}
            />
        )
    }

    upLoad = (img) => {  //上传图片设置显示
        upLoadBase64({desc: img}).then(res => {
            const {files} = this.state;
            this.setState({
                files: [].concat(files, [{url: res}])
            }, () => {
                const {files} = this.params;
                const {onChange} = this.props;
                onChange && onChange(files);
            });
        }).catch(err => {
            this.toast(err)
        });
    };


}

SdImagePicker.PropTypes = {
    imgKey: PropTypes.number.isRequired,//如果一个页面使用了多个imagePicker 必须传imgKey
};

export default SdImagePicker