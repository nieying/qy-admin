import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Icon, Modal, Button, message } from "antd";
import { setLocalStore } from "@utils/constants";
import { logout } from "@api/index";

const logoImg = require("@images/logo.png");
const { Header } = Layout;

@withRouter
class Head extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      icon: "arrows-alt",
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
          this.props.history.push("/login");
        });
      }
    });
  };
  render() {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    return (
      <Header className="header">
        <div className="left">
          <img src={logoImg} alt="" />
        </div>
        <div className="right">
          <div className="avatar">
            <img src={adminInfo.avatar} alt="" />
          </div>
          <div className="name">{adminInfo.nickName}</div>
          <div className="quit" onClick={this.quit}>
            退出
            <Icon type="export" />{" "}
          </div>
        </div>
      </Header>
    );
  }
}

export default Head;
