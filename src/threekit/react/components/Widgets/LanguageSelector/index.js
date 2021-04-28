import React from 'react';
import { Select } from 'antd';
import { useLanguages } from '../../../hooks';

const LanguageSelector = () => {
  const [selected, options, handleChange] = useLanguages();

  if (!options) return null;

  return (
    <Select
      style={{ minWidth: '80px' }}
      value={selected}
      onChange={handleChange}
    >
      {options.map((el, i) => (
        <Select.Option key={i} value={el}>
          {el}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSelector;
