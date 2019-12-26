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
  message,
  Popover
} from "antd";
import AddModal from "./components/add";
import AddUnionMember from "./components/AddUnionMember";
import { getOrganize, deleteOrganize, exportOrganize } from "@api/index";
import "./index.scss";
class Organize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      isShowAddMemberModal: false,
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
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    this.columns = [
      {
        title: "序号",
        width: 60,
        key: "index",
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: "协会图标",
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar"></img>
        )
      },
      {
        title: "协会名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "会长名称",
        key: "leaderName",
        render: (text, record) => {
          if (this.isAdmin) {
            return (
              <span>
                <Popover
                  content={
                    <div>
                      <p>账号：{record.code}</p>
                      <p>密码：{record.password_text}</p>
                    </div>
                  }
                  // title="Title"
                  trigger="click"
                >
                  <Button type="link">{record.leaderName}</Button>
                </Popover>
              </span>
            );
          } else {
            return <span>{record.leaderName}</span>;
          }
        }
      },
      {
        title: "微信昵称",
        dataIndex: "leaderWeixinName",
        key: "leaderWeixinName"
      },
      // {
      //   title: "描述",
      //   dataIndex: "remark",
      //   key: "remark"
      // },
      // {
      //   title: "属性",
      //   dataIndex: "attribute",
      //   key: "attribute"
      // },
      {
        title: "创建时间",
        key: "addTime",
        render: (text, record) => moment(record.addTime).format("YYYY-MM-DD")
      },
      // {
      //   title: "修改时间",
      //   key: "updateTime",
      //   render: (text, record) => moment(record.updateTime).format("YYYY-MM-DD")
      // },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            {this.isAdmin && (
              <span>
                <Button
                  type="link"
                  onClick={() => {
                    this.showAddMemberModal(record);
                  }}
                >
                  添加人员
                </Button>
                <Divider type="vertical" />
              </span>
            )}
            <Button
              type="link"
              onClick={() => {
                this.props.history.push(`/union/detail?id=${record.id}`);
              }}
            >
              详情
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
  // 导出
  onExport = () => {
    const { name, pagination } = this.state;
    const params = {
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    exportOrganize(params);
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
    getOrganize(params).then(res => {
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
  showModal = record => {
    this.setState({
      visible: true,
      editItem: record && record
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  showAddMemberModal = record => {
    this.setState({
      isShowAddMemberModal: true,
      editItem: record && record
    });
  };
  hideAddMemberModal = () => {
    this.setState({
      isShowAddMemberModal: false
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
        deleteOrganize({ id: record.id }).then(res => {
          message.success("删除成功！");
          this.getData();
        });
      }
    });
  };
  render() {
    const {
      loading,
      visible,
      dataObj,
      pagination,
      editItem,
      isShowAddMemberModal
    } = this.state;
    return (
      <div className="page-union">
        <PageHeader
          title="协会管理"
          extra={[
            <Button key="1" type="info" onClick={this.onExport}>
              导出
            </Button>,
            <Button key="2" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>协会名称：</label>
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
        {isShowAddMemberModal && (
          <AddUnionMember
            handleCancel={this.hideAddMemberModal}
            id={editItem.id}
          />
        )}
      </div>
    );
  }
}

export default Organize;
