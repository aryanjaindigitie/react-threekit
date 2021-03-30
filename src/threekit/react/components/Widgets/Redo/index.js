import React from 'react';
import { Wrapper } from './undo.styles';
import { RedoOutlined } from '@ant-design/icons';
import { useRedo } from '../../../hooks';

export const Redo = () => {
  const redo = useRedo();

  const handleClick = () => {
    redo();
  };

  return (
    <Wrapper onClick={handleClick}>
      <div>
        <RedoOutlined />
      </div>
    </Wrapper>
  );
};

export default Redo;
