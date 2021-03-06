import React from "react";
import moment from "moment";
import { PageHeader, Row, Col, Input, Button, Table } from "antd";
import { getVipUsers, exportVip } from "@api/index";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      mobile: "",
      dataObj: {
        total: 0,
        list: []
      },
      pagination: {
        current: 1,
        pageSize: 10
      }
    };
    this.columns = [
      {
        title: "序号",
        width: 60,
        key: "index",
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: "头像",
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar"></img>
        )
      },
      {
        title: "微信昵称",
        dataIndex: "nickname",
        key: "nickname"
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        render: (text, record) => <span>{record.gender ? "男" : "女"}</span>
      },
      {
        title: "手机号码",
        dataIndex: "mobile",
        key: "mobile"
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
    const { name, mobile, pagination } = this.state;
    const params = {
      name,
      mobile,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getVipUsers(params).then(res => {
      res &&
        this.setState({
          loading: false,
          dataObj: {
            total: res.total,
            list: res.list
          }
        });
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
  // 设置查询
  setMobileCodition = e => {
    this.setState({ mobile: e.target.value });
  };
  // 导出
  onExport = () => {
    const { name, pagination } = this.state;
    const params = {
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    exportVip(params);
  };
  render() {
    const { loading, dataObj, pagination } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="会员管理"
          extra={[
            <Button key="1" type="info" onClick={this.onExport}>
              导出
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>用户名称：</label>
              <Input
                placeholder="请输入"
                allowClear
                onChange={this.setNameCodition}
              />
            </Col>
            <Col span={6}>
              <label>手机号码：</label>
              <Input
                placeholder="请输入"
                allowClear
                onChange={this.setMobileCodition}
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
      </div>
    );
  }
}

export default User;
