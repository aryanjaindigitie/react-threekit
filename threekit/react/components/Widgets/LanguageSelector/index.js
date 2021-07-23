import React from 'react';
import container from './lanuageSelectorContainer';
import { Dropdown } from '../../InputComponents/Dropdown';
import { widgetPrefix } from '../classNames';

export const LanguageSelector = ({ selected, options, handleChange }) => {
  if (!options) return null;

  return (
    <Dropdown
      className={`${widgetPrefix}-language-selector`}
      options={options}
      selected={selected}
      handleClick={handleChange}
    />
  );
};

export default container(LanguageSelector);
