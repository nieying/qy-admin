import React from "react";
import { Modal, Form, Input, Icon, Button, Checkbox, message } from "antd";
import { getAnswer, updateAnswer } from "@api/index";
import { formatFormData } from "@utils/constants";
import UploadImg from "@components/UploadImg";

@Form.create()
class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    // this.keys = [];
    this.state = {
      keys: [],
      topicType: props.topicType || "normal"
    };
  }

  componentWillMount() {}

  componentDidMount() {
    getAnswer({ subjectId: this.props.id }).then(res => {
      if (res) {
        this.setState({ keys: res.list });
        // const formObj = {};
        // res.list.forEach((item, index) => {
        //   formObj[`subjectId_${index}`] = item.subjectId;
        //   formObj[`id_${index}`] = item.id;
        //   formObj[`answer_${index}`] = item.answer;
        //   formObj[`right_${index}`] = item.right;
        // });
        // setTimeout(() => {
        //   this.props.form.setFieldsValue({ ...formObj });
        // }, 100);
      }
    });
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const params = formatFormData(values);
      params.forEach(item => {
        if (!item.right) {
          item.right = 0;
        } else {
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
    // const { form } = this.props;
    const { keys } = this.state;
    // const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    this.setState({ keys: keys.filter(key => key !== k) });

    // form.setFieldsValue({
    //   keys: keys.filter(key => key !== k)
    // });
  };

  add = () => {
    const { id, form } = this.props;
    // const keys = form.getFieldValue("keys");
    const addKey = [{ subjectId: id, answer: "", right: false }];
    // const nextKeys = keys.concat(addKey);
    // this.keys = keys.concat(addKey);
    this.setState({ keys: this.state.keys.concat(addKey) });
    // form.setFieldsValue({
    //   keys: nextKeys
    // });
  };
  handleCheckBox = (e, k, index) => {
    const { keys } = this.state;
    // this.setState({ test: 10 }, () => {
    keys[index].right = e.target.checked;
    // this.props.form.setFieldsValue({
    //   [`right_${index}`]: e.target.checked
    // });
    this.setState({ keys });
    // });
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
    const { topicType } = this.state;
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue
    } = this.props.form;
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
    getFieldDecorator("keys", { initialValue: this.state.keys });
    let keys = getFieldValue("keys");
    console.log("keys", keys);
    return (
      keys &&
      keys.map((k, index) => (
        <div style={{ display: "flex" }} key={index}>
          <Form.Item {...formItemLayout} style={{ display: "none" }}>
            {getFieldDecorator(`subjectId_${index}`, {
              initialValue: k.subjectId
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ display: "none" }}>
            {getFieldDecorator(`id_${index}`, { initialValue: k.id })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={`选项${index + 1}`}
            required={false}
            style={{ flex: 1 }}
          >
            {topicType === "picture"
              ? getFieldDecorator(`answer_${index}`, {
                  initialValue: k.answer,
                  rules: [{ required: true, message: "请上传图片" }]
                })(
                  <UploadImg
                    setValue={value => {
                      setFieldsValue({
                        [`answer_${index}`]: value
                      });
                    }}
                  />
                )
              : getFieldDecorator(`answer_${index}`, {
                  initialValue: k.answer,
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
    // const { getFieldValue } = this.props.form;
    const { keys } = this.state;
    return (
      <Modal
        title={"编辑"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {this.rendFormItem()}
          {keys && keys.length < 4 && (
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
