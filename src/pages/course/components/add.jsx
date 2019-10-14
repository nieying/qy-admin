import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createCourse, updateCourse } from "@api/index";
import SelectUnit from "@components/SelectUnit";
import UploadImg from "@components/UploadImg";

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
        avatar: editItem.avatar,
        name: editItem.name,
        languageId: editItem.languageId.toString(),
        unitId: editItem.unitId.toString()
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
        <Form.Item label="单元图标">
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
          <Form.Item label="单元名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属课程">
            {getFieldDecorator("languageId", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectUnit
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
