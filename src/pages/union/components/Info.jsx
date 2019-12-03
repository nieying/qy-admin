import React from "react";
import { getOrganizeInfo } from "@api/index";
import { Row, Col } from "antd";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      detailObj: {}
    };
  }

  componentWillMount() {}

  componentDidMount() {
    getOrganizeInfo({ organizeId: this.props.id }).then(res => {
      res && this.setState({ detailObj: res });
    });
  }

  render() {
    const { detailObj } = this.state;
    return (
      <div className="info">
        <h5>基本信息</h5>
        <div className="item-info">
          <Row>
            {/* <Col span={8}>
              <span>协会图标：</span>
              <img src={detailObj.avatar} alt="" />
            </Col> */}
            <Col span={8}>
              <span>协会名称：</span> {detailObj.name}
            </Col>
            <Col span={8}>
              <span>会长名称：</span> {detailObj.leaderName}
            </Col>
            <Col span={8}>
              <span>微信昵称：</span>
              {detailObj.leaderWeixinName}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Info;
