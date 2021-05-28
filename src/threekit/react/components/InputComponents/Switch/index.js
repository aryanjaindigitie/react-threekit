import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Header,
  SwitchBackground,
  SwitchToggle,
} from './switch.styles';
import { regularToKebabCase } from '../../../utils';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const Switch = (props) => {
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
      className={`tk-switch-input ${className ? `tk-input-${className}` : ''}`}
    >
      {title && (
        <Header
          className={`tk-switch-header ${
            className ? `tk-input-${className}` : ''
          }`}
        >
          {title}
        </Header>
      )}
      <SwitchBackground
        disabled={disabled}
        isPlayerLoading={isPlayerLoading}
        value={value}
        onClick={() => handleChange(!value)}
      >
        <SwitchToggle />
      </SwitchBackground>
    </Wrapper>
  );
};

Switch.compatibleAttributes = new Set([ATTRIBUTE_TYPES.boolean]);

export default Switch;
