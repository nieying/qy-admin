import React from "react";
import moment from "moment";
import {
  PageHeader,
  Row,
  Col,
  Input,
  Button,
  Table,
  Divider,
  Modal,
  message
} from "antd";
import AddModal from "./components/add";
import AddAnswer from "./components/AddAnswer";
import SelectTopicType from "@components/SelectTopicType";
import SelectDialect from "@components/SelectDialect";
import SelectUnit from "@components/SelectUnit";

import { getSubject, deleteSubject } from "@api/index";
class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      showAnswer: false,
      languageId: "",
      unitId: "",
      name: "",
      type: "",
      dataObj: {
        total: 0,
        list: []
      },
      pagination: {
        current: 1,
        pageSize: 10
      },
      topicId: "",
      topicType: ""
    };
    this.columns = [
      {
        title: "序号",
        width: 60,
        key: "index",
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: "题目名称",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "题目类型",
        dataIndex: "type",
        key: "type",
        render: (text, record) => this.rendType(record.type)
      },
      {
        title: "所属方言",
        dataIndex: "languageName",
        key: "languageName"
      },
      {
        title: "所属单元",
        dataIndex: "unitName",
        key: "unitName"
      },
      {
        title: "是否启用",
        dataIndex: "state",
        key: "state",
        render: (text, record) => <span>{record.state ? "启用" : "禁用"}</span>
      },
      {
        title: "创建时间",
        key: "addTime",
        render: (text, record) => moment(record.addTime).format("YYYY-MM-DD")
      },
      {
        title: "修改时间",
        key: "updateTime",
        render: (text, record) => moment(record.updateTime).format("YYYY-MM-DD")
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              type="link"
              onClick={() => {
                this.showAnswerModal(record);
              }}
            >
              答题选项
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              onClick={() => {
                this.showModal(record);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />

            <Button
              type="link"
              onClick={() => {
                this.del(record);
              }}
            >
              删除
            </Button>
          </span>
        )
      }
    ];
  }
  componentDidMount() {
    this.getData();
  }
  changePagination = pagination => {
    this.setState({ pagination }, () => {
      this.getData();
    });
  };
  rendType = type => {
    switch (type) {
      case "normal":
        return "防伪标题";
      case "auto":
        return "听力题";
      case "map":
        return "看图题";
      default:
        return "选图题";
    }
  };
  //   获取数据
  getData = () => {
    const { languageId, unitId, type, name, pagination } = this.state;
    const params = {
      languageId,
      unitId,
      type,
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getSubject(params).then(res => {
     res && this.setState({
        loading: false,
        dataObj: {
          total: res.total,
          list: res.list
        }
      });
    });
  };
  //   显示弹框
  showModal = record => {
    this.setState({
      visible: true,
      topicId: record && record.id
    });
  };
  //   隐藏弹框
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  //   重置
  reset = () => {
    this.setState({ name: "", unitId: "" }, () => {
      this.getData();
    });
  };
  // 设置查询
  setNameCodition = e => {
    this.setState({ name: e.target.value });
  };
  // 删除
  del = record => {
    Modal.confirm({
      content: `确定删除${record.title}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteSubject({ id: record.id }).then(res => {
          message.success("删除成功！");
          this.getData();
        });
      }
    });
  };
  showAnswerModal = record => {
    this.setState({
      showAnswer: true,
      topicId: record.id,
      topicType: record.type
    });
  };
  hideAnswerModal = () => {
    this.setState({ showAnswer: false });
  };

  handleSelectTopic = val => {
    this.setState({ type: val }, () => {
      this.getData();
    });
  };
  render() {
    const {
      loading,
      visible,
      showAnswer,
      dataObj,
      pagination,
      topicId,
      name,
      type,
      topicType,
      languageId,
      unitId
    } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="单元管理"
          extra={[
            <Button key="1" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={5}>
              <label>题目类型：</label>
              <SelectTopicType value={type} setValue={this.handleSelectTopic} />
            </Col>
            <Col span={5}>
              <label>题目名称：</label>
              <Input
                value={name}
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
              />
            </Col>
            <Col span={5}>
              <label>所属方言：</label>
              <SelectDialect
                value={languageId}
                setValue={value => {
                  this.setState({
                    languageId: value
                  });
                }}
              />
            </Col>
            <Col span={5}>
              <label>单元名称：</label>
              <SelectUnit
                languageId={languageId}
                value={unitId}
                setValue={value => {
                  this.setState({ unitId: value });
                }}
              />
            </Col>
            <Col span={4} className="search-opts">
              <Button type="primary" onClick={this.getData}>
                查询
              </Button>
              <Button onClick={this.reset}>重置</Button>
            </Col>
          </Row>
          <Table
            loading={loading}
            columns={this.columns}
            dataSource={dataObj.list}
            pagination={{
              total: dataObj.total,
              pageSize: pagination.pageSize,
              showTotal: function() {
                return "共 " + dataObj.total + " 条数据";
              }
            }}
            onChange={this.changePagination}
            rowKey={record => record.id}
          />
        </div>
        {visible && (
          <AddModal
            handleCancel={this.handleCancel}
            id={topicId}
            getData={this.getData}
          />
        )}
        {showAnswer && (
          <AddAnswer
            handleCancel={this.hideAnswerModal}
            id={topicId}
            topicType={topicType}
            getData={this.getData}
          />
        )}
      </div>
    );
  }
}

export default Subject;
