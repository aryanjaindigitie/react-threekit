import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  RadioButtonsHeader as Header,
  Buttons,
  ButtonWrapper,
  IconWrapper,
  Label,
} from './radioButtons.styles';
import { regularToKebabCase } from '../../../utils';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const RadioButtons = (props) => {
  const {
    attribute,
    title,
    options,
    selected,
    className: classNameRaw,
    hideDisabled,
    handleClick,
    isPlayerLoading,
  } = props;

  const className = attribute
    ? regularToKebabCase(attribute)
    : title
    ? regularToKebabCase(title)
    : classNameRaw;

  return (
    <Wrapper
      className={`tk-radio-buttons ${className ? `tk-input-${className}` : ''}`}
    >
      {title && (
        <Header
          className={`tk-radio-btn-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Header>
      )}
      <Buttons
        className={`tk-radio-btn-content ${
          className ? `tk-input-${className}` : ''
        }`}
      >
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <ButtonWrapper
              className={`tk-radio-btn ${
                className ? `tk-input-${className}` : ''
              } option-${i + 1}`}
              key={i}
              isPlayerLoading={isPlayerLoading}
              disabled={option.disabled}
              onClick={() => handleClick(option.value)}
            >
              <IconWrapper selected={option.value === selected}>
                <div></div>
              </IconWrapper>
              <Label
                className={`tk-radio-btn-label ${
                  className ? `tk-input-${className}` : ''
                } option-${i + 1}`}
              >
                {option.label}
              </Label>
            </ButtonWrapper>
          );
        })}
      </Buttons>
    </Wrapper>
  );
};

RadioButtons.propTypes = {
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
      disabled: PropTypes.bool,
    })
  ),
};

RadioButtons.defaultProps = {
  attribute: undefined,
  title: undefined,
  className: undefined,
  selected: undefined,
  hideDisabled: undefined,
  handleClick: undefined,
  options: [],
};

RadioButtons.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.string,
]);

export default RadioButtons;
