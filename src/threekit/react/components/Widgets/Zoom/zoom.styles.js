import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  ${(props) =>
    props.orientation === 'vertical'
      ? 'grid-template-rows: repeat(2, max-content);'
      : 'grid-template-columns: repeat(2, max-content);'}
  grid-gap: 6px;
`;

export const Button = styled.div`
  height: 36px;
  width: 36px;
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border: 1px solid #1890ff;
    color: #1890ff;
  }

  & > div {
    height: max-content;
    width: max-content;

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 16px;
  }
`;
