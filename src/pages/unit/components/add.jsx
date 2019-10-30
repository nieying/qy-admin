import React from "react";
import { Modal, Form, Input, message, Switch } from "antd";
import { createUnit, updateUnit } from "@api/index";
import UploadImg from "@components/UploadImg";
import SelectDialect from "@components/SelectDialect";

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    const { editItem } = this.props;
    if (editItem && editItem.id) {
      this.props.form.setFieldsValue({
        avatar: editItem.avatar,
        darkAvatar: editItem.darkAvatar,
        name: editItem.name,
        state: editItem.state,
        languageId: editItem.languageId
      });
    } else {
      this.props.form.setFieldsValue({
        state: false
      });
    }
  }

  handleOk = e => {
    const { editItem } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        editItem && editItem.id ? this.update(values) : this.add(values);
      }
    });
  };

  update = values => {
    const { editItem } = this.props;
    values.id = editItem.id;
    updateUnit(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createUnit(values).then(res => {
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
        title={editItem && editItem.id ? "编辑" : "新增"}
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="点亮图标">
            {getFieldDecorator("avatar", {
              rules: [{ required: true, message: "请上传图片" }]
            })(
              <UploadImg
                setValue={value => {
                  setFieldsValue({
                    avatar: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="灰色图标">
            {getFieldDecorator("darkAvatar", {
              rules: [{ required: true, message: "请上传图片" }]
            })(
              <UploadImg
                setValue={value => {
                  setFieldsValue({
                    darkAvatar: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="单元名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="启用">
            {getFieldDecorator("state", {
              valuePropName: "checked",
              rules: [{ required: true, message: "请输入" }]
            })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />)}
          </Form.Item>
          <Form.Item label="所属方言">
            {getFieldDecorator("languageId", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectDialect
                setValue={value => {
                  setFieldsValue({
                    languageId: value
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
