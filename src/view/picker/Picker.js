import React from "react";
import {Picker, List} from "antd-mobile";
import {equals} from "../../tools/CommomUtil";


class SdPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sValue: '',
            isChoose: false
        }
    }

    onChange = (v) => {
        const {options} = this.props;
        for (let i = 0; i < options[0].length; i++) {
            let item = options[0][i];
            if (equals(item.value, v)) {
                this.setState({sValue: item.label, isChoose: true});
                const {onChange} = this.props;
                onChange && onChange(v);
                return;
            }
        }
    };

    componentDidMount() {
        const {defaultValue} = this.props;
        if (defaultValue) {
            this.onChange([defaultValue])
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {defaultValue} = nextProps;
        if (defaultValue) {
            this.onChange([defaultValue])
        }
    }

    render() {
        const {sValue} = this.state;
        const {options = [], placeholder} = this.props;
        let pickerProps = Object.assign({}, this.props);
        delete pickerProps ['onChange'];
        return (
            <Picker
                data={options}
                cascade={false}
                onChange={this.onChange}
                {...pickerProps}
                extra={sValue ? sValue : placeholder}
            >
                {this.renderContent()}
            </Picker>
        )
    }

    getRequiredColor = () => {
        const {required = false} = this.props;
        if (required) {
            return {color: 'red'}
        } else {
            return {color: 'transparent'}
        }
    };
    renderContent = () => {
        const {view, itemStyle, placeholder, label, required} = this.props;
        const {sValue, isChoose} = this.state;
        if (!view) {
            return <List.Item arrow="horizontal"
                              style={{marginBottom: 1, paddingLeft: '5px', ...itemStyle}}>
                <span style={this.getRequiredColor()}>*</span>
                {label}
            </List.Item>
        } else {
            const Content = view;
            return <div>
                <Content isChoose={isChoose} placeholder={sValue ? sValue : placeholder} label={label}
                         required={required}/>
            </div>
        }

    }
}

SdPicker.defaultProps = {
    // view: View
};


export default SdPicker;