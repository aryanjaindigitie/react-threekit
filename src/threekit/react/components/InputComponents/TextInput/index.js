import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Input } from './textInput.styles';
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
        <Header
          className={`tk-text-input-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Header>
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
