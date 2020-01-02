import React from "react";
import { PageHeader, Tabs } from "antd";
import ConfigPage from "./components/ConfigPage";
import StartUp from "./components/StartUp";

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
          title="配置管理"
          extra={[]}
        />
        <div className="warpper">
          <Tabs defaultActiveKey={currentTab} onChange={this.handleTab}>
            <TabPane tab="启动页" key="subject">
              <StartUp {...this.props} />
            </TabPane>
            <TabPane tab="配置" key="organize">
              <ConfigPage {...this.props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default User;
