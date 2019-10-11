import React from "react";
import moment from "moment";
import {
  PageHeader,
  Row,
  Col,
  Input,
  Button,
  Table,
  Divider,
  Modal,
  message
} from "antd";
import AddModal from "./components/add";
import SelectDialect from "@components/SelectDialect";
import { getUnit, deleteUnit } from "@api/index";

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
        pageSize: 2
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
        title: "单元名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "所属方言",
        dataIndex: "languageId",
        key: "languageId"
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
            <Divider type="vertical" />
            <Button
              type="link"
              onClick={() => {
                this.del(record);
              }}
            >
              删除
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
  // 删除
  del = record => {
    Modal.confirm({
      content: `确定删除${record.name}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteUnit({ id: record.id }).then(res => {
          message.success("删除成功！");
          this.getData();
        });
      }
    });
  };
  render() {
    const { loading, visible, dataObj, pagination, editItem } = this.state;
    return (
      <div className="page-dialect">
        <PageHeader
          title="单元管理"
          extra={[
            <Button key="1" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>单元名称：</label>
              <Input
                placeholder="请输入"
                allowClear
                onChange={this.setNameCodition}
              />
            </Col>
            <Col span={6}>
              <label>所属方言：</label>
              <SelectDialect
                setValue={value => {
                  this.setState({
                    languageId: value
                  });
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
