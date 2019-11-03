import React from "react";
import SelectUser from "@components/SelectUser";
import { Modal, Form, Input, message } from "antd";
import { createOrganize, updateOrganize } from "@api/index";
import UploadImg from "@components/UploadImg";

const { TextArea } = Input;

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { editItem } = this.props;
    this.props.form.setFieldsValue({
      avatar: editItem.avatar,
      name: editItem.name,
      leaderId: editItem.leaderId,
      remark: editItem.remark,
      attribute: editItem.attribute
    });
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
    updateOrganize(values).then(res => {
      res && this.succCallback();
    });
  };
  add = values => {
    createOrganize(values).then(res => {
      res && this.succCallback();
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
          <Form.Item label="协会图标">
            {getFieldDecorator("avatar", {
              rules: [{ required: true, message: "请输入" }]
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
          <Form.Item label="协会名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="会长名称">
            {getFieldDecorator("leaderId", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectUser
                setValue={value => {
                  setFieldsValue({
                    leaderId: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="协会描述">
            {getFieldDecorator("remark", {
              rules: [{ required: true, message: "请输入" }]
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="协会属性">
            {getFieldDecorator("attribute", {
              rules: [{ required: true, message: "请输入" }]
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
