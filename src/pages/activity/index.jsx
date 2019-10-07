import React from "react";
import { PageHeader, Row, Col, Input, Button, Table, Divider } from "antd";
import AddModal from "./components/add";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        name: ""
      },
      visible: false,
      data: [
        {
          key: "1",
          name: "John Brown",
          type: 32,
          desc: 32
        },
        {
          key: "2",
          name: "Jim Green",
          type: 42,
          desc: 32
        },
        {
          key: "3",
          name: "Joe Black",
          type: 32,
          desc: 32
        }
      ]
    };
    this.columns = [
      {
        title: "活动名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "活动类型",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "活动内容",
        dataIndex: "desc",
        key: "desc"
      },
      // {
      //   title: "活动报名入口",
      //   dataIndex: "type",
      //   key: "type"
      // },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Button type="link">编辑</Button>
            <Divider type="vertical" />
            <Button type="link">删除</Button>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getData();
  }

  //   获取数据
  getData = () => {
    // todo
  };

  //   显示弹框
  showModal = () => {
    this.setState({
      visible: true
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
    this.setState({
      params: {}
    });
  };

  //  导入
  onImport = () => {};

  //  导出
  onExport = () => {};

  render() {
    const { visible, data } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="活动管理"
          extra={[
            <Button key="1" type="primary" onClick={this.onImport}>
              导入
            </Button>,
            <Button key="2" type="primary" onClick={this.onExport}>
              导出
            </Button>,
            <Button key="3" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>活动名称：</label>
              <Input placeholder="请输入" />
            </Col>
            <Col span={6} className="search-opts">
              <Button type="primary" onClick={this.getData}>
                查询
              </Button>
              <Button onClick={this.reset}>重置</Button>
            </Col>
          </Row>
          <Table columns={this.columns} dataSource={data} />
        </div>
        {visible && <AddModal handleCancel={this.handleCancel} />}
      </div>
    );
  }
}

export default Activity;
