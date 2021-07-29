import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './share.styles';
import { ShareAltOutlined } from '@ant-design/icons';
import container from './shareContainer';
import defaultClassName from '../classNames';

export const Share = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-share`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} onClick={handleClick}>
      <div>
        <ShareAltOutlined />
      </div>
    </Wrapper>
  );
};

Share.propTypes = {
  /**
   * Function to execute when user clicks 'Share'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Share.defaultProps = {
  handleClick: undefined,
  classname: '',
};

export default container(Share);
