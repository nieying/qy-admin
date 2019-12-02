import React from "react";
import { Button, Table, Divider, Modal, message } from "antd";
import { getGardeList } from "@api/index";
import AddTask from "./AddTask";

class Organize extends React.Component {
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
    this.columns = [
      {
        title: "序号",
        width: 60,
        key: "index",
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: "图标",
        key: "image",
        render: (text, record) => (
          <img src={record.image} alt="" className="avatar"></img>
        )
      },
      {
        title: "名称",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark"
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
            <Button
              type="link"
              onClick={() => {
                this.showModal(record);
              }}
            >
              点亮
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
    getGardeList(params).then(res => {
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
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  showModal = record => {
    this.setState({
      editItem: record ? record : {},
      visible: true
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

export default Organize;