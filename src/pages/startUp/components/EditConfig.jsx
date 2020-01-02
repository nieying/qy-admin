import React from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";
import { updateConfig } from "@api/index";

@Form.create()
class EditConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { editItem } = this.props;
    if (editItem && editItem.id) {
      this.props.form.setFieldsValue({
        // remark: editItem.remark,
        value: editItem.keyValue
      });
    } else {
      this.props.form.setFieldsValue({
        state: false
      });
    }
  }

  handleOk = e => {
    e.preventDefault();
    const { editItem } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        values.id = editItem.id;
        updateConfig(values).then(res => {
          message.success("编辑成功");
          this.props.handleCancel();
          this.props.getData();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editItem } = this.props;
    return (
      <Modal
        title={editItem && editItem.id ? "编辑" : "新增"}
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {/* <Form.Item label="名称">
            {getFieldDecorator("remark", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item> */}
          <Form.Item label="对应值">
            {getFieldDecorator("value", {
              rules: [{ required: true, message: "请输入金额数字" }]
            })(<InputNumber min={0} formatter={value => `${value} 元`} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditConfig;
