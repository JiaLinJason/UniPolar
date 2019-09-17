import React from "react";
import {Flex, Icon, Picker} from "antd-mobile";
import AreaData from '../../const/area.js';
import {equals} from "../../tools/CommomUtil";
import PressTouch from "../../view/PressTouch";


const DataView = ({extra, onClick, children, required, isChoose, label}) => {
    return <PressTouch bgColor={'white'} activeColor={'#ddd'} onClick={onClick}
                       style={{
                           padding: '0 9px',
                           borderTop: '1px solid transparent',
                           marginBottom: '1px'
                       }}>
        <div style={{
            height: '12vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 14
        }}>
            <div style={{fontSize: '14px'}}>
                                        <span style={{
                                            color: equals(required, 1) ? '#ff0000' : 'transparent',
                                            display: 'inline-block',
                                            marginRight: 3,
                                        }}>*</span>
                {label}
            </div>
            <Flex align={'center'}>
                <span style={{fontSize: 14, color: !isChoose ? '#a4a4a4' : '#171717'}}>{extra}</span>
                <Icon type={'right'}/>
            </Flex>
        </div>
    </PressTouch>
};

class CityPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            isChoose: false
        };
        this.address = ''
    }

    componentDidMount() {
        const {defaultValue} = this.props;
        if (defaultValue) {
            this.setState({address: defaultValue, isChoose: true});
            const {onChange} = this.props;
            onChange && onChange(defaultValue)
        }
    }

    onChange = (value) => {
        let val = '';
        AreaData.forEach((sheng, i) => {
            if (equals(sheng.value, value[0])) {
                val += sheng.label;
                sheng.children.forEach((shi, j) => {
                    if (equals(shi.value, value[1])) {
                        val += ',' + shi.label;
                        shi.children.forEach((xian, k) => {
                            if (equals(xian.value, value[2])) {
                                val += "," + xian.label;
                            }
                        })
                    }
                })
            }
        });
        this.address = value;
        this.setState({address: val, isChoose: true});
        const {onChange} = this.props;
        onChange && onChange(val, value)
    };

    render() {
        const {address, isChoose} = this.state;
        const {label, required, placeholder, view, style } = this.props;
        const DataView = view;
        return (
            <Picker data={AreaData} cols={3} className="forss"
                    onChange={this.onChange}
                    value={this.address}
                    extra={address ? address : placeholder}
                    style={style}
            >
                <DataView label={label} required={required} isChoose={isChoose}/>
            </Picker>
        )
    }
}

CityPicker.defaultProps = {
    view: DataView
};

export default CityPicker;