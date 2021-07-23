import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './attributeValue.styles';
import container from './attributeValueContainer';
import defaultClassName from '../classNames';
import { regularToKebabCase } from '../../../../utils';

export const AttributeValue = (props) => {
  const { value, className: classNameRaw } = Object.assign(
    { value: undefined, className: '' },
    props
  );
  if (!value?.length) return null;

  let className = `${defaultClassName}-attr-value ${regularToKebabCase(value)}`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return <Wrapper className={className}>{value}</Wrapper>;
};

AttributeValue.propTypes = {
  /**
   * The attribute's value displayed to the user
   */
  value: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

AttributeValue.defaultProps = {
  value: undefined,
  className: '',
};

export default container(AttributeValue);
