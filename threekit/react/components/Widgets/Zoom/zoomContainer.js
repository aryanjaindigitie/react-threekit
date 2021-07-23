import React from 'react';
import { useZoom } from '../../../hooks';

const zoomContainer = (WrappedComponent) => (props) => {
  const [zoomIn, zoomOut] = useZoom();

  return <WrappedComponent {...props} zoomIn={zoomIn} zoomOut={zoomOut} />;
};

export default zoomContainer;
