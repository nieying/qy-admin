import React from "react";
import moment from "moment";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import UploadImg from "@components/UploadImg";

import { Modal, Form, Select, Input, DatePicker, message } from "antd";
import { readActivity, createActivity, updateActivity } from "@api/index";

const { Option } = Select;
const dateFormat = "YYYY-MM-DD";

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {
    const { editItem } = this.props;
    if (editItem && editItem.id) {
      readActivity({ id: editItem.id }).then(res => {
        res && this.setFormData(res);
      });
    }
  }
  setFormData = res => {
    this.props.form.setFieldsValue({
      imgUrl: res.imgUrl,
      title: res.title,
      type: res.type,
      startTime: moment(res.startTime),
      endTime: moment(res.endTime),
      content: BraftEditor.createEditorState(res.content)
    });
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  handleOk = e => {
    const { editItem } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.content = values.content.toHTML();
      values.actDate = moment(values.startTime).format("YYYY-MM-DD");
      values.link = "https://jeff.cn/qyAdmin";
      values.startTime = moment(values.startTime).format("YYYY-MM-DD HH:mm:ss");
      values.endTime = moment(values.endTime).format("YYYY-MM-DD HH:mm:ss");
      if (!err) {
        editItem && editItem.id ? this.update(values) : this.add(values);
      }
    });
  };

  update = values => {
    const { editItem } = this.props;
    values.id = editItem.id;
    updateActivity(values).then(res => {
      this.succCallback(res);
    });
  };
  add = values => {
    createActivity(values).then(res => {
      this.succCallback(res);
    });
  };

  succCallback = res => {
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
        width="80%"
        centered
        title={editItem && editItem.id ? "编辑" : "新增"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
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
          <Form.Item label="活动名称">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="活动类别">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value="official">官方活动</Option>
                <Option value="society">协会活动</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="活动开始时间">
            {getFieldDecorator("startTime", {
              rules: [{ required: true, message: "请选择" }]
            })(<DatePicker format={dateFormat} />)}
          </Form.Item>
          <Form.Item label="活动结束时间">
            {getFieldDecorator("endTime", {
              rules: [{ required: true, message: "请选择" }]
            })(<DatePicker format={dateFormat} />)}
          </Form.Item>
          <Form.Item label="活动详情">
            {getFieldDecorator("content", {
              rules: [{ required: true, message: "请输入" }]
            })(
              <BraftEditor
                onChange={this.handleEditorChange}
                // onSave={this.submitContent}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
