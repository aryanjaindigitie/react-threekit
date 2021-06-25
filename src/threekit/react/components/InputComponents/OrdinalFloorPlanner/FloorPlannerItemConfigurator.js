import React, { useState, useEffect } from 'react';
import {
  ConfiguratorWrapper as Wrapper,
  ConfiguratorTitle as Title,
} from './ordinalFloorPlanner.styles';

export const FloorPlannerItemConfigurator = ({ name, assetId }) => {
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    (async () => {
      const player = window.threekit.player.enableApi('player');
      const item = await player.getConfiguratorInstance([
        assetId,
        'plugs',
        'Proxy',
        0,
        'asset',
      ]);
      setAttributes(item.getDisplayAttributes());
    })();
  }, []);

  return (
    <Wrapper>
      <Title>{name}</Title>
      {attributes.map((el, i) => (
        <div key={i}>{el.name}</div>
      ))}
    </Wrapper>
  );
};

export default FloorPlannerItemConfigurator;
