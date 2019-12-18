import React from "react";
import { Modal, Form, Input, message } from "antd";
import { updatePassword } from "@api";

@Form.create()
class UpdatePwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }


  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        updatePassword(values).then(res => {
          if (res) {
            message.success("修改成功");
            this.props.handleCancel();
          }
          this.setState({ loading: false });
        });
      }
    });
  };

  checkConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！')
    }
    callback()
  }

  checkPassword = (rule, value, callback) => {
    if (!/^[A-Za-z0-9]+$/.test(value)) {
      callback('只能输入字母和数字')
    }
    if (value.length > 10 || value.length < 6) {
      callback('字符长度大于等于6位小于等于10位!')
    }
    callback()
  };



  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="修改密码"
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="旧密码">
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '请输入旧密码' }, { validator: this.checkPassword }],
            })(
              <Input type="password" placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入旧密码' }, { validator: this.checkPassword }],
            })(
              <Input type="password" placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="确认新密码">
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: '请输入再次确认新密码' },
              { min: 6, message: '密码不能少于6个字符' },
              { max: 10, message: '密码不能大于10个字符' },
              { validator: this.checkConfirmPassword }],
            })(
              <Input type="password" placeholder="请输入" />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default UpdatePwd;
