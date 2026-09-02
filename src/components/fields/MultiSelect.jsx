import React from "react";
import { Select } from "antd";

import "../../styles/multiselect.scss";

const MultiSelect = ({
  options = [],
  placeholder = "",
  value = [],
  onChange = () => {},
  ...rest
}) => {
  return (
    <Select
      className="multi-select w-full"
      mode="multiple"
      maxTagCount="responsive"
      placeholder={placeholder}
      options={options}
      allowClear
      value={value}
      onChange={(selectedValues) => onChange(selectedValues || [])}
      {...rest}
    />
  );
};

export default MultiSelect;
