import React from 'react';
import { useCameraToggle } from '../../../hooks';

const cameraContainer = (WrappedComponent) => (props) => {
  const [cameras, setCamera] = useCameraToggle();
  const handleClick = () => setCamera();

  if (!cameras) return null;

  return <WrappedComponent {...props} handleClick={handleClick} />;
};

export default cameraContainer;
