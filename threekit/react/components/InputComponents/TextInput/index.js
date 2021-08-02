import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Input } from './textInput.styles';
import { InputComponentTitle as Title } from '../inputComponents.styles';
import { regularToKebabCase } from '../../../../utils';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const TextInput = (props) => {
  const {
    title,
    attribute,
    className: classNameRaw,
    value,
    handleChange,
    isPlayerLoading,
    disabled,
  } = props;

  const className = attribute
    ? regularToKebabCase(attribute)
    : title
    ? regularToKebabCase(title)
    : classNameRaw;

  return (
    <Wrapper
      className={`tk-text-input ${className ? `tk-input-${className}` : ''}`}
    >
      {title && (
        <Title
          className={`tk-text-input-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Title>
      )}
      <Input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        isPlayerLoading={isPlayerLoading}
        disabled={disabled}
      />
    </Wrapper>
  );
};

TextInput.compatibleAttributes = new Set([ATTRIBUTE_TYPES.string]);

export default TextInput;
