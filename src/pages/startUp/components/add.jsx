import React from "react";
import { Modal, Form, Input, message, Switch } from "antd";
import { createStartup, updateStartup } from "@api/index";
import UploadImg from "@components/UploadImg";
import SelectUnion from "@components/SelectUnion";

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
        imgUrl: editItem.imgUrl,
        state: editItem.state,
        title: editItem.title
        // organizeId: editItem.organizeId
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
    updateStartup(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createStartup(values).then(res => {
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
          <Form.Item label="图片">
            {getFieldDecorator("imgUrl", {
              rules: [{ required: true, message: "请输入" }]
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
          <Form.Item label="名称">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          {/* <Form.Item label="协会">
            {getFieldDecorator("organizeId", {
              rules: [{ message: "请选择" }]
            })(
              <SelectUnion
                setValue={value => {
                  setFieldsValue({
                    organizeId: value
                  });
                }}
              />
            )}
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }
}

export default Add;
