//自定义固定Header
import {Flex} from "antd-mobile";
import PixelUtil from "../tools/PixelUtil";
import React from "react";

export const MyHeader = ({style, title, left, right, classname}) => {
    return (
        <Flex justify="between" style={{
            width: "100%",
            height: 45 + PixelUtil.getStatusBarHeight() + 'px',
            boxSizing:'border-box',
            // backgroundColor: getTemp().baseColor,
            position: "fixed",
            zIndex: 999,
            paddingTop: PixelUtil.getStatusBarHeight(),
            ...style
        }}
              className={classname}
        >
            <Flex justify="start" style={{width: "2rem", height: "100%"}}>
                {left}
            </Flex>
            {title}
            <Flex justify="end" style={{width: "2rem", height: "100%"}}>
                {right}
            </Flex>
        </Flex>
    )
};

export const LoginHeader = ({style, title, left, right, classname}) => {
    return (
        <div style={{height: 40 + PixelUtil.getStatusBarHeight()}}>
            <MyHeader style={{}} classname={classname} title={title} left={left} right={right}/>
        </div>
    )
};
