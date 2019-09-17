import InputView from "../../view/InputView";
import React from "react";
import PropTypes from "prop-types";
import Config from "../../Config";

export const LoginInput = (props) => {
    const {lefttext} = props;
    return (
        <div style={{margin: '0 8.2vw',}}>
            <p style={{fontSize: '15px', color: '#171717', margin: '13px 0 10px 0'}}>{lefttext}</p>
            <InputView style={{paddingLeft: 16, height: 40, backgroundColor: '#f7f7fb', borderRadius: '3px'}}
                       inputStyle={{height: 30, fontSize: 16}} {...props} />
        </div>)
};

export const ChangePwdInput = (props) => {
    return (
        <div>
            <InputView style={{
                paddingLeft: 16,
                height: 50,
                backgroundColor: '#fff',
                borderRadius: '3px',
                borderBottom: '1px solid #f5f5f5'
            }}
                       inputStyle={{paddingLeft: 5, height: 30, fontSize: 8}} {...props} />
        </div>
    )
};


export class TextButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            press: '1'
        }
    }

    static propTypes = {
        style: PropTypes.object,
        text: PropTypes.string.isRequired,
        className: PropTypes.string,
    };
    handleMouseDown = () => {
        this.setState({
            press: '0.5'
        })
    };
    handleMouseUp = () => {
        this.setState({
            press: '1'
        })
    };

    setText = (text) => {
        this.setState({stateText: text})
    };

    setDisable = (bool) => {
        this.setState({disable: bool})
    };

    render() {
        const {text, className, onClick, style} = this.props;
        const {press, stateText, disable} = this.state;
        const rootStyle = {
            // backgroundColor: 'blue'
            border: "0px",
            backgroundColor: "transparent",
            textAlign: 'center',
            opacity: press
        };
        const textStyle = {
            whiteSpace: 'nowrap',
            borderRadius: "0.5rem",
            color: Config.baseColor,
            padding: ".05rem .15rem",
            fontSize: 15
        };

        return (<button
            disabled={disable}
            onClick={onClick}
            className={className}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onTouchStart={this.handleMouseDown}
            onTouchEnd={this.handleMouseUp}
            style={{...rootStyle}}>
            <span style={{...textStyle, ...style}}>{stateText ? stateText : text}</span>
        </button>)
    }
}