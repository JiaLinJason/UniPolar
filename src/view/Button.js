import React from "react";

export const BankButton = ({ style={}, text, onClick }) => {
    const height = style.height ? style.height : ".9rem";
    // boxShadowColor = Test.changeColor(color, 1.4);   //注：使用lineHeight设置高度
    return (
        <div style={{
            textAlign: "center",
            border: "0",
            // width: "82%",
            margin: '0 auto',
            fontSize: ".32rem",
            lineHeight: height,
            // boxShadow: "0px 0px 15px 0px " + boxShadowColor + "",
            borderRadius: "2.5vw",
            background:'linear-gradient(to right,#11a666, #35b78b)',
            color:'white',
            boxShadow: "0 1px 5px #35b78b",
            ...style
        }}
             onClick={onClick}
        >
            {text}
        </div>
    );
};