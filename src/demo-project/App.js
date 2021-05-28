import React from 'react';
import { components } from '../threekit';

const { Buttons, Player } = components;

const App = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Player />
      <div>
        {/* Replace the 'title' and 'attribute' with the name 
          of the Attribute you wish to Diplay */}
        <Buttons attribute="Attribute Name" />
      </div>
    </div>
  );
};

export default App;
