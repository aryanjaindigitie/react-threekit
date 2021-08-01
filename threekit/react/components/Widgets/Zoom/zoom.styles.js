import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  ${(props) =>
    props.orientation === 'vertical'
      ? 'grid-template-rows: repeat(2, max-content);'
      : 'grid-template-columns: repeat(2, max-content);'}
  grid-gap: 6px;
`;
