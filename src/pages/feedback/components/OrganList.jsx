import React from "react";
import moment from "moment";
import { Button, Table } from "antd";
import { getOrganFeedback, exportOrganFeedback } from "@api/index";

class ActivityList extends React.Component {
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
      }
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
        title: "协会",
        dataIndex: "organizeName",
        key: "organizeName"
      },
      {
        title: "反馈内容",
        dataIndex: "content",
        key: "content"
      },
      {
        title: "反馈时间",
        key: "add_time",
        render: (text, record) => moment(record.add_time).format("YYYY-MM-DD")
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
    getOrganFeedback(params).then(res => {
      this.setState({
        loading: false,
        dataObj: {
          total: res.total,
          list: res.list
        }
      });
    });
  };

  // 导出
  onExport = () => {
    const { pagination } = this.state;
    const params = {
      page: pagination.current,
      limit: pagination.pageSize
    };
    exportOrganFeedback(params);
  };

  render() {
    const { loading, dataObj, pagination } = this.state;
    return (
      <div className="task-list">
        <div className="table-export">
          <Button key="1" type="info" onClick={this.onExport}>
            导出
          </Button>
        </div>
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={dataObj.list}
          // scroll={{ y: 300 }}
          pagination={{
            size: "small",
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
    );
  }
}

export default ActivityList;
