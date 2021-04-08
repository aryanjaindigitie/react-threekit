import React from 'react';
import PropTypes from 'prop-types';
import {
  SwatchWrapper as Wrapper,
  SwatchContent as Content,
  SwatchOption as Option,
  SwatchHeader as Header,
} from './swatch.styles';
import { regularToKebabCase } from '../../../utils';

export const Swatch = (props) => {
  const {
    attribute,
    title,
    options,
    className: classNameRaw,
    handleClick,
    selected,
    hideDisabled,
  } = props;
  if (!options || !options.filter((el) => !el.disabled).length) return null;

  const className = attribute
    ? regularToKebabCase(attribute)
    : title
    ? regularToKebabCase(title)
    : classNameRaw;

  return (
    <Wrapper
      className={`tk-swatch ${className ? `tk-input-${className}` : ''}`}
    >
      {title && (
        <Header
          className={`tk-swatch-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Header>
      )}
      <Content
        className={`tk-swatch-content ${
          className ? `tk-input-${className}` : ''
        }`}
      >
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <Option
              key={i}
              className={`tk-swatch-item ${
                className ? `tk-input-${className}` : ''
              } option-${i + 1}`}
              onClick={() => handleClick(option.value)}
              color={option.colorValue}
              selected={option.value === selected}
            >
              <div
                className={`tk-swatch-content ${
                  className ? `tk-input-${className}` : ''
                } option-${i + 1}`}
              >
                <div
                  className={`tk-swatch-image ${
                    className ? `tk-input-${className}` : ''
                  } option-${i + 1}`}
                >
                  {option.imageUrl && (
                    <img src={option.imageUrl} alt={option.name} />
                  )}
                </div>
                {option.name && (
                  <div
                    className={`tk-swatch-item-label ${
                      className ? `tk-input-${className}` : ''
                    } option-${i + 1}`}
                  >
                    {option.name}
                  </div>
                )}
              </div>
            </Option>
          );
        })}
      </Content>
    </Wrapper>
  );
};

Swatch.propTypes = {
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
      imageUrl: PropTypes.string,
    })
  ),
};

Swatch.defaultProps = {
  attribute: undefined,
  title: undefined,
  className: undefined,
  selected: undefined,
  hideDisabled: undefined,
  handleClick: undefined,
  options: [],
};

export default Swatch;
