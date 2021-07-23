import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Button } from './zoom.styles';
import container from './zoomContainer';
import defaultClassName from '../classNames';

export const Zoom = (props) => {
  const {
    orientation,
    zoomIn,
    zoomOut,
    className: classNameRaw,
  } = Object.assign(
    { orientation: 'horizontal', zoomIn: undefined, zoomOut: undefined },
    props
  );

  let className = `${defaultClassName}-zoom`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} orientation={orientation}>
      <Button className={`${className} zoom-in`} onClick={() => zoomIn()}>
        <div>+</div>
      </Button>
      <Button className={`${className} zoom-out`} onClick={() => zoomOut()}>
        <div>-</div>
      </Button>
    </Wrapper>
  );
};

Zoom.propTypes = {
  /**
   * Used to the set the orientation/alignment of the buttons.
   */
  orientation: PropTypes.string,
  /**
   * Function to execute when user clicks 'Zoom In'.
   */
  zoomIn: PropTypes.func,
  /**
   * Function to execute when user clicks 'Zoom Out'.
   */
  zoomOut: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Zoom.defaultProps = {
  orientation: 'horizontal',
  zoomIn: undefined,
  zoomOut: undefined,
  className: '',
};

export default container(Zoom);
