import React, { Component } from "react";
import { Layout, Icon, Modal } from "antd";
import { withRouter } from "react-router-dom";
import LeftBar from "./LeftBar.js";
import Routes from "@routes/index";
import { logout } from "@api/index";
import UpdatePwd from '@components/UpdatePwd'

import "./index.scss";

// const logoImg = require("@images/logo.png");
const { Content, Sider, Header } = Layout;

@withRouter
class LayoutIndex extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  quit = () => {
    Modal.confirm({
      content: "确定退出系统吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        logout().then(res => {
          localStorage.removeItem("token");
          localStorage.removeItem("adminInfo");
          localStorage.removeItem("menus");
          localStorage.setItem(
            "prevPage",
            this.props.history.location.pathname
          );
          this.props.history.push("/login");
        });
      }
    });
  };
  //   显示弹框
  showModal = record => {
    this.setState({
      visible: true,
    });
  };
  //   隐藏弹框
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }; render() {
    const { visible, collapsed } = this.state;
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">{collapsed ? "仟言" : "仟言-后台管理"}</div>
          <LeftBar />
        </Sider>
        <Layout>
          <Header>
            <div className="left">
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </div>
            <div className="right">
              <div className="admin-avatar">
                <img src={adminInfo.avatar} alt="" />
              </div>
              <div className="name" onClick={this.showModal}>{adminInfo.nickName}</div>
              <div className="quit" onClick={this.quit}>
                退出 <Icon type="export" />
              </div>
            </div>
          </Header>
          <Content>
            <Routes />
          </Content>
        </Layout>
        {visible && (
          <UpdatePwd handleCancel={this.handleCancel} />
        )}
      </Layout>
    );
  }
}

export default LayoutIndex;
