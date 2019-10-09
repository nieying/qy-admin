import React from "react";
import { Select } from "antd";
const { Option } = Select;

class SelectTopicType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { id: '1', name: "听力题" },
        { id: '2', name: "伪音标题" },
        { id: '3', name: "看图题" },
        { id: '4', name: "选图题" }
      ],
      defaultValue: props.value || ""
    };
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
        defaultValue={defaultValue.toString()}
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
export default SelectTopicType;
