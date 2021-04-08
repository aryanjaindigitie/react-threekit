import React from 'react';
import {
  SwatchWrapper as Wrapper,
  SwatchContent as Content,
  SwatchOption as Option,
  SwatchHeader as Header,
} from './swatch.styles';
import { regularToKebabCase } from '../../../utils';

export const Swatch = ({
  attribute,
  title,
  options,
  handleClick,
  selected,
  hideDisabled,
}) => {
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

export default Swatch;
