import React from "react";
import PlatUtil from "../tools/PlatUtil";
import BridgeHelper from "../tools/BridgeHelper";


class ImagePicker extends React.Component {


    handleAddImg = () => {

    };
    addImageClick=()=>{
        if(PlatUtil.isWebView()){
            return BridgeHelper.imageSelect('imageCode')
        }
    };

    render() {
        const {files} = this.props;
        return (
            <div>
                图片选择
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={this.state.multiple}
                    onAddImageClick={(e) => {
                        e.preventDefault();
                        console.log('13131212')
                    }}
                    {...this.props}
                />
            </div>
        )
    }

}

export default ImagePicker
