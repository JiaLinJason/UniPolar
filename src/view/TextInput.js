import React from 'react';
import PropTypes from 'prop-types';
import {InputItem} from "antd-mobile";


class TextInput extends React.Component {
    /**
     * 清空输入框
     */
    clear() {
        if (this.input) {
            this.input.value = '';
        }
        this.value = '';

        this.setPropsInputValue();
    }
    /**
     * 获取输入值
     * @returns {string}
     */
    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        this.setState({value});
        if (this.input) {
            this.input.value = value;
        }
        this.setPropsInputValue();
    }

    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            value: null
        };
        this.input = null;//input 对象
        this.value = '';//当前输入值
    }

    handleChange = (e) => {
        this.value = e;
        this.setState({value: e});
        this.setPropsInputValue();
    };

    setPropsInputValue() {
        if (this.props.onValueChange) {
            this.props.onValueChange(this.value);
        }
    }

    handleFocus = () => {
        this.setState({isFocus: true});
    };
    handleBlur = () => {
        this.setState({isFocus: false});
    };

    render() {
        const {style, inputStyle, focusStyle, className, id, placeholderClassName, trueClassName} = this.props;
        const {left, right} = this.props;
        const {isFocus} = this.state;

        const inputProps = this.getInputProps();

        let dynamicStyle = isFocus ? focusStyle : null;
        const {onClick, text} = this.props;
        const {value} = this.state;
        return (
            <div className={trueClassName}
                 style={{...InputStyle.container, ...style, ...dynamicStyle}}
                 onClick={onClick}
            >
                {left}
                <InputItem
                    value={value}
                    ref={component => this.input = component}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    className={` ${className}`}
                    id={id}
                    style={{...InputStyle.input, ...inputStyle}}
                    {...inputProps}
                />
                {right}
            </div>
        )
    }

    /**
     * input的其他属性 删除其他属性
     */
    getInputProps() {
        let inputProps = Object.assign({}, this.props);
        delete inputProps['onValueChange'];
        delete inputProps['onChange'];
        delete inputProps['style'];
        delete inputProps['inputStyle'];
        delete inputProps['onFocus'];
        delete inputProps['onBlur'];
        delete inputProps['className'];
        delete inputProps['onClick'];

        return inputProps;
    }

}

TextInput.propTypes = {
    //自定义
    style: PropTypes.object,//整体View样式
    inputStyle: PropTypes.object,//输入框样式
    onValueChange: PropTypes.func.isRequired,
    right: PropTypes.element,
    left: PropTypes.element,
    focusStyle: PropTypes.object,
};

const InputStyle = {
    container: {
        display: 'flex',
        display: '-webkit-flex',
        flexDirection: 'row',
        WebkitFlexDirection: 'row',
        alignItems: 'center',
        WebkitAlignItems: 'center',
        backgroundColor: 'white'
    },
    input: {
        flex: 1,
        flexGrow: 1,
        WebkitFlex: 1,
        border: 'none',
        width: '100%',
    }
};

export default TextInput;