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
import { getActivity, deleteActivity } from "@api/index";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      name: "",
      dataObj: {
        total: 0,
        list: []
      },
      pagination: {
        current: 1,
        pageSize: 2
      },
      editItem: {}
    };
    this.columns = [
      {
        title: "活动名称",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "活动类别",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "活动详情",
        dataIndex: "detail",
        key: "detail"
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
  render() {
    const { loading, visible, dataObj, pagination, editItem } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="活动管理"
          extra={[
            // <Button key="1" type="primary">
            //   导入
            // </Button>,
            // <Button key="2" type="primary">
            //   导出
            // </Button>,
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
      </div>
    );
  }
}

export default Activity;
