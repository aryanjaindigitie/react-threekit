import React, { useEffect } from 'react';
import { Wrapper } from './player.styles';
import Controller from '../../../controller';
import {
  TK_PLAYER_DIV_ID,
  DEFAULT_CLASS_NAME,
  CLASS_NAME_PREFIX,
} from '../../../constants';

const className = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-player`;

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
      Controller.attachPlayerToComponent(TK_PLAYER_DIV_ID);
    })();
    return;
  }, []);

  return (
    <Wrapper
      height={height}
      width={width}
      className={className}
      id={TK_PLAYER_DIV_ID}
    />
  );
};

export default Player;
