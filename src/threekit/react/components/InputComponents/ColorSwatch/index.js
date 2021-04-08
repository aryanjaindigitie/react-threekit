import React from 'react';
import {
  ColorSwatchContent as Content,
  ColorSwatchHeader as Header,
  ColorOption as Option,
} from './colorSwatch.styles';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { regularToKebabCase } from '../../../utils';

export const ColorSwatch = ({
  attribute,
  title,
  className: classNameRaw,
  options,
  selected,
  hideDisabled,
  handleClick,
}) => {
  if (!options || !options.filter((el) => !el.disabled).length) return null;

  const className = attribute
    ? regularToKebabCase(attribute)
    : title
    ? regularToKebabCase(title)
    : classNameRaw;

  return (
    <div
      className={`tk-color-swatch ${className ? `tk-input-${className}` : ''}`}
    >
      {title && (
        <Header
          className={`tk-color-swatch-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Header>
      )}
      <Content
        className={`tk-color-swatch-content ${
          className ? `tk-input-${className}` : ''
        }`}
      >
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <Tooltip key={i} placement="top" title={option.name}>
              <Option
                className={`tk-color-swatch-option ${
                  className ? `tk-input-${className}` : ''
                } option-${i + 1}`}
                color={option.colorValue}
                onClick={() => handleClick(option.value)}
              >
                {option.value === selected && (
                  <div
                    className={`tk-color-swatch-option-selected ${
                      className ? `tk-input-${className}` : ''
                    } option-${i + 1}`}
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

export default ColorSwatch;
