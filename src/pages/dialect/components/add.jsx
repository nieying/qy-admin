import React from "react";
import { Modal, Form, Input, message, Switch } from "antd";
import { createDialect, updateDialect } from "@api/index";
import SelectDialectType from "@components/SelectDialectType";
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
      provePath: editItem.provePath,
      state: editItem.state,
      name: editItem.name,
      classId: editItem.classId,
      remark: editItem.remark
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
    updateDialect(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createDialect(values).then(res => {
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
          <Form.Item label="图标">
            {getFieldDecorator("provePath", {
              rules: [{ required: true, message: "请上传图片" }]
            })(
              <UploadImg
                setValue={value => {
                  setFieldsValue({
                    provePath: value
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
          <Form.Item label="方言">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="归类">
            {getFieldDecorator("classId", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectDialectType
                setValue={value => {
                  setFieldsValue({
                    classId: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator("remark", {
              rules: [{ required: true, message: "请输入" }]
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
