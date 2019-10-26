import React from "react";
import { Modal, Form, Input, message, Switch } from "antd";
import { createAdvert, updateAdvert } from "@api/index";
import UploadImg from "@components/UploadImg";

const { TextArea } = Input;

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { editItem } = this.props;
    if (editItem && editItem.id) {
      this.props.form.setFieldsValue({
        imgUrl: editItem.imgUrl,
        title: editItem.title,
        content: editItem.content,
        state: editItem.state
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
        editItem && editItem.id ? this.update(values) : this.add(values);
      }
    });
  };

  update = values => {
    const { editItem } = this.props;
    values.id = editItem.id;
    updateAdvert(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createAdvert(values).then(res => {
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
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="广告图片">
            {getFieldDecorator("imgUrl", {
              rules: [{ required: true, message: "请上传图片" }]
            })(
              <UploadImg
                setValue={value => {
                  setFieldsValue({
                    imgUrl: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="启用">
            {getFieldDecorator("state", {
              valuePropName: "checked",
              rules: [{ required: true, message: "请输入" }]
            })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />)}
          </Form.Item>
          <Form.Item label="广告标题">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="广告内容">
            {getFieldDecorator("content", {
              rules: [{ required: true, message: "请输入" }]
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
