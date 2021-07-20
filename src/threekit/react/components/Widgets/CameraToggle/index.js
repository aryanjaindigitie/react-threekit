import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './cameraToggle.styles';
import { CameraOutlined } from '@ant-design/icons';
import container from './cameraToggleContainer';
import defaultClassName from '../classNames';

export const CameraToggle = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-camera-toggle`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} onClick={handleClick}>
      <div>
        <CameraOutlined />
      </div>
    </Wrapper>
  );
};

CameraToggle.propTypes = {
  /**
   * Function to execute when user clicks 'CameraToggle'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

CameraToggle.defaultProps = {
  handleClick: undefined,
  classname: '',
};

export default container(CameraToggle);
