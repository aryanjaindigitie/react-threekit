import React, { useEffect } from 'react';
import threekit from '../../../api';

const Player = () => {
  useEffect(() => {
    (() => {
      threekit.player.addPlayerToComponent('threekit-player');
    })();
    return;
  }, []);

  return <div style={{ height: '500px' }} id="threekit-player" />;
};

export default Player;
