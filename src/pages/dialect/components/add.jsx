import React from "react";
import { Modal, Form, Select, Input, message } from "antd";
import { createDialect, updateDialect } from "@api/index";

const { Option } = Select;

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { editItem } = this.props;
    this.props.form.setFieldsValue({
      name: editItem.name
    });
  }

  handleOk = e => {
    const { editItem } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        editItem && editItem.id ? this.update(values) : this.add(values);
      }
    });
  };

  update = values => {
    const { editItem } = this.props;
    values.id = editItem.id;
    updateDialect(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createDialect(values).then(res => {
      this.succCallback();
    });
  };

  succCallback = () => {
    const { editItem } = this.props;
    message.success(editItem && editItem.id ? "编辑成功" : "添加成功");
    this.props.handleCancel();
    this.props.getData();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editItem } = this.props;
    return (
      <Modal
        title={editItem && editItem.id ? "编辑" : "修改"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="方言">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入方言" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="归类">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择方言归类!" }]
            })(
              <Select placeholder="请选择">
                <Option value="南方">南方</Option>
                <Option value="北方">北方</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
