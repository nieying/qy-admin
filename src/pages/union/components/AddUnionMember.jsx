import React from "react";
import { Modal, Table, message, Input } from "antd";
import { getUsers, dragMember } from "@api/index";

class AddUnionMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataObj: {},
      selectUserIds: [],
      name: "",
      pagination: {
        current: 1,
        pageSize: 10
      }
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
        dataIndex: "username",
        key: "username"
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

  handleInput = e => {
    this.setState({ name: e.target.value });
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
    getUsers(params).then(res => {
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

  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectUserIds: selectedRowKeys });
  };

  handleOk = e => {
    e.preventDefault();
    dragMember({
      organizeId: this.props.id,
      userIds: this.state.selectUserIds
    }).then(res => {
      if (res) {
        message.success("添加成功");
        this.props.handleCancel();
      }
    });
  };

  render() {
    const { dataObj, pagination, selectUserIds } = this.state;
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
        title="添加协会成员"
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Input
          placeholder="输入完成后按enter键搜索"
          onChange={this.handleInput}
          onPressEnter={this.getData}
        />
        <Table
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={dataObj.list}
          rowKey={record => record.id}
          pagination={{
            size: "small",
            total: dataObj.total,
            pageSize: pagination.pageSize,
            showTotal: function() {
              return "共 " + dataObj.total + " 条数据";
            }
          }}
          onChange={this.changePagination}
        />
      </Modal>
    );
  }
}

export default AddUnionMember;
