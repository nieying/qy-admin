import React from "react";
import { Modal, Switch, message } from "antd";
import { editUnionMember } from "@api/index";

class SetTagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      datas: [
        {
          id: 1,
          name: "客卿",
          checked: false
        },
        {
          id: 2,
          name: "校园大使",
          checked: false
        },
        {
          id: 3,
          name: "志愿者代表",
          checked: false
        }
      ],
      currentTag: ""
    };
  }

  componentDidMount() {
    const { datas } = this.state;
    const { editItem } = this.props;
    datas.forEach(tag => {
      if (tag.name === editItem.rank) {
        tag.checked = true;
      } else {
        tag.checked = false;
      }
    });
    this.setState({ datas });
  }

  handleOk = e => {
    const { editItem } = this.props;
    const { currentTag } = this.state;
    e.preventDefault();
    editUnionMember({
      organizeId: editItem.organizeId,
      id: editItem.id,
      rank: currentTag
    }).then(res => {
      if (res) {
        message.success("设置成功！");
        this.props.getData();
        this.props.handleCancel();
      }
    });
    
  };

  onChange = (e, item) => {
    const { datas } = this.state;
    let rank = "";
    datas.forEach(tag => {
      if (tag.id === item.id) {
        tag.checked = e;
        if (e) {
          rank = tag.name;
        }
      } else {
        tag.checked = false;
      }
    });
    this.setState({ datas, currentTag: rank });
  };

  render() {
    const { datas } = this.state;
    return (
      <Modal
        title="设置标签"
        visible={true}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
      >
        <div>
          {datas.map(item => {
            return (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                <Switch
                  checked={item.checked}
                  onChange={e => {
                    this.onChange(e, item);
                  }}
                />
                <span style={{ marginLeft: "15px" }}>{item.name}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }
}

export default SetTagModal;
