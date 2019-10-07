import React, { Component } from "react";
import { Layout, Icon, Menu } from "antd";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar.js";
import Routes from "@routes/index";

import './index.scss'

const { Content, Sider } = Layout;

@withRouter
class LayoutIndex extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: false,
        };
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentWillMount() { }
    render() {
        return (
            <Layout className="page-layout">
                <Header />
                <Layout>
                    <LeftBar />
                    <Content>
                        <Routes />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutIndex;
