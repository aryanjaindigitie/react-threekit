import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './attributeTitle.styles';
import container from './attributeTitleContainer';
import defaultClassName from '../classNames';
import { regularToKebabCase } from '../../../../utils';

export const AttributeTitle = (props) => {
  const { title, className: classNameRaw } = Object.assign(
    { title: undefined, className: '' },
    props
  );
  if (!title?.length) return null;

  let className = `${defaultClassName}-attr-title ${regularToKebabCase(title)}`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return <Wrapper className={className}>{title}</Wrapper>;
};

AttributeTitle.propTypes = {
  /**
   * The attribute's title/label displayed to the user
   */
  title: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

AttributeTitle.defaultProps = {
  title: undefined,
  className: '',
};

export default container(AttributeTitle);
