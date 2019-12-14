import React from "react";
import { Button, Table, Divider, Modal, message } from "antd";
import { getTaskList, updateTask, deleteTask, approveTask } from "@api/index";
import AddTask from "./AddTask";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
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
        title: "图标",
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar-sm"></img>
        )
      },
      {
        title: "任务名称",
        dataIndex: "title",
        key: "title"
      },
      // {
      //   title: "任务描述",
      //   dataIndex: "detail",
      //   key: "detail"
      // },
      {
        title: "完成情况",
        key: "taskTarget",
        render: (text, record) =>
          record.taskTarget === 100 ? "已完成" : "未完成"
      },
      {
        title: "任务状态",
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
            {record.taskTarget !== 100 &&
              record.taskTarget !==
                "applied"(
                  <span>
                    <Divider type="vertical" />
                    <Button
                      type="link"
                      onClick={() => {
                        this.onUpdate(record);
                      }}
                    >
                      点亮
                    </Button>
                  </span>
                )}
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
  onUpdate = record => {
    Modal.confirm({
      content: `确定标记该${record.title}完成吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        updateTask({ id: record.id, taskTarget: 100 }).then(res => {
          message.success("修改成功");
          this.getData();
        });
      }
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
    getTaskList(params).then(res => {
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
  // 点亮
  onUpdate = record => {
    updateTask({
      id: record.id,
      organizeId: record.organizeId,
      taskTarget: 100
    }).then(res => {
      if (res) {
        message.success("修改成功");
        this.getData();
      }
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
        deleteTask({ id: record.id }).then(res => {
          message.success("删除成功！");
          this.getData();
        });
      }
    });
  };
  // 审核
  approve = record => {
    Modal.confirm({
      content: `确定将该任务审核通过吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        approveTask({ id: record.id, approved: "aip" }).then(res => {
          message.success("审核成功");
          this.getData();
        });
      }
    });
  };

  render() {
    const { loading, dataObj, pagination, visible, editItem } = this.state;
    return (
      <div className="task-list">
        <div className="top-content">
          <h5>任务列表 </h5>
          <Button type="primary" size="small" onClick={this.showModal}>
            新增任务
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
        />
        {visible && (
          <AddTask
            handleCancel={this.handleCancel}
            editItem={editItem}
            getData={this.getData}
          />
        )}
      </div>
    );
  }
}

export default TaskList;
