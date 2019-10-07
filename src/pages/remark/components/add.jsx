import React from "react";
import { Modal, Form, Select, Input } from "antd";
const { Option } = Select;
const { TextArea } = Input;

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
          <Form.Item label="注释词语">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="注释意思">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请输入" }]
            })(<TextArea rows={2} placeholder="请输入"></TextArea>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
