import React from "react";
import { Select } from "antd";
import { getUnit } from "@api/index";
const { Option } = Select;

class SelectUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }
  componentWillMount() {
    getUnit().then(res => {
      this.setState({ options: res.list });
    });
  }

  onChange = value => {
    this.props.setValue(value);
  };

  render() {
    const { options } = this.state;
    const { mode } = this.props;
    return (
      <Select
        showSearch
        mode={mode ? "multiple" : ""}
        placeholder="???"
        optionFilterProp="children"
        onChange={this.onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((o, i) => {
          return (
            <Option key={i} value={o.name}>
              {o.name}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default SelectUnit;
