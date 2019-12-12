import React from "react";
import moment from "moment";
import { PageHeader, Row, Col, Tabs, Button, Table } from "antd";
import { getFeedback, getOrganFeedback } from "@api/index";
import OrganList from "./components/OrganList";
import TopicList from "./components/TopicList";

const { TabPane } = Tabs;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
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
    return (
      <div className="page-detail">
        <PageHeader title="反馈管理" extra={[]} />
        <div className="warpper">
          <Tabs defaultActiveKey="1">
            <TabPane tab="题目反馈" key="1">
              <TopicList {...this.props} />
            </TabPane>
            <TabPane tab="协会反馈" key="2">
              <OrganList {...this.props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default User;
