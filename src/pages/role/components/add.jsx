import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createAdmin, updateAdmin } from "@api/index";
import UploadImg from "@components/UploadImg";
import SelectMenu from "@components/SelectMenu";

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
    updateAdmin(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createAdmin(values).then(res => {
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
          <Form.Item label="管理员头像">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<UploadImg />)}
          </Form.Item>
          <Form.Item label="管理员名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="管理员密码">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="菜单权限">
            {getFieldDecorator("menulist", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectMenu
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
