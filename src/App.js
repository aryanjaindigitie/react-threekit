import React from 'react';
import { components } from '../threekit';

const { TwoCol, SingleProductForm, Player } = components;

const App = () => {
  return (
    <TwoCol>
      <Player />
      <SingleProductForm />
    </TwoCol>
  );
};

export default App;
