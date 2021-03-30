import React from 'react';
import { Select } from 'antd';
import { Wrapper, DropdownHeader } from './dropdown.styles';

const { Option } = Select;

export const Dropdown = ({
  title,
  style,
  options,
  handleClick,
  selected,
  hideDisabled,
}) => {
  if (!options || !options.filter((el) => !el.disabled).length) return null;

  return (
    <Wrapper>
      {title && <DropdownHeader>{title}</DropdownHeader>}
      <Select
        style={Object.assign({ width: 220 }, style)}
        value={typeof selected === 'string' ? selected : undefined}
        onChange={handleClick}
      >
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <Option key={i} value={option.assetId}>
              {option.name}
            </Option>
          );
        })}
      </Select>
    </Wrapper>
  );
};

export default Dropdown;
