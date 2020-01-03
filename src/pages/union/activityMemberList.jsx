import React from "react";
import { PageHeader, Button, Table, Divider, Modal, message } from "antd";
import AddActMember from "./components/AddActMember";
import {
  getActivityMember,
  approveActivityMember,
  removeActivityMember
} from "@api/index";
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
        title: "微信头像",
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar-sm"></img>
        )
      },
      {
        title: "用户名称",
        dataIndex: "nickname",
        key: "nickname",
        render: (text, record, index) => record.nickname || record.userName
      },
      {
        title: "状态",
        dataIndex: "approved",
        key: "approved",
        render: (text, record) =>
          // 待审批：applied,审批通过：aip 拒绝：rejected
          record.approved === "applied" ? "待审核" : "已审核"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            {record.approved === "applied" && this.isAdmin && (
              <span>
                <Button
                  type="link"
                  onClick={() => {
                    this.pass(record, "aip");
                  }}
                >
                  审核
                </Button>
                <Divider type="vertical" />
              </span>
            )}
            {record.approved === "applied" && this.isAdmin && (
              <span>
                <Button
                  type="link"
                  onClick={() => {
                    this.pass(record, "rejected");
                  }}
                >
                  拒绝
                </Button>
                <Divider type="vertical" />
              </span>
            )}
            {
              <Button
                type="link"
                onClick={() => {
                  this.del(record);
                }}
              >
                删除
              </Button>
            }
          </span>
        )
      }
    ];
  }
  componentWillMount() {
    var searchParams = new URLSearchParams(this.props.location.search);
    const organizeId = searchParams.get("organizeId");
    const activityId = searchParams.get("activityId");
    const type = searchParams.get("type");
    this.setState({ organizeId, activityId, type });
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
    const { activityId, name, pagination } = this.state;
    const params = {
      name,
      activityId,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getActivityMember(params).then(res => {
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
      content: `确定删除${record.nickname}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        removeActivityMember({
          activityId: this.state.activityId,
          userIds: [record.userId]
        }).then(res => {
          message.success("删除成功！");
          this.getData();
        });
      }
    });
  };
  // 审核 && 拒绝
  pass = (record, approved) => {
    approveActivityMember({
      activityId: this.state.activityId,
      userId: record.userId,
      approved: approved
    }).then(res => {
      message.success(approved === "aip" ? "审核成功！" : "拒绝成功！");
      this.getData();
    });
  };
  render() {
    const {
      organizeId,
      activityId,
      type,
      loading,
      visible,
      dataObj,
      pagination
    } = this.state;
    return (
      <div className="page-union">
        <PageHeader
          title="活动人员"
          extra={[
            <Button
              key="1"
              type="defalut"
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              返回
            </Button>,
            <Button key="2" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
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
            rowKey={record => record.userId || record.id}
            rowClassName={record =>
              record.approved === "applied" ? "bg-tr" : ""
            }
          />
        </div>
        {visible && (
          <AddActMember
            handleCancel={this.handleCancel}
            organizeId={organizeId}
            activityId={activityId}
            type={type}
            getData={this.getData}
          />
        )}
      </div>
    );
  }
}

export default Organize;
