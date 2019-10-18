import React from "react";
import { Select } from "antd";
import { getUnit } from "@api/index";
const { Option } = Select;

class SelectUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      languageId: props.languageId || "",
      defaultValue: props.value || ""
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
    const { options, defaultValue } = this.state;
    const { mode } = this.props;
    return (
      <Select
        showSearch
        allowClear={true}
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
              {o.name}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default SelectUnit;
