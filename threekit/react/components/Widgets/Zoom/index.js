import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './zoom.styles';
import { ButtonWrapper } from '../widgets.styles';
import container from './zoomContainer';
import defaultClassName from '../classNames';

export const Zoom = (props) => {
  const {
    step,
    orientation,
    zoomIn,
    zoomOut,
    className: classNameRaw,
  } = Object.assign(
    {
      step: 1,
      orientation: 'horizontal',
      zoomIn: undefined,
      zoomOut: undefined,
    },
    props
  );

  let className = `${defaultClassName}-zoom`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} orientation={orientation}>
      <ButtonWrapper
        className={`${className} zoom-in`}
        onClick={() => zoomIn(step)}
      >
        <div>+</div>
      </ButtonWrapper>
      <ButtonWrapper
        className={`${className} zoom-out`}
        onClick={() => zoomOut(step)}
      >
        <div>-</div>
      </ButtonWrapper>
    </Wrapper>
  );
};

Zoom.propTypes = {
  /**
   * The number of steps, for both zoom-in and out, that we want to increment the zoom by.
   */
  step: PropTypes.number,
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
