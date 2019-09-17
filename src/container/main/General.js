import BaseContainer from '../BaseContainer'
import React from  'react'
import { List, Switch } from 'antd-mobile';

class General extends BaseContainer {
    constructor(props) {
      super(props);
      this.state = {
        checked: false,
        checked1: true,
        checked2: false,
        checked3: true,
        checked4: false,
        checked5: false,
        checked6: true,
      };
    }
  
    render() {
      
      return (
        <List>
          <List.Item
            extra={<Switch
              checked={this.state.checked}
              onChange={() => {
                this.setState({
                  checked: !this.state.checked,
                });
              }}
            />}
          >Off</List.Item>
          <List.Item
            extra={<Switch
            checked={this.state.checked1}
              onChange={() => {
                this.setState({
                  checked1: !this.state.checked1,
                });
              }}
            />}
          >On (with rc-form)</List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.checked2}
              onChange={() => {
                this.setState({
                  checked2: !this.state.checked2,
                });
              }}
              disabled
            />}
          >Disabled off</List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.checked3}
              onChange={() => {
                this.setState({
                  checked3: !this.state.checked3,
                });
              }}
              disabled
            />}
          >Disabled on</List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.checked4}
              onChange={() => {
                this.setState({
                  checked4: !this.state.checked4,
                });
              }}
              platform="android"
            />}
          >Style for Android</List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.checked5}
              onChange={() => {
                this.setState({
                  checked5: !this.state.checked5,
                });
              }}
              platform="android"
              color="red"
            />}
          >Color for Android</List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.checked6}
              onChange={() => {
                this.setState({
                  checked6: !this.state.checked6,
                });
              }}
              platform="ios"
            />}
          >Style for iOS</List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.checked7}
              onChange={() => {
                this.setState({
                  checked7: !this.state.checked7,
                });
              }}
              platform="ios"
              color="red"
            />}
          >Color for iOS</List.Item>
        </List>
      );
    }
  }
  
  export default General;