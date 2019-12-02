import React from "react";
import { withRouter } from "react-router-dom";
import { getOrganize } from "@api/index";
import { Row, Col, Input, message } from "antd";

@withRouter
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    var searchParams = new URLSearchParams(this.props.location.search);
    const id = searchParams.get("id");
    getOrganize({ id }).then(res => {
      this.setState({ detailObj: res });
    });
  }

  render() {
    const { detailObj } = this.state;
    return (
      <div className="info">
        <h5>基本信息</h5>
        <div className="item-info">
          <Row>
            <Col span={8}>
              <span>协会图标：</span>
              <img src="" alt="" />
            </Col>
            <Col span={8}>
              <span>协会名称：</span> 123
            </Col>
            <Col span={8}>
              <span>会长名称：</span>111
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <span>微信昵称：</span>
              <img src="" alt="" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>描述：</span>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Info;
