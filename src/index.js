import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'babel-polyfill'
import vConsole from 'vconsole';
import Routes from './route/Routes'
//
let console = new vConsole();

// GaUtil.gaInit();

ReactDOM.render(<Routes/>, document.getElementById('root'));

window.onerror = function (msg, url, line) {
    // GaUtil.gaError(url, `${url}\r\n${line}`);
    return false;
};