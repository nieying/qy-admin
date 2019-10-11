import React from "react";
import { Select } from "antd";
// import { getDialect } from "@api/index";
import { menuJson } from "@utils/menuJson.js";

const { Option } = Select;

class SelectDialect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: menuJson,
      defaultValue: props.value || ""
    };
  }
  componentWillMount() {
    // getDialect().then(res => {
    //   this.setState({ options: res.list });
    // });
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
            <Option key={i} value={o.title}>
              {o.title}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default SelectDialect;
