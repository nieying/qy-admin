import React from "react";
import { Select } from "antd";
import { getDialect } from "@api/index";
const { Option } = Select;

class SelectDialect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      defaultValue: props.value || null
    };
  }
  componentWillMount() {
    getDialect({
      page: 1,
      limit: 1000
    }).then(res => {
      this.setState({ options: res.list });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.defaultValue) {
      this.setState({
        defaultValue: nextProps.value
      })
    }
  }

  onChange = value => {
    this.props.setValue(value || '');
  //  !value && this.setState({defaultValue: ''})
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
export default SelectDialect;
