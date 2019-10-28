import React from "react";
import { PageHeader, Button, Table } from "antd";
import AddModal from "./components/add";
import { getGardeList } from "@api/index";

class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      dataObj: {
        total: 0,
        list: []
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
    this.setState({ loading: true });
    getGardeList().then(res => {
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
    /**
     * bigRich,
     * bigWinner,
     * exactPrize,
     * actTimes,
     * languageProveList,
     * languageProcess,
     * smallFire,
     * mediumFire,
     * maxFire
     */

    if (record && record.type === "grade_key_bigRich") {
      record.configList = [record.config.grade_rich_level_a]
        .concat([record.config.grade_rich_level_b])
        .concat([record.config.grade_rich_level_c])
        .concat([record.config.grade_rich_level_d])
        .concat([record.config.grade_rich_level_e]);
      record.showItem = true;
    }
    if (record && record.type === "grade_key_bigWinner") {
      record.configList = [record.config.grade_winner_level_a]
        .concat([record.config.grade_winner_level_b])
        .concat([record.config.grade_winner_level_c])
        .concat([record.config.grade_winner_level_d])
        .concat([record.config.grade_winner_level_e]);
      record.showItem = true;
    }
    console.log("res", record);
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
    const { loading, visible, dataObj, editItem } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader title="成就管理" extra={[]} />
        <div className="warpper">
          <Table
            loading={loading}
            columns={this.columns}
            dataSource={dataObj.list}
            rowKey={record => record.type}
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
