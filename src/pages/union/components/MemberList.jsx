import React from "react";
import { Button, Table, Divider, Modal, message } from "antd";
import { getMemberList, quitOrganize } from "@api/index";

class MemberList extends React.Component {
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
        title: "微信头像",
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar-sm"></img>
        )
      },
      {
        title: "用户名称",
        dataIndex: "userName",
        key: "userName"
      },
      {
        title: "标签",
        dataIndex: "tag",
        key: "tag"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            {/* <Button
              type="link"
              onClick={() => {
                this.showModal(record);
              }}
            >
              设置标签
            </Button>
            <Divider type="vertical" /> */}
            <Button
              type="link"
              onClick={() => {
                this.kickOut(record);
              }}
            >
              踢出协会
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
    getMemberList(params).then(res => {
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

  // 踢出协会
  kickOut = record => {
    Modal.confirm({
      content: `确定踢出${record.userName}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        quitOrganize({
          userId: record.userId,
          organizeId: record.organizeId
        }).then(res => {
          message.success("踢出成功！");
          this.getData();
        });
      }
    });
  };

  render() {
    const { loading, visible, dataObj, pagination, editItem } = this.state;
    return (
      <div className="member-list">
        <h5>成员列表</h5>
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
      </div>
    );
  }
}

export default MemberList;
