import React from 'react';
import { Wrapper, Button } from './zoom.styles';
import { useZoom } from '../../../hooks';

export const Zoom = ({ orientation }) => {
  const [zoomIn, zoomOut] = useZoom();
  return (
    <Wrapper orientation={orientation}>
      <Button onClick={() => zoomIn()}>
        <div>+</div>
      </Button>
      <Button onClick={() => zoomOut()}>
        <div>-</div>
      </Button>
    </Wrapper>
  );
};

export default Zoom;
