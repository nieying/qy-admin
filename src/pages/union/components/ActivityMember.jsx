import React from "react";
import { Modal, Table, message } from "antd";
import { getMemberList, updateOgranActState } from "@api/index";

class ActivityMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataObj: {},
      selectUserIds: []
    };
    this.columns = [
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
        key: "tag",
        render: (text, record) => {
          if (record.role === "owner") {
            return "会长";
          } else {
            return record.rank;
          }
        }
      },
      {
        title: "状态",
        key: "state",
        render: (text, record) => {
          if (record.state === 2) {
            return "成员";
          } else if (record.state === 1) {
            return "待审核";
          } else if (record.state === 0) {
            return "待支付";
          }
        }
      }
    ];
  }

  componentDidMount() {
    this.getData();
  }

  //   获取数据
  getData = () => {
    const params = {
      organizeId: this.props.organizeId,
      page: 1,
      limit: 10000
    };
    this.setState({ loading: true });
    getMemberList(params).then(res => {
      let selectUserIds = [];
      if (res) {
        res.list.filter(d => {
          if (d.activityState) {
            selectUserIds.push(d.id);
          }
        });
        this.setState({
          selectUserIds: selectUserIds,
          loading: false,
          dataObj: {
            total: res.total,
            list: res.list
          }
        });
      }
    });
  };

  onChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    this.setState({ selectUserIds: selectedRowKeys });
  };

  handleOk = e => {
    e.preventDefault();
    updateOgranActState({
      organizeId: this.props.organizeId,
      memberIds: this.state.selectUserIds
    }).then(res => {
      if (res) {
        message.success("设置成功");
        this.props.handleCancel();
      }
    });
  };

  render() {
    const { dataObj, selectUserIds } = this.state;
    const rowSelection = {
      selectedRowKeys: selectUserIds,
      onChange: this.onChange,
      getCheckboxProps: record => ({
        disabled: record.role === "role",
        name: record.name
      })
    };
    return (
      <Modal
        title="设置活动参与人员"
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Table
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={dataObj.list}
          rowKey={record => record.id}
          pagination={false}
        />
      </Modal>
    );
  }
}

export default ActivityMember;
