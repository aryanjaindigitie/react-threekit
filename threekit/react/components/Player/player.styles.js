import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  position: relative;

  user-select: none;
`;
