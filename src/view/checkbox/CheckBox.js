import React from "react";

class CheckBox extends React.Component {
    state = {
        checked: this.props.defaultChecked
    };

    toggleChecked() {
        this.setState({
            checked: !this.state.checked
        }, () => {
            this.props.toggleChecked && this.props.toggleChecked(this.state.checked);
            this.props.changeChecked&&this.props.changeChecked();
        })
    }

    render() {
        return (
            <div onClick={this.toggleChecked.bind(this)}>
                <div style={{
                    backgroundColor: this.state.checked ? '#0f9d54' : '#ffffff',
                    width: "10px",
                    height: "10px",
                    border: '7px solid #0f9d54',
                    borderWidth: '1px',
                    borderRadius: '50%',
                    marginRight:'5px'
                }}/>
            </div>
        )
    }
}

export default CheckBox;