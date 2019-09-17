import React from 'react';

import PropTypes from 'prop-types';

class PressTouch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pressOpacity: 1,
            bgColor: this.getDefaultColor(),
        };
    }

    onTouchStart = () => {
        if (this.isActive()) {
            this.setState({bgColor: this.getActiveColor()});
        } else {
            this.setState({pressOpacity: 0.6});
        }
    };

    onTouchEnd = () => {
        if (this.isActive()) {
            this.setState({bgColor: this.getDefaultColor()});
        } else {
            this.setState({pressOpacity: 1});
        }
    };

    onTouchCancel = () => {
        if (this.isActive()) {
            this.setState({bgColor: this.getDefaultColor()});
        } else {
            this.setState({pressOpacity: 1});
        }
    };

    getDefaultColor() {
        return this.props.bgColor ? this.props.bgColor : 'transparent';
    }

    getActiveColor() {
        return this.props.activeColor;
    }

    getChangeParam() {
        if (this.isActive()) {
            return {backgroundColor: this.state.bgColor};
        }
        return {opacity: this.state.pressOpacity};
    }

    isActive() {
        return !!this.props.activeColor;

    }

    render() {
        const onClick = this.props.onClick;
        const extraStyle = this.props.style;
        const {className} = this.props;

        return (
            <div
                className={className}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                onTouchCancel={this.onTouchCancel}
                onClick={onClick}
                style={{...extraStyle, ...this.getChangeParam()}}>
                {this.props.children}
            </div>
        );
    }

}

PressTouch.propTypes = {
    bgColor: PropTypes.string,
    activeColor: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

export default PressTouch;