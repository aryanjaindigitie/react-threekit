import styled from 'styled-components';

export const ColorSwatchContent = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;

  & > div:last-child {
    margin-right: 0px;
  }
`;

export const ColorSwatchHeader = styled.div`
  padding-bottom: 5px;
`;

export const ColorOption = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${(props) => props.color};

  margin-right: 12px;
  margin-bottom: 25px;

  cursor: ${(props) => (props.loading ? 'wait' : 'pointer')};

  & > div {
    text-align: center;
    color: white;
    height: min-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;
