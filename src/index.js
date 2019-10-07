import React from 'react';
import ReactDOM from 'react-dom';
import '@styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axiosConfigure from '@utils/axiosConfigure';

moment.locale('zh-cn');
axiosConfigure()
ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <HashRouter>
            <App />
        </HashRouter>
    </ConfigProvider >,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
