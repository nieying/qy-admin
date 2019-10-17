import React from "react";
import { Modal, Form, Input, Icon, Button, Checkbox, message } from "antd";
import { getAnswer, updateAnswer } from "@api/index";
import { formatFormData } from "@utils/constants";

@Form.create()
class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.keys = [1, 2, 3, 4];
    this.state = {
      topicType: "1",
      test: 1
    };
  }

  componentWillMount() {}

  componentDidMount() {
    getAnswer({ subjectId: this.props.id }).then(res => {
      if (res) {
        this.keys = res.list;
        const formObj = {};
        res.list.forEach((item, index) => {
          formObj[`subjectId_${index}`] = item.subjectId;
          formObj[`id_${index}`] = item.id;
          formObj[`answer_${index}`] = item.answer;
          formObj[`right_${index}`] = item.right;
        });
        this.props.form.setFieldsValue({ ...formObj });
      }
    });
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const params = formatFormData(values);
      params.forEach(item => {
        if (item.right === undefined) {
          item.right = 0;
        }
        if (item.right === true) {
          item.right = 1;
        }
        if (item.subjectId === undefined) {
          item.subjectId = this.props.id;
        }
      });
      if (!err) {
        updateAnswer(params).then(res => {
          if (res) {
            message.success("编辑成功");
            this.props.handleCancel();
            this.props.getData();
          }
        });
      }
    });
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
    const { id, form } = this.props;
    const keys = form.getFieldValue("keys");
    const addKey = [{ subjectId: id, answer: "", right: false }];
    const nextKeys = keys.concat(addKey);
    this.keys = keys.concat(addKey);
    form.setFieldsValue({
      keys: nextKeys
    });
  };
  handleCheckBox = (e, k, index) => {
    this.setState({ test: 10 }, () => {
      this.keys[index].right = e.target.checked;
      this.props.form.setFieldsValue({
        [`right_${index}`]: e.target.checked
      });
    });
    // this.keys.forEach((a, i) => {
    //   if (a.id === k.id) {
    //     a.right = e.target.checked;
    //     this.props.form.setFieldsValue({
    //       [`right_${i}`]: e.target.checked
    //     });
    //   } else {
    //     a.right = 0;
    //     this.props.form.setFieldsValue({ [`right_${i}`]: false });
    //   }
    // });
  };

  rendFormItem = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    getFieldDecorator("keys", { initialValue: this.keys });
    let keys = getFieldValue("keys");
    return (
      keys &&
      keys.map((k, index) => (
        <div style={{ display: "flex" }} key={index}>
          <Form.Item {...formItemLayout} style={{ display: "none" }}>
            {getFieldDecorator(`subjectId_${index}`)(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ display: "none" }}>
            {getFieldDecorator(`id_${index}`)(<Input />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={`选项${index + 1}`}
            required={false}
            style={{ flex: 1 }}
          >
            {getFieldDecorator(`answer_${index}`, {
              // initialValue: `${`answer_${index}`}`,
              rules: [{ required: true, message: "请输入" }]
            })(
              <Input
                placeholder="请输入"
                // value={`${`answer_${index}`}`}
                style={{ width: "60%", marginRight: 8 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(`right_${index}`, {})(
              <div className="answer-check">
                <Checkbox
                  checked={k.right}
                  onChange={e => {
                    this.handleCheckBox(e, k, index);
                  }}
                ></Checkbox>
                {keys.length > 1 ? (
                  <Icon
                    style={{ marginLeft: 30 }}
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(k)}
                  />
                ) : null}
              </div>
            )}
          </Form.Item>
        </div>
      ))
    );
  };

  render() {
    const { getFieldValue } = this.props.form;
    let keys = getFieldValue("keys");
    return (
      <Modal
        title={"编辑"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        {/* {this.state.test} */}
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {this.rendFormItem()}
          {keys && keys.length < 5 && (
            <Form.Item>
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> 新增答题选项
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}

export default AddAnswer;
