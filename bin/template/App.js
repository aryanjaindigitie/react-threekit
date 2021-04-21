import React from 'react';
import { components } from '../threekit';

/* import components */

const App = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        <Player height="600px" width="300px" />
      </div>
      <div>{/* components */}</div>
    </div>
  );
};

export default App;
