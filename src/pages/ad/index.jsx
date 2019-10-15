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
  message,
  Switch
} from "antd";
import AddModal from "./components/add";
import { getAdvert, updateAdvert, deleteAdvert } from "@api/index";

class Advert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      title: "",
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
        title: "广告图片",
        key: "imgUrl",
        render: (text, record) => (
          <img src={record.imgUrl} alt="" className="avatar"></img>
        )
      },
      {
        title: "广告标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "广告内容",
        dataIndex: "type",
        key: "type"
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
        title: "是否启用",
        key: "state",
        render: (text, record) => (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked={record.state ? true : false}
            onChange={e => {
              this.handleState(e, record);
            }}
          />
        )
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
    const { title, pagination } = this.state;
    const params = {
      title,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getAdvert(params).then(res => {
      res &&
        this.setState({
          loading: false,
          dataObj: {
            total: res.total,
            list: res.list
          }
        });
    });
  };
  // 启用禁用
  handleState = (state, record) => {
    updateAdvert({ id: record.id, state: state ? 1 : 0 }).then(res => {
      res && message.success(state ? "启用成功！" : "禁用成功");
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
    this.setState({ title: "" }, () => {
      this.getData();
    });
  };
  // 设置查询
  setNameCodition = e => {
    this.setState({ title: e.target.value });
  };
  // 删除
  del = record => {
    Modal.confirm({
      content: `确定删除${record.title}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteAdvert({ id: record.id }).then(res => {
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
          title="广告管理"
          extra={[
            <Button key="1" type="primary" onClick={this.showModal}>
              新增
            </Button>
          ]}
        />
        <div className="warpper">
          <Row gutter={30} className="search-condition">
            <Col span={6}>
              <label>广告：</label>
              <Input
                placeholder="请输入"
                allowClear
                onChange={this.setNameCodition}
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

export default Advert;
