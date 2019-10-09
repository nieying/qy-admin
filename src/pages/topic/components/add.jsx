import React from "react";
import { Modal, Form, Input, message, Select } from "antd";
import { createSubject, updateSubject } from "@api/index";
import UploadImg from "@components/UploadImg";
import SelectTopicType from "@components/SelectTopicType";
import UploadFile from "@components/UploadFile";
import SelectDialect from "@components/SelectDialect";
import SelectUnit from "@components/SelectUnit";
import SelectCourse from "@components/SelectCourse";

const { Option } = Select;
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
        type: 1,
        name: editItem.name,
        languageId: editItem.languageId,
        unitId: editItem.unitId,
        courseId: editItem.courseId
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
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue
    } = this.props.form;
    const { editItem } = this.props;
    const topicType = getFieldValue("type");
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
              <SelectTopicType
                setValue={value => {
                  setFieldsValue({
                    type: value
                  });
                }}
              />
            )}
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
          <Form.Item label="所属单元">
            {getFieldDecorator("unitId", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectUnit
                setValue={value => {
                  setFieldsValue({
                    unitId: value
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="所属单元">
            {getFieldDecorator("unitId", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <SelectCourse
                setValue={value => {
                  setFieldsValue({
                    unitId: value
                  });
                }}
              />
            )}
          </Form.Item>
          {/* <Form.Item label="难度级别">
            {getFieldDecorator("level", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            )}
          </Form.Item> */}
          {parseInt(topicType) !== 3 && (
            <Form.Item label="文本题干">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请输入" }]
              })(<Input placeholder="请输入" />)}
            </Form.Item>
          )}
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
        </Form>
      </Modal>
    );
  }
}

export default Add;
