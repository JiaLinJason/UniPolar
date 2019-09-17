import React from "react";
import {ImagePicker} from "antd-mobile";


class SdImagePicker extends React.Component{



    render(){
        const {maxLength= 10,files=[],addImageClick,onChange,imgKey} = this.props;
        return (
            <ImagePicker
                files={files}
                onChange={(files, type, index)=>onChange(files, type, index,imgKey)}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < maxLength}
                multiple={false}
                onAddImageClick={addImageClick}
                length={3}
            />
        )
    }
}

export default SdImagePicker