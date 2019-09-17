import React from 'react';
import PropTypes from 'prop-types';


class InputView extends React.Component {
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
        if (this.input) {
            this.input.value = value;
        }
        this.setPropsInputValue();
    }

    componentDidMount() {
        const {defaultValue} = this.props;
        if (defaultValue) {
            this.setValue(defaultValue);
            this.defaultValue = defaultValue;
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {defaultValue} = nextProps;
        if (defaultValue && this.defaultValue !== defaultValue) {  //如果有默认值且不和初始化相等 重新赋值
            this.setValue(defaultValue);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isFocus: false
        };
        this.input = null;//input 对象
        this.value = '';//当前输入值
        this.defaultValue = '';
    }

    handleChange = (e) => {
        this.value = e.target.value;
        this.setPropsInputValue();
    };

    shouldComponentUpdate() {
        return false
    }

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
        // window.scroll(0, 0);
    };

    render() {

        const {style, inputStyle, focusStyle, className, id, placeholderClassName, trueClassName, onClick} = this.props;
        const {left, right} = this.props;
        const {isFocus} = this.state;

        const inputProps = this.getInputProps();

        let dynamicStyle = isFocus ? focusStyle : null;

        return (
            <div className={trueClassName} onClick={onClick}
                 style={{...InputStyle.container, ...style, ...dynamicStyle}}>
                {left}
                <input
                    ref={component => this.input = component}
                    id={id}
                    style={{...InputStyle.input, ...inputStyle}}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    className={className}
                    {...inputProps}/>
                {right}
            </div>
        );
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
        // delete inputProps['reff'];

        return inputProps;
    }

}

InputView.propTypes = {
    //自定义
    style: PropTypes.object,//整体View样式
    inputStyle: PropTypes.object,//输入框样式
    onValueChange: PropTypes.func,
    right: PropTypes.element,
    left: PropTypes.element,
    focusStyle: PropTypes.object,
    trueClassName: PropTypes.string
};

const InputStyle = {
    container: {
        display: 'flex',
        display: '-webkit-flex',
        flexDirection: 'row',
        WebkitFlexDirection: 'row',
        alignItems: 'center',
        WebkitAlignItems: 'center',
    },
    input: {
        width: "100%",
        flex: 1,
        WebkitFlex: 1,
        border: 'none',
        height: '100%'
    }
};

export default InputView;