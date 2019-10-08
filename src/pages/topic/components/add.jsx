import React from "react";
import { Modal, Form, Input, message, Select } from "antd";
import { createSubject, updateSubject } from "@api/index";
import UploadImg from "@components/UploadImg";
import UploadFile from "@components/UploadFile";
import SelectDialect from "@components/SelectDialect";

const { Option } = Select;
@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicType: "1"
    };
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
    updateSubject(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createSubject(values).then(res => {
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
    const { topicType } = this.state;
    return (
      <Modal
        title={editItem && editItem.id ? "编辑" : "新增"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="题目类型">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择" onChange={this.handleChangeType}>
                <Option value="1">听力题</Option>
                <Option value="2">伪音标题</Option>
                <Option value="3">看图题</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="所属单元">
            {getFieldDecorator("unit", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="方言">
            {getFieldDecorator("dialect", {
              rules: [{ required: true, message: "请输入" }]
            })(<SelectDialect />)}
          </Form.Item>
          <Form.Item label="难度级别">
            {getFieldDecorator("level", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="文本题干">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          {parseInt(topicType) === 1 && (
            <Form.Item label="语音上传">
              {getFieldDecorator("video", {
                rules: [{ required: true, message: "请选择" }]
              })(<UploadFile />)}
            </Form.Item>
          )}
          {parseInt(topicType) === 3 && (
            <Form.Item label="图片上传">
              {getFieldDecorator("pic", {
                rules: [{ required: true, message: "请选择" }]
              })(<UploadImg />)}
            </Form.Item>
          )}
          <Form.Item label="答题选项A">
            {getFieldDecorator("A", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="答题选项B">
            {getFieldDecorator("B", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="答题选项C">
            {getFieldDecorator("C", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="答题选项D">
            {getFieldDecorator("D", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="正确答案">
            {getFieldDecorator("correctAnswer", {
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
