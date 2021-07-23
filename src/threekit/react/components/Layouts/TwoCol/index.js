import React from 'react';
import { Wrapper } from './twoCol.styles';

export const TwoCol = (props) => {
  const { columnGap, leftSize, rightSize, className } = Object.assign(
    {
      columnGap: '15px',
      leftSize: '60%',
      rightSize: '40%',
      className: '',
    },
    props
  );
  return (
    <Wrapper
      className={`tk-two-cols ${className}`}
      columnGap={columnGap}
      leftSize={leftSize}
      rightSize={rightSize}
    >
      {props.children}
    </Wrapper>
  );
};

export default TwoCol;
