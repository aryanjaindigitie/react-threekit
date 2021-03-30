import React from 'react';
import { threekit, Player, InputComponents } from '../threekit';
import { Button } from 'antd';

const { Dropdown } = InputComponents;

const App = () => {
  const handleClickPrintBom = async () => {
    const { bom, configuration } = await threekit.getBom();
    console.log(bom, configuration);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Player />
      <div>
        {/* Replace the 'title' and 'attribute' with the name 
          of the Attribute you wish to Diplay */}
        <Dropdown title="Attribute Name" attribute="Attribute Name" />
        <Button onClick={handleClickPrintBom}>Print BOM</Button>
      </div>
    </div>
  );
};

export default App;
