import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './description.styles';
import container from './descriptionContainer';
import defaultClassName from '../classNames';
import { regularToKebabCase } from '../../../../utils';

export const Description = (props) => {
  const { description, className: classNameRaw } = Object.assign(
    {
      description: undefined,
      className: '',
    },
    props
  );
  if (!description?.length) return null;

  let className = `${defaultClassName}-description ${regularToKebabCase(
    description
  )}`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return <Wrapper className={className}>{description}</Wrapper>;
};

Description.propTypes = {
  /**
   * The description displayed to the user
   */
  description: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Description.defaultProps = {
  description: undefined,
  className: '',
};

export default container(Description);
