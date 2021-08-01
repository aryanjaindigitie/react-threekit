import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from '../widgets.styles';
import { CameraOutlined } from '../../../icons';
import container from './cameraToggleContainer';
import defaultClassName from '../classNames';

export const CameraToggle = (props) => {
  const { handleClick, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-camera-toggle`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      showLabel={showLabel}
      className={className}
      onClick={handleClick}
    >
      <div>
        <CameraOutlined />
      </div>
      <div>Switch Camera</div>
    </ButtonWrapper>
  );
};

CameraToggle.propTypes = {
  /**
   * Function to execute when user clicks 'CameraToggle'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

CameraToggle.defaultProps = {
  handleClick: undefined,
  classname: '',
};

export default container(CameraToggle);
