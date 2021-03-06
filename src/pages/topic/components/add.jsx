import React from "react";
import { Modal, Form, Input, message, Button, Icon, Switch } from "antd";
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
    this.state = {
      loading: false,
      detailObj: null
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.getSubjectDetail(id);
    } else {
      this.props.form.setFieldsValue({
        type: "normal",
        state: false
      });
    }
  }

  // 获取题目详情
  getSubjectDetail = id => {
    getSubjectInfo({ id: id }).then(res => {
      this.setState({ detailObj: res });
      let notes = JSON.parse(res.notes);
      this.keys = notes;
      this.props.form.setFieldsValue({
        type: res.type,
        state: res.state,
        languageId: res.languageId,
        title: res.title,
        unitIdList: [res.unitId],
        filePath: res.filePath
      });
    });
  };

  handleOk = e => {
    const { id } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.type !== "map") {
        const notes = JSON.stringify(formatFormData(values));
        values.notes = notes;
      }
      if (!err) {
        this.setState({loading:true})
        id ? this.update(values) : this.create(values);
      }
    });
  };

  update = values => {
    const { id } = this.props;
    values.id = id;
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
    const { id } = this.props;
    message.success(id ? "编辑成功" : "添加成功");
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
    const addKey = [{ key: "", value: "" }];
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
            label={`关键字:`}
            required={false}
            style={{ flex: 1 }}
          >
            {getFieldDecorator(`key_${index}`, {
              initialValue: k.key,
              rules: [{ required: true, message: "请输入" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={`注释:`}
            required={false}
            style={{ flex: 1 }}
          >
            {getFieldDecorator(`value_${index}`, {
              initialValue: k.value,
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
    const { detailObj } = this.state;
    // const filePath = getFieldValue("filePath");
    const languageId = getFieldValue("languageId");
    return (
      <Modal
        title={editItem && editItem.id ? "编辑" : "新增"}
        visible={true}
        confirmLoading={this.state.loading}
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
          {true && (
            <Form.Item label="所属单元">
              {getFieldDecorator("unitIdList", {
                rules: [{ required: true, message: "请选择" }]
              })(
                <SelectUnit
                  mode={true}
                  languageId={languageId}
                  setValue={value => {
                    setFieldsValue({
                      unitIdList: value
                    });
                  }}
                />
              )}
            </Form.Item>
          )}
          <Form.Item label="启用">
            {getFieldDecorator("state", {
              valuePropName: "checked",
              rules: [{ required: true, message: "请输入" }]
            })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />)}
          </Form.Item>
          <Form.Item label="文本题干">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          {getFieldValue("type") === "auto" && (
            <Form.Item label="语音上传">
              {getFieldDecorator("filePath", {
                initialValue: detailObj && detailObj.filePath,
                rules: [{ required: true, message: "请选择" }]
              })(
                <UploadFile
                  setValue={value => {
                    setFieldsValue({
                      filePath: value
                    });
                  }}
                />
              )}
            </Form.Item>
          )}
          {getFieldValue("type") === "map" && (
            <Form.Item label="图片上传">
              {getFieldDecorator("filePath", {
                initialValue: detailObj && detailObj.filePath,
                rules: [{ required: true, message: "请选择" }]
              })(
                <UploadImg
                  setValue={value => {
                    setFieldsValue({
                      filePath: value
                    });
                  }}
                />
              )}
            </Form.Item>
          )}
          {getFieldValue("type") !== "map" && this.rendFormItem()}
          {getFieldValue("type") !== "map" && (
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
