import React from 'react';
import { Wrapper } from './undo.styles';
import { RedoOutlined } from '@ant-design/icons';
import { useHistory } from '../../../hooks';

export const Redo = () => {
  const stepHistory = useHistory();
  const handleClick = () => stepHistory(1);

  return (
    <Wrapper onClick={handleClick}>
      <div>
        <RedoOutlined />
      </div>
    </Wrapper>
  );
};

export default Redo;
