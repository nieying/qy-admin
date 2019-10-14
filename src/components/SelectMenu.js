import React from "react";
import { Select } from "antd";
import { getMenu } from "@api/index";

const { Option } = Select;

class SelectDialect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      defaultValue: props.value || ""
    };
  }
  componentWillMount() {
    getMenu().then(res => {
      this.setState({ options: res });
    });
  }

  onChange = value => {
    this.props.setValue(value);
  };

  render() {
    const { options, defaultValue } = this.state;
    const { mode } = this.props;
    return (
      <Select
        showSearch
        defaultValue={defaultValue}
        mode={mode ? "multiple" : ""}
        placeholder="请选择"
        optionFilterProp="children"
        onChange={this.onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((o, i) => {
          return (
            <Option key={i} value={o.id}>
              {o.title}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default SelectDialect;
