import React from "react";
import { Select } from "antd";
const { Option } = Select;

class SelectTopicType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //normal:文字题（伪音标题），auto:听力题，picture:选图题，map:看图题
      options: [
        { id: 'normal', name: "伪音标题" },
        { id: 'auto', name: "听力题" },
        { id: 'map', name: "看图题" },
        { id: 'picture', name: "选图题" }
      ],
      defaultValue: props.value || null
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value) {
      this.setState({
        defaultValue: nextProps.value
      })
    }
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
        value={defaultValue}
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
