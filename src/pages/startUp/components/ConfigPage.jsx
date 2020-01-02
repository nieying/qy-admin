import React from "react";
import moment from "moment";
import { Button, Table } from "antd";
import EditConfig from "./EditConfig";
import { getConfigList } from "@api/index";

class Startup extends React.Component {
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
        title: "名称",
        dataIndex: "remark",
        key: "remark"
      },
      {
        title: "协会名称",
        dataIndex: "keyValue",
        key: "keyValue",
        render: (text, record) => (
          <span>{record.keyValue ? `${record.keyValue} 元` : "-"}</span>
        )
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
    const { pagination } = this.state;
    const params = {
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getConfigList(params).then(res => {
      if (res) {
        this.setState({
          loading: false,
          dataObj: {
            total: res.total,
            list: res.list.slice(1)
          }
        });
      }
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

  render() {
    const { loading, visible, dataObj, editItem } = this.state;
    return (
      <div className="warpper">
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={dataObj.list}
          pagination={false}
          onChange={this.changePagination}
          rowKey={record => record.id}
        />
        {visible && (
          <EditConfig
            handleCancel={this.handleCancel}
            editItem={editItem}
            getData={this.getData}
          />
        )}
      </div>
    );
  }
}

export default Startup;
