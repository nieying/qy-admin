import React from "react";
import { PageHeader, Tabs, Button } from "antd";
import OrganList from "./components/OrganList";
import TopicList from "./components/TopicList";

const { TabPane } = Tabs;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "subject"
    };
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

  handleTab = e => {
    this.setState({
      currentTab: e
    });
  };

  render() {
    const { currentTab } = this.state;
    return (
      <div className="page-detail">
        <PageHeader
          title="反馈管理"
          extra={[]}
        />
        <div className="warpper">
          <Tabs defaultActiveKey={currentTab} onChange={this.handleTab}>
            <TabPane tab="题目反馈" key="subject">
              <TopicList {...this.props} />
            </TabPane>
            <TabPane tab="协会反馈" key="organize">
              <OrganList {...this.props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default User;
