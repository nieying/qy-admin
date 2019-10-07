import React from "react";
import { PageHeader, Row, Col, Input, Button, Table, Divider } from "antd";
import AddModal from "./components/add";

class Dialect extends React.Component {
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
          type: 32
        },
        {
          key: "2",
          name: "Jim Green",
          type: 42
        },
        {
          key: "3",
          name: "Joe Black",
          type: 32
        }
      ]
    };
    this.columns = [
      {
        title: "成就名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "成就图标",
        dataIndex: "type",
        key: "type"
      },
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

  render() {
    const { visible, data } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="成就管理"
          extra={[
            <Button key="1" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>成就名称：</label>
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

export default Dialect;
