import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './title.styles';
import container from './titleContainer';
import defaultClassName from '../classNames';
import { regularToKebabCase } from '../../../../utils';

export const Title = (props) => {
  const { title, className: classNameRaw, align } = Object.assign(
    { title: undefined, className: '', align: 'left' },
    props
  );
  if (!title?.length) return null;

  let className = `${defaultClassName}-title ${regularToKebabCase(title)}`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper align={align} className={className}>
      {title}
    </Wrapper>
  );
};

Title.propTypes = {
  /**
   * The title displayed to the user
   */
  title: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
  /**
   * The CSS Text alignment property. Options: 'left' | 'center' | 'right'
   */
  align: PropTypes.string,
};

Title.defaultProps = {
  title: undefined,
  className: '',
  align: 'left',
};

export default container(Title);
