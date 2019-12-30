import React from "react";
import moment from "moment";
import { Button, Table, Divider, Modal, message } from "antd";
import { getActivity, deleteActivity, approveActivity } from "@api/index";
import AddActivity from "./AddActivity";
import ActivityMember from "./ActivityMember";

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      showMemberList: false,
      activityId: null,
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
        title: "活动banner",
        dataIndex: "imgUrl",
        key: "imgUrl",
        render: (text, record) => (
          <img src={record.imgUrl} alt="" className="avatar-sm"></img>
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
        title: "活动状态",
        key: "approved",
        render: (text, record) =>
          // 待审批：applied,审批通过：aip 拒绝rejected
          record.approved === "applied" ? "待审核" : "已审核"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            {record.approved === "applied" && this.isAdmin && (
              <Button
                type="link"
                onClick={() => {
                  this.approve(record);
                }}
              >
                审核
              </Button>
            )}
            {record.approved !== "applied" && (
              <span>
                <Button
                  type="link"
                  onClick={() => {
                    this.showMemberModal(record);
                  }}
                >
                  设置人员
                </Button>
                <Divider type="vertical" />
              </span>
            )}

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
    const { pagination } = this.state;
    const params = {
      organizeId: this.props.id,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getActivity(params).then(res => {
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

  //   隐藏弹框
  handleCancelMember = () => {
    this.setState({
      showMemberList: false
    });
  };
  showMemberModal = record => {
    this.setState({
      activityId: record.id,
      showMemberList: true
    });
  };
  //   隐藏弹框
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  showModal = record => {
    this.setState({
      editItem:
        record && record.organizeId ? record : { organizeId: this.props.id },
      visible: true
    });
  };

  // 删除
  del = record => {
    Modal.confirm({
      content: `确定删除${record.title}吗？`,
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
  // 审核
  approve = record => {
    Modal.confirm({
      content: `确定将该活动审核通过吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        approveActivity({ id: record.id, approved: "aip" }).then(res => {
          message.success("审核成功！");
          this.getData();
        });
      }
    });
  };

  render() {
    const {
      loading,
      dataObj,
      pagination,
      visible,
      editItem,
      showMemberList,
      activityId
    } = this.state;
    const { id } = this.props;
    return (
      <div className="task-list">
        <div className="top-content">
          <h5>活动列表 </h5>
          <Button type="primary" size="small" onClick={this.showModal}>
            新增活动
          </Button>
        </div>
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={dataObj.list}
          // scroll={{ y: 300 }}
          pagination={{
            size: "small",
            total: dataObj.total,
            pageSize: pagination.pageSize,
            showTotal: function() {
              return "共 " + dataObj.total + " 条数据";
            }
          }}
          onChange={this.changePagination}
          rowKey={record => record.id}
          rowClassName={record =>
            record.approved === "applied" ? "bg-tr" : ""
          }
        />
        {visible && (
          <AddActivity
            handleCancel={this.handleCancel}
            organizeId={id}
            editItem={editItem}
            getData={this.getData}
          />
        )}
        {showMemberList && (
          <ActivityMember
            handleCancel={this.handleCancelMember}
            organizeId={id}
            activityId={activityId}
            getData={this.getData}
          />
        )}
      </div>
    );
  }
}

export default ActivityList;
