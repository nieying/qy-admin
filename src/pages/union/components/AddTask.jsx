import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createTask, updateTask } from "@api/index";
import UploadImg from "@components/UploadImg";

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
    if (editItem && editItem.id) {
      this.props.form.setFieldsValue({
        organizeId: editItem.organizeId,
        avatar: editItem.avatar,
        darkAvatar: editItem.darkAvatar,
        title: editItem.title,
        detail: editItem.detail
      });
    }
  }

  handleOk = e => {
    const { editItem } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        values.organizeId = editItem.organizeId;

        if (editItem && editItem.id) {
          values.id = editItem.id;
          updateTask(values).then(res => {
            if (res) {
              message.success("编辑成功");
              this.props.handleCancel();
              this.props.getData();
            }
          });
        } else {
          createTask(values).then(res => {
            if (res) {
              message.success("新增成功");
              this.props.handleCancel();
              this.props.getData();
            }
          });
        }
      }
    });
  };

  render() {
    const { editItem } = this.props;
    const { getFieldDecorator, setFieldsValue } = this.props.form;
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
          <Form.Item label="任务名称">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="任务详情">
            {getFieldDecorator("detail", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
