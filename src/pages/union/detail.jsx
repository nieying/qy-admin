import React from "react";
import moment from "moment";
import { PageHeader, Tabs } from "antd";
import { withRouter } from "react-router-dom";
import Info from "./components/Info";
import MemberList from "./components/MemberList";
import TaskList from "./components/TaskList";
import ActivityList from "./components/ActivityList";
const { TabPane } = Tabs;

@withRouter
class UnionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  componentWillMount() {
    var searchParams = new URLSearchParams(this.props.location.search);
    const id = searchParams.get("id");
    this.setState({ id: id });
  }
  render() {
    const { id } = this.state;
    return (
      <div className="page-detail">
        <PageHeader title="协会详情" />
        <div className="warpper">
          <Tabs defaultActiveKey="1">
            <TabPane tab="活动列表" key="1">
              {/* <Info id={id} {...this.props} /> */}
              <ActivityList id={id} {...this.props} />
            </TabPane>
            <TabPane tab="任务列表" key="2">
              <TaskList id={id} {...this.props} />
            </TabPane>
            <TabPane tab="成员列表" key="3">
              <MemberList id={id} {...this.props} />
            </TabPane>
          </Tabs>
          ,
        </div>
      </div>
    );
  }
}

export default UnionDetail;
