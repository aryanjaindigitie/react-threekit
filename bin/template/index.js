import React from 'react';
import { ThreekitProvider } from '../threekit';
import App from './App';

const ThreekitProject = () => {
  return (
    <ThreekitProvider>
      <App />
    </ThreekitProvider>
  );
};

export default ThreekitProject;
