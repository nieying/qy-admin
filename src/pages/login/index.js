import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { login, adminInfo } from "@api/index";
import "./index.scss";

@Form.create()
class Login extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: "admin123",
      password: "admin123"
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          if (res) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("adminInfo", JSON.stringify(res.adminInfo));
            localStorage.setItem("menus", JSON.stringify(res.menus));
            // this.getAdminInfo();
            this.props.history.push("/dialect");
          }
        });
      }
    });
  };

  // getAdminInfo = () => {
  //   adminInfo().then(res => {
  //     console.log('get admin info res', res)
  //   })
  // }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="page-login">
        <div className="login-warpper">
          {/* <h3>千言后台管理</h3> */}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入账号!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            {/* <Form.Item>
              <div className="remeber-me">
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>记住账号</Checkbox>)}
              </div>
              <div className="remeber-me">
                {getFieldDecorator("remember1", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>记住密码</Checkbox>)}
              </div>
            </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {" "}
                登入
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
