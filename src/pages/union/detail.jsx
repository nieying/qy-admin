import React from "react";
import moment from "moment";
import { PageHeader, Button, Divider } from "antd";
import { withRouter } from "react-router-dom";
import Info from "./components/Info";
import MemberList from "./components/MemberList";
import TaskList from "./components/TaskList";

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
          <Info id={id} {...this.props} />
          <MemberList id={id} {...this.props} />
          <TaskList id={id} {...this.props} />
        </div>
      </div>
    );
  }
}

export default UnionDetail;
