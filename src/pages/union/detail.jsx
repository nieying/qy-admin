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
import { getOrganize, deleteOrganize, exportOrganize } from "@api/index";
import Info from "./components/Info";
import MemberList from "./components/MemberList";
import TaskList from "./components/TaskList";

class UnionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      name: "",
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
        title: "协会图标",
        key: "avatar",
        render: (text, record) => (
          <img src={record.avatar} alt="" className="avatar"></img>
        )
      },
      {
        title: "协会名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "会长名称",
        dataIndex: "leaderName",
        key: "leaderName"
      },
      {
        title: "微信昵称",
        dataIndex: "leaderWeixinName",
        key: "leaderWeixinName"
      },
      {
        title: "描述",
        dataIndex: "remark",
        key: "remark"
      },
      {
        title: "属性",
        dataIndex: "attribute",
        key: "attribute"
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
                this.props.history.push("/union/detail");
              }}
            >
              详情
            </Button>
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
  // 导出
  onExport = () => {
    const { name, pagination } = this.state;
    const params = {
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    exportOrganize(params);
  };
  //   获取数据
  getData = () => {
    const { name, pagination } = this.state;
    const params = {
      name,
      page: pagination.current,
      limit: pagination.pageSize
    };
    this.setState({ loading: true });
    getOrganize(params).then(res => {
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

  render() {
    const { loading, visible, dataObj, pagination, editItem } = this.state;
    return (
      <div className="page-detail">
        <PageHeader title="协会详情" />
        <div className="warpper">
          <Info />
          <MemberList />
          <TaskList />
        </div>
      </div>
    );
  }
}

export default UnionDetail;
