import React from "react";
import { Select } from "antd";
const { Option } = Select;

class SelectTopicType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // normal:普通，auto:语言，notes:注释，map:看图题
      options: [
        { id: 'auto', name: "听力题" },
        { id: 'notes', name: "伪音标题" },
        { id: 'map', name: "看图题" },
        { id: 'normal', name: "选图题" }
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
