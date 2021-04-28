import React, { useEffect } from 'react';
import { Controller } from '../../../api';

const Player = (props) => {
  const { height, width } = Object.assign(
    {
      height: '500px',
      width: '100%',
    },
    props
  );

  useEffect(() => {
    (() => {
      Controller.attachPlayerToComponent('threekit-player');
    })();
    return;
  }, []);

  return (
    <div style={{ height, width }} className="tk-player" id="threekit-player" />
  );
};

export default Player;
