import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createCourse, updateCourse } from "@api/index";
import SelectUnit from "@components/SelectUnit";

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
    updateCourse(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createCourse(values).then(res => {
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
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { editItem } = this.props;
    return (
      <Modal
        title={editItem && editItem.id ? "编辑" : "修改"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="课程名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属单元">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectUnit
                setValue={value => {
                  setFieldsValue({
                    type: value
                  });
                }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
