import React from 'react';
import { components } from '../threekit';

const { TwoCol, SingleProductForm, Player, Snapshot } = components;

const App = () => {
  return (
    <TwoCol>
      <div>
        <Player />
        <Snapshot cameras={['Top', 'Front']} output="url" />
      </div>
      <SingleProductForm />
    </TwoCol>
  );
};

export default App;
