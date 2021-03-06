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
import Protocol from "./components/protocol";
import { getActivity, deleteActivity, exportActivity } from "@api/index";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      isShowProtocol: false,
      name: "",
      dataObj: {
        total: 0,
        list: []
      },
      pagination: {
        current: 1,
        pageSize: 10
      },
      editItem: {}
    };
    this.columns = [
      {
        title: "序号",
        width: 60,
        key: "index",
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: "活动banner",
        dataIndex: "imgUrl",
        key: "imgUrl",
        render: (text, record) => (
          <img src={record.imgUrl} alt="" className="avatar"></img>
        )
      },
      {
        title: "活动名称",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "活动类别",
        dataIndex: "type",
        key: "type",
        render: (text, record) => (
          <span>{record.type === "official" ? "官方活动" : "协会活动"}</span>
        )
      },
      {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        render: (text, record) => (
          <span>{moment(record.startTime).format("YYYY-MM-DD")}</span>
        )
      },
      {
        title: "结束时间",
        dataIndex: "endTime",
        key: "endTime",
        render: (text, record) => (
          <span>{moment(record.endTime).format("YYYY-MM-DD")}</span>
        )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
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
  //   获取数据
  getData = () => {
    const { name, pagination } = this.state;
    const params = {
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getActivity(params).then(res => {
      this.setState({
        loading: false,
        dataObj: {
          total: res.total,
          list: res.list
        }
      });
    });
  };

  // 导出
  onExport = () => {
    const { name, pagination } = this.state;
    const params = {
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    exportActivity(params);
  };

  //   显示弹框
  showModal = record => {
    this.setState({
      visible: true,
      editItem: record && record
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
    this.setState({ name: "" }, () => {
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
      content: `确定删除${record.name}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteActivity({ id: record.id }).then(res => {
          message.success("删除成功！");
          this.getData();
        });
      }
    });
  };
  showProtocol = () => {
    this.setState({ isShowProtocol: true });
  };
  hideProtocol = () => {
    this.setState({ isShowProtocol: false });
  };
  render() {
    const { loading, visible,isShowProtocol, dataObj, pagination, editItem } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="活动管理"
          extra={[
            <Button key="1" type="primary" onClick={this.showProtocol}>
              协议
            </Button>,
            <Button key="2" type="info" onClick={this.onExport}>
              导出
            </Button>,
            <Button key="3" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>活动名称：</label>
              <Input
                placeholder="请输入"
                allowClear
                onChange={this.setNameCodition}
              />
            </Col>
            <Col span={6} className="search-opts">
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
            editItem={editItem}
            getData={this.getData}
          />
        )}
        {isShowProtocol && <Protocol handleCancel={this.hideProtocol} />}
      </div>
    );
  }
}

export default Activity;
