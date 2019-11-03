import React from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { Modal, Form, message } from "antd";
import { getProtocol, postProtocol } from "@api/index";

@Form.create()
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: "",
      loading: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    getProtocol().then(res => {
      this.props.form.setFieldsValue({
        value: BraftEditor.createEditorState(res)
      });
    });
  }
  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.value = values.value.toHTML();
      if (!err) {
        this.setState({ loading: true });
        postProtocol(values).then(res => {
          message.success("编辑成功");
          this.props.handleCancel();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        width="60%"
        centered
        title="编辑协议"
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="协议内容">
            {getFieldDecorator("value", {
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
