import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  RadioButtonsHeader as Header,
  Buttons,
  ButtonWrapper,
} from './radioButtons.styles';
import { regularToKebabCase } from '../../../utils';

export const RadioButtons = (props) => {
  const {
    attribute,
    title,
    options,
    selected,
    className: classNameRaw,
    hideDisabled,
    handleClick,
  } = props;
  if (!options || !options.filter((el) => !el.disabled).length) return null;

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
              disabled={option.disabled}
              selected={option.value === selected}
              onClick={() => handleClick(option.value)}
            >
              <div
                className={`tk-radio-btn-label ${
                  className ? `tk-input-${className}` : ''
                } option-${i + 1}`}
              >
                {option.name}
              </div>
            </ButtonWrapper>
          );
        })}
      </Buttons>
    </Wrapper>
  );
};

RadioButtons.propTypes = {
  attribute: PropTypes.string,
  title: PropTypes.string,
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

RadioButtons.defaultProps = {
  attribute: undefined,
  title: undefined,
  className: undefined,
  selected: undefined,
  hideDisabled: undefined,
  handleClick: undefined,
  options: [],
};

export default RadioButtons;
