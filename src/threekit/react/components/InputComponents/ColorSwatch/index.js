import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorSwatchContent as Content,
  ColorSwatchHeader as Header,
  ColorOption as Option,
} from './colorSwatch.styles';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { regularToKebabCase } from '../../../utils';

export const ColorSwatch = (props) => {
  const {
    attribute,
    title,
    className: classNameRaw,
    options,
    selected,
    hideDisabled,
    handleClick,
    isPlayerLoading,
  } = props;

  const className = attribute
    ? 'tk-input-' + regularToKebabCase(attribute)
    : title
    ? 'tk-input-' + regularToKebabCase(title)
    : classNameRaw || '';

  return (
    <div className={`tk-color-swatch ${className}`.trim()}>
      {title && (
        <Header className={`tk-color-swatch-header ${className}`.trim()}>
          {title}
        </Header>
      )}
      <Content className={`tk-color-swatch-content ${className}`.trim()}>
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <Tooltip key={i} placement="top" title={option.label}>
              <Option
                className={`tk-color-swatch-option ${className} option-${
                  i + 1
                }`.trim()}
                isPlayerLoading={isPlayerLoading}
                color={option.colorValue}
                onClick={() => handleClick(option.value)}
              >
                {option.value === selected && (
                  <div
                    className={`tk-color-swatch-option-selected ${className} option-${
                      i + 1
                    }`.trim()}
                  >
                    <CheckOutlined />
                  </div>
                )}
              </Option>
            </Tooltip>
          );
        })}
      </Content>
    </div>
  );
};

ColorSwatch.propTypes = {
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
      colorValue: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
};

ColorSwatch.defaultProps = {
  attribute: undefined,
  title: undefined,
  className: undefined,
  selected: undefined,
  hideDisabled: undefined,
  handleClick: undefined,
  options: [],
};

export default ColorSwatch;
