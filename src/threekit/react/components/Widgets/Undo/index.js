import React from 'react';
import { Wrapper } from './undo.styles';
import { UndoOutlined } from '@ant-design/icons';
import { useUndo } from '../../../hooks';

export const Undo = () => {
  const undo = useUndo();

  const handleClick = () => {
    undo();
  };

  return (
    <Wrapper onClick={handleClick}>
      <div>
        <UndoOutlined />
      </div>
    </Wrapper>
  );
};

export default Undo;
