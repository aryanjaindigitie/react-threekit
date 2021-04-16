import React, { useEffect } from 'react';
import { controller } from '../../../api';

const Player = ({ height, width }) => {
  useEffect(() => {
    (() => {
      controller.addPlayerToComponent('threekit-player');
    })();
    return;
  }, []);

  return (
    <div
      style={{ height: height || '500px', width: width || '100%' }}
      className="tk-player"
      id="threekit-player"
    />
  );
};

export default Player;
