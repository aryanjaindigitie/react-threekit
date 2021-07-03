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
import { regularToKebabCase } from '../../../../utils';
import { ATTRIBUTE_TYPES } from '../../../../constants';

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
    isPlayerLoading,
  } = props;
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
    ? 'tk-input-' + regularToKebabCase(attribute)
    : title
    ? 'tk-input-' + regularToKebabCase(title)
    : classNameRaw || '';

  const selectedOpt = options.find((el) => el.value === selected)

  return (
    <div className={`tk-dropdown ${className}`}>
      {title && (
        <Header className={`tk-dropdown-header ${className}`}>{title}</Header>
      )}
      <Wrapper
        loading={isPlayerLoading}
        active={!hide}
        ref={ref}
        className={`tk-dropdown-outer ${className}`}
      >
        <Main
          active={!hide}
          className={`tk-dropdown-main ${className}`}
          onClick={() => setHide(!hide)}
          hasPlaceholder={!selected && !!placeholder}
        >
          <div className={`tk-dropdown-selected ${className}`}>
            {selectedOpt?.name || selectedOpt?.label ||
              placeholder ||
              ''}
          </div>
          <div className={`tk-dropdown-caret ${className}`}>
            <DownOutlined />
          </div>
        </Main>
        <Options hide={hide} className={`tk-dropdown-options ${className}`}>
          <OptionsContent
            className={`tk-dropdown-options-content ${className}`}
          >
            {options.map((option, i) => {
              if (option.disabled && hideDisabled) return null;
              return (
                <Option
                  key={i}
                  className={`tk-dropdown-option ${className}`}
                  selected={selected === option.value}
                  onClick={() => handleClick(option.value)}
                >
                  <div className={`tk-dropdown-option-label ${className}`}>
                    {option.label}
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
  /**
   * Is the attribute name on the initialized asset that we are
   * using this component for
   */
  attribute: PropTypes.string,
  /**
   * Used to add a title to the input
   */
  title: PropTypes.string,
  /**
   * Used to add a custom class name to each of the components html elements
   */
  placeholder: PropTypes.string,
  /**
   * Used to display a placeholder on the Dropdown when no value is selected
   */
  className: PropTypes.string,
  /**
   * Selected value from the option set. Should match the 'value' property
   * of one of the items in the options array.
   */
  selected: PropTypes.string,
  /**
   * NOTE: Input wide hide disabled will be deprecated in favour of option
   * specific control of both 'disabled' and 'visible'.
   *
   * Used to hide the options that have the 'disabled' equal to true.
   */
  hideDisabled: PropTypes.bool,
  /**
   * Change handler function. Passes on the 'value' property of the option
   * selected by the user to the function.
   */
  handleClick: PropTypes.func,
  /**
   * The options set to be displayed for the user
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool,
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

Dropdown.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.string,
  ATTRIBUTE_TYPES.arraySelector,
]);

export default Dropdown;
