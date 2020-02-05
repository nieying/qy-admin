import React from "react";
import moment from "moment";
import { Button, Table, Switch, message } from "antd";
import EditConfig from "./EditConfig";
import { getConfigList, updateConfig } from "@api/index";

class Startup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      payObj: null,
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
        title: "金额",
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
          payObj: res.list.filter(item => {
            return item.keyName === "talkinn_switch_pay";
          })[0],
          dataObj: {
            total: res.total,
            list: res.list.filter(item => {
              return (
                item.keyName === "talkinn_price_join_organize" ||
                item.keyName === "talkinn_price_join_activity"
              );
            }),
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

  onChangeSwitch = val => {
    updateConfig({ id: this.state.payObj.id, value: val ? 1 : 0 }).then(res => {
      message.success("编辑成功");
    });
  };

  render() {
    const { loading, visible, dataObj, editItem, payObj } = this.state;
    if (!payObj) {
      return null;
    }
    return (
      <div className="warpper">
        <div style={{ marginBottom: 20 }}>
          是否打开支付：
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            onChange={this.onChangeSwitch}
            defaultChecked={parseInt(payObj.keyValue) === 0 ? false : true}
          />
        </div>
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
