import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createSubject, updateSubject } from "@api/index";

@Form.create()
class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicType: "1"
    };
  }

  componentDidMount() {
    // const { editItem } = this.props;
    this.props.form.setFieldsValue({
      // name: editItem.name
    });
  }

  handleOk = e => {
    const { topicId } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.subjectId = topicId
        topicId ? this.update(values) : this.add(values);
      }
    });
  };

  update = values => {
    updateSubject(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createSubject(values).then(res => {
      this.succCallback();
    });
  };

  succCallback = () => {
    const { topicId } = this.props;
    message.success(topicId ? "编辑成功" : "添加成功");
    this.props.handleCancel();
    this.props.getData();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { topicId } = this.props;
    return (
      <Modal
        title={topicId ? "编辑" : "新增"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="答题选项A">
            {getFieldDecorator("A", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="答题选项B">
            {getFieldDecorator("B", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="答题选项C">
            {getFieldDecorator("C", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="答题选项D">
            {getFieldDecorator("D", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddAnswer;
