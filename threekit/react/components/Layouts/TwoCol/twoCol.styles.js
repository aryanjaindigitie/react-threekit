import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100vw;
  display: grid;
  grid-template-columns: ${(props) =>
    `${props.leftSize || '50%'} ${props.rightSize || '50%'}`};
  grid-gap: ${(props) => props.columnGap};

  overflow-x: hidden;
`;
