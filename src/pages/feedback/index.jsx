import React from "react";
import moment from "moment";
import { PageHeader, Row, Col, Input, Button, Table } from "antd";
import { getFeedback } from "@api/index";
import SelectDialect from "@components/SelectDialect";
import SelectUnit from "@components/SelectUnit";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      languageId: "",
      unitId: "",
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
        title: "反馈人",
        dataIndex: "nickName",
        key: "nickName"
      },
      {
        title: "方言",
        dataIndex: "languageName",
        key: "languageName"
      },
      {
        title: "单元",
        dataIndex: "unitName",
        key: "unitName"
      },
      {
        title: "反馈内容",
        dataIndex: "content",
        key: "content"
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
      }
      // {
      //   title: "操作",
      //   key: "action",
      //   render: (text, record) => (
      //     <span>
      //       <Button
      //         type="link"
      //         onClick={() => {
      //           this.showModal(record);
      //         }}
      //       >
      //         编辑
      //       </Button>
      //       <Divider type="vertical" />
      //       <Button
      //         type="link"
      //         onClick={() => {
      //           this.del(record);
      //         }}
      //       >
      //         删除
      //       </Button>
      //     </span>
      //   )
      // }
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
    const { languageId, unitId, pagination } = this.state;
    const params = {
      languageId,
      unitId,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getFeedback(params).then(res => {
      this.setState({
        loading: false,
        dataObj: {
          total: res.total,
          list: res.list
        }
      });
    });
  };
  // 重置
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
    const { languageId, unitId, loading, dataObj, pagination } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader title="反馈管理" extra={[]} />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
          <Col span={6}>
              <label>所属方言：</label>
              <SelectDialect
                value={languageId}
                setValue={value => {
                  this.setState({
                    languageId: value
                  });
                }}
              />
            </Col>
            <Col span={6}>
              <label>单元名称：</label>
              <SelectUnit
                languageId={languageId}
                value={unitId}
                setValue={value => {
                  this.setState({ unitId: value });
                }}
              />
            </Col>
            <Col span={6} className="search-opts">
              <Button type="primary" onClick={this.getData}>
                查询
              </Button>
              <Button onClick={this.reset}>重置</Button>
            </Col>
          </Row>
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
      </div>
    );
  }
}

export default User;
