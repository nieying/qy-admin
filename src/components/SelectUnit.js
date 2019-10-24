import React from "react";
import { Select } from "antd";
import { getUnitByLanguage } from "@api/index";
const { Option } = Select;

class SelectUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      defaultValue: props.value || ""
    };
  }
  componentDidMount() {
    if(this.props.languageId) {
      this.getData(this.props.languageId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.languageId !== this.props.languageId) {
      this.getData(nextProps.languageId)
    }
    if(nextProps.value) {
      this.setState({
        defaultValue: nextProps.value
      })
    }
  }

  getData = (languageId) => {
    getUnitByLanguage({ languageId: languageId }).then(res => {
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
export default SelectUnit;
