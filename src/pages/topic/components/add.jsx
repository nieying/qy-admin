import React from "react";
import { Modal, Form, Input, message, Button, Icon } from "antd";
import { createSubject, updateSubject, getSubjectInfo } from "@api/index";
import UploadImg from "@components/UploadImg";
import SelectTopicType from "@components/SelectTopicType";
import UploadFile from "@components/UploadFile";
import SelectDialect from "@components/SelectDialect";
import SelectUnit from "@components/SelectUnit";
import { formatFormData } from "@utils/constants";

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.keys = [];
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.getSubjectDetail(id);
    } else {
      this.props.form.setFieldsValue({
        type: "normal"
      });
    }
  }

  // 获取题目详情
  getSubjectDetail = id => {
    getSubjectInfo({ id: id }).then(res => {
      const formObj = {};
      let notes = JSON.parse(res.notes);
      this.keys = notes;
      notes.forEach((item, index) => {
        formObj[`key_${index}`] = item.key;
        formObj[`value_${index}`] = item.value;
      });
      this.props.form.setFieldsValue({
        type: res.type,
        languageId: res.languageId,
        title: res.title,
        unitId: res.unitId,
        filePath: res.filePath,
        ...formObj
      });
    });
  };

  handleOk = e => {
    const { editItem } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.type === "normal") {
        const notes = JSON.stringify(formatFormData(values));
        values.notes = notes;
      }
      console.log("values===>", values);
      if (!err) {
        editItem && editItem.id ? this.update(values) : this.create(values);
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
  create = values => {
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

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const addKey = [];
    const nextKeys = keys.concat(addKey);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  rendFormItem = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    getFieldDecorator("keys", { initialValue: this.keys });
    let keys = getFieldValue("keys");
    return (
      keys &&
      keys.map((k, index) => (
        <div style={{ display: "flex" }} key={index}>
          <Form.Item
            {...formItemLayout}
            label={`关键字${index + 1}:`}
            required={false}
            style={{ flex: 1 }}
          >
            {getFieldDecorator(`key_${index}`, {
              rules: [{ required: true, message: "请输入" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={`注释${index + 1}:`}
            required={false}
            style={{ flex: 1 }}
          >
            {getFieldDecorator(`value_${index}`, {
              rules: [{ required: true, message: "请输入" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item>
            {keys.length > 1 ? (
              <Icon
                style={{ marginLeft: 10 }}
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Form.Item>
        </div>
      ))
    );
  };

  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue
    } = this.props.form;
    const { editItem } = this.props;
    const topicType = getFieldValue("type");
    const languageId = getFieldValue("languageId");
    console.log("languageId", languageId);
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
              rules: [{ required: true, message: "请选择" }]
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
              rules: [{ required: true, message: "请选择" }]
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
          {languageId && (
            <Form.Item label="所属单元">
              {getFieldDecorator("unitId", {
                rules: [{ required: true, message: "请选择" }]
              })(
                <SelectUnit
                  languageId={languageId}
                  setValue={value => {
                    setFieldsValue({
                      unitId: value
                    });
                  }}
                />
              )}
            </Form.Item>
          )}
          {/* <Form.Item label="难度级别">
            {getFieldDecorator("level", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            )}
          </Form.Item> */}
          {topicType !== "map" && (
            <Form.Item label="文本题干">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请输入" }]
              })(<Input placeholder="请输入" />)}
            </Form.Item>
          )}
          {topicType === "auto" && (
            <Form.Item label="语音上传">
              {getFieldDecorator("filePath", {
                rules: [{ required: true, message: "请选择" }]
              })(<UploadFile />)}
            </Form.Item>
          )}
          {topicType === "map" && (
            <Form.Item label="图片上传">
              {getFieldDecorator("filePath", {
                rules: [{ required: true, message: "请选择" }]
              })(<UploadImg />)}
            </Form.Item>
          )}
          {topicType === "normal" && this.rendFormItem()}
          {topicType === "normal" && (
            <Form.Item>
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> 新增注释
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Add;
