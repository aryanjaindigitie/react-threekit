import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownHeader as Header,
  DropdownMain as Main,
  DropdownWrapper as Wrapper,
  DropdownOptions as Options,
  DropdownOptionsContent as OptionsContent,
  DropdownOption as Option,
} from './dropdown.styles';
import { DownOutlined } from '@ant-design/icons';
import { regularToKebabCase } from '../../../utils';

export const Dropdown = (props) => {
  const {
    attribute,
    title,
    placeholder,
    options,
    className: classNameRaw,
    handleClick: onClick,
    selected,
    hideDisabled,
  } = props;
  if (!options || !options.filter((el) => !el.disabled).length) return null;
  const [hide, setHide] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current.contains(e.target)) setHide(true);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hide, ref]);

  const handleClick = (value) => {
    onClick(value);
    setHide(true);
  };

  const className = attribute
    ? regularToKebabCase(attribute)
    : title
    ? regularToKebabCase(title)
    : classNameRaw;

  return (
    <div className={`tk-dropdown ${className ? `tk-input-${className}` : ''}`}>
      {title && (
        <Header
          className={`tk-dropdown-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Header>
      )}
      <Wrapper
        active={!hide}
        ref={ref}
        className={`tk-dropdown-outer ${
          className ? `tk-input-${className}` : ''
        }`}
      >
        <Main
          active={!hide}
          className={`tk-dropdown-main ${
            className ? `tk-input-${className}` : ''
          }`}
          onClick={() => setHide(!hide)}
          hasPlaceholder={!selected && !!placeholder}
        >
          <div
            className={`tk-dropdown-selected ${
              className ? `tk-input-${className}` : ''
            }`}
          >
            {options.find((el) => el.value === selected)?.name ||
              placeholder ||
              ''}
          </div>
          <div
            className={`tk-dropdown-caret ${
              className ? `tk-input-${className}` : ''
            }`}
          >
            <DownOutlined />
          </div>
        </Main>
        <Options
          hide={hide}
          className={`tk-dropdown-options ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          <OptionsContent
            className={`tk-dropdown-options-content ${
              className ? `tk-input-${className}` : ''
            }`}
          >
            {options.map((option, i) => {
              if (option.disabled && hideDisabled) return null;
              return (
                <Option
                  key={i}
                  className={`tk-dropdown-option ${
                    className ? `tk-input-${className}` : ''
                  }`}
                  selected={selected === option.value}
                  onClick={() => handleClick(option.value)}
                >
                  <div
                    className={`tk-dropdown-option-label ${
                      className ? `tk-input-${className}` : ''
                    }`}
                  >
                    {option.name}
                  </div>
                </Option>
              );
            })}
          </OptionsContent>
        </Options>
      </Wrapper>
    </div>
  );
};

Dropdown.propTypes = {
  attribute: PropTypes.string,
  title: PropTypes.string,
  placholder: PropTypes.string,
  className: PropTypes.string,
  selected: PropTypes.string,
  hideDisabled: PropTypes.bool,
  handleClick: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      colorValue: PropTypes.string,
    })
  ),
};

Dropdown.defaultProps = {
  attribute: undefined,
  title: undefined,
  placholder: undefined,
  className: undefined,
  selected: undefined,
  hideDisabled: undefined,
  handleClick: undefined,
  options: [],
};

export default Dropdown;
