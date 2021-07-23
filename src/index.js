import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThreekitProvider } from '../threekit';

const Project = () => {
  return (
    <ThreekitProvider>
      <App />
    </ThreekitProvider>
  );
};

ReactDOM.render(<Project />, document.getElementById('root'));
