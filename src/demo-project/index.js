import React from 'react';
import { ThreekitProvider } from '../threekit';
import App from './App';

const DemoProject = () => {
  return (
    <ThreekitProvider>
      <App />
    </ThreekitProvider>
  );
};

export default DemoProject;
