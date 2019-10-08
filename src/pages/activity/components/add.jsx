import React from "react";
import moment from "moment";
import { Modal, Form, Select, Input, DatePicker, message } from "antd";
import { createActivity, updateActivity } from "@api/index";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    updateActivity(values).then(res => {
      this.succCallback();
    });
  };
  add = values => {
    createActivity(values).then(res => {
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
    const { getFieldDecorator } = this.props.form;
    const { editItem } = this.props;
    return (
      <Modal
        title={editItem && editItem.id ? "编辑" : "修改"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="活动名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="活动类别">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value="普通活动">普通活动</Option>
                <Option value="协会活动">协会活动</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="活动时间">
            {getFieldDecorator("time", {
              rules: [{ required: true, message: "请选择" }]
            })(
              <RangePicker
                defaultValue={[
                  // moment("2015-01-01", dateFormat),
                  // moment("2015-01-01", dateFormat)
                ]}
                format={dateFormat}
              />
            )}
          </Form.Item>
          <Form.Item label="活动详情">
            {getFieldDecorator("detail", {
              rules: [{ required: true, message: "请输入" }]
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Add;
