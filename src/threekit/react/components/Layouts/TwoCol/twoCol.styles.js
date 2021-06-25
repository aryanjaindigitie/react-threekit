import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `${props.leftSize || '50%'} ${props.rightSize || '50%'}`};
  grid-gap: ${(props) => props.columnGap};
`;
