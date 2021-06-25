import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;

  hr {
    width: 200px;
    margin: 12px 0;
    margin-top: 8px;
    border: none;
    outline: none;
    height: 1px;
    background: #ddd;
  }
`;

export const Content = styled.div`
  min-height: 250px;
`;

export const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 40px;
`;

export const StepButtons = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
    font-style: italic;
  }
`;
