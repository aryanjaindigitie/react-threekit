import React, { useEffect } from 'react';
import { controller } from '../../../api';

const Player = () => {
  useEffect(() => {
    (() => {
      controller.addPlayerToComponent('threekit-player');
    })();
    return;
  }, []);

  return (
    <div
      style={{ height: '500px' }}
      className="tk-player"
      id="threekit-player"
    />
  );
};

export default Player;
