import React from "react";
import { PageHeader, Button, Table } from "antd";
import AddModal from "./components/add";
import { getUnit } from "@api/index";

class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      name: "",
      languageId: "",
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
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar"></img>
        )
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "备注",
        dataIndex: "languageName",
        key: "languageName"
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
    const { name, languageId, pagination } = this.state;
    const params = {
      name,
      languageId,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getUnit(params).then(res => {
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
  render() {
    const { loading, visible, dataObj, pagination, editItem } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader title="成就管理" extra={[]} />
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

export default Unit;
