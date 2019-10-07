import React from "react";
import { Modal, Form, Input } from "antd";
import UploadImg from "@components/UploadImg";

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="新增"
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="协会名">
            {getFieldDecorator("desc", {
              rules: [{ required: true, message: "请输入!" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="协会会徽">
            {getFieldDecorator("pic", {
              rules: [{ required: true, message: "请上传图片" }]
            })(<UploadImg />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
