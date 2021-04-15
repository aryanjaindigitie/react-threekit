import React from 'react';
import { Wrapper } from './undo.styles';
import { UndoOutlined } from '@ant-design/icons';
import { useHistory } from '../../../hooks';

export const Undo = () => {
  const stepHistory = useHistory();
  const handleClick = () => stepHistory(-1);

  return (
    <Wrapper onClick={handleClick}>
      <div>
        <UndoOutlined />
      </div>
    </Wrapper>
  );
};

export default Undo;
