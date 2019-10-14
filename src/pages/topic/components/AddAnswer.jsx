import React from "react";
import { Modal, Form, Input, Icon, Button, Checkbox, message } from "antd";
import { createSubject, updateSubject, getSubjectInfo } from "@api/index";
import { formatFormData } from "@utils/constants";

let n = 100;

@Form.create()
class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.keys = [];
    this.state = {
      topicType: "1",
      test: 1,
      answerList: [
        { id: 1, title: "选项一", right: false },
        { id: 2, title: "选项二", right: false },
        { id: 3, title: "选项三", right: true },
        { id: 4, title: "选项四", right: false }
      ]
    };
  }

  componentWillMount() {
    this.keys = this.state.answerList;
  }

  componentDidMount() {
    const { answerList } = this.state;
    const formObj = {};
    // this.postSubjectInfo();
    answerList.forEach((item, index) => {
      formObj[`title_${index}`] = item.title;
      formObj[`right_${index}`] = item.right;
    });
    this.props.form.setFieldsValue({ ...formObj });
  }

  postSubjectInfo = () => {
    getSubjectInfo({ id: this.props.topicId }).then(res => {
      res && console.log(res);
    });
  };
  handleOk = e => {
    const { topicId } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const params = formatFormData(values);
      params.forEach(item => {
        if (item.right === undefined) {
          item.right = false;
        }
      });
      console.log(params, values);
      // if (!err) {
      //   values.subjectId = topicId;
      //   topicId ? this.update(values) : this.create(values);
      // }
    });
  };
  update = values => {
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
    const { topicId } = this.props;
    message.success(topicId ? "编辑成功" : "添加成功");
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
    const addKey = [{ title: "", right: false }];
    const nextKeys = keys.concat(addKey);
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
          <Form.Item
            {...formItemLayout}
            label={`选项${index + 1}`}
            required={false}
            style={{ flex: 1 }}
          >
            {getFieldDecorator(`title_${index}`, {
              rules: [{ required: true, message: "请输入" }]
            })(
              <Input
                placeholder="请输入"
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
    const { topicId } = this.props;
    const { getFieldValue } = this.props.form;
    let keys = getFieldValue("keys");
    return (
      <Modal
        title={!topicId ? "编辑" : "新增"}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        {this.state.test}
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
