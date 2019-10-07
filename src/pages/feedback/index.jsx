import React from "react";
import { PageHeader, Row, Col, Input, Button, Table } from "antd";

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        name: ""
      },
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
        title: "反馈人",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "反馈内容",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
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
    const { data } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="反馈管理"
          extra={[
            <Button key="2" type="primary" onClick={this.onExport}>
              导出
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>反馈人：</label>
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
      </div>
    );
  }
}

export default Feedback;
