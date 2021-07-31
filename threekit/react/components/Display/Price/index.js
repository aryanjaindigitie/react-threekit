import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './price.styles';
import container from './priceContainer';
import defaultClassName from '../classNames';
import { regularToKebabCase } from '../../../../utils';

export const Price = (props) => {
  const { price, className: classNameRaw } = Object.assign(
    {
      price: undefined,
      className: '',
    },
    props
  );
  if (!price?.length) return null;

  let className = `${defaultClassName}-price ${regularToKebabCase(price)}`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return <Wrapper className={className}>{price}</Wrapper>;
};

Price.propTypes = {
  /**
   * The price displayed to the user
   */
  price: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Price.defaultProps = {
  price: undefined,
  className: '',
};

export default container(Price);
