import React from "react";
import { Modal, Form, Input, message } from "antd";
import { updateGarde } from "@api/index";
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
    this.props.form.setFieldsValue({
      image: editItem.image,
      darkImage: editItem.darkImage,
      title: editItem.title,
      remark: editItem.remark
    });
  }

  handleOk = e => {
    const { editItem } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        values.type = editItem.type.split("_")[2];
        if (editItem.showItem) {
          values.config = {
            level_a: {
              name: values.name_0,
              value: values.value_0
            },
            level_b: {
              name: values.name_1,
              value: values.value_1
            },
            level_c: {
              name: values.name_2,
              value: values.value_2
            },
            level_d: {
              name: values.name_3,
              value: values.value_3
            },
            level_e: {
              name: values.name_4,
              value: values.value_4
            }
          };
        }
        updateGarde(values).then(res => {
          message.success("编辑成功");
          this.props.handleCancel();
          this.props.getData();
        });
      }
    });
  };

  rendLevel = (item, index) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div key={index} style={{ borderBottom: "1px solid #ccc" }}>
        <Form.Item label={`等级${index + 1}`}>
          {getFieldDecorator(`name_${index}`, {
            initialValue: item.name,
            rules: [{ required: true, message: "请输入" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={`对应值${index + 1}`}>
          {getFieldDecorator(`value_${index}`, {
            initialValue: item.value,
            rules: [{ required: true, message: "请输入" }]
          })(<Input />)}
        </Form.Item>
      </div>
    );
  };

  render() {
    const { editItem } = this.props;
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    return (
      <Modal
        title={"修改"}
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="点亮图标">
            {getFieldDecorator("image", {
              rules: [{ required: true, message: "请上传图片" }]
            })(
              <UploadImg
                setValue={value => {
                  setFieldsValue({
                    image: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="灰色图标">
            {getFieldDecorator("darkImage", {
              rules: [{ required: true, message: "请上传图片" }]
            })(
              <UploadImg
                setValue={value => {
                  setFieldsValue({
                    darkImage: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="名称">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator("remark", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>

          {editItem && editItem.showItem && (
            <div>
              {editItem.configList.map((item, index) => {
                return this.rendLevel(item, index);
              })}
            </div>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Add;
