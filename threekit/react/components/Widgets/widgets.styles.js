import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  height: ${(props) => props.theme.widgetSize};
  width: ${(props) => props.theme.widgetSize};
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.primaryColor};

    .tk-icon.fill {
      fill: ${(props) => props.theme.primaryColor};
    }

    .tk-icon.stroke {
      stroke: ${(props) => props.theme.primaryColor};
    }
  }

  & > div {
    height: max-content;
    width: max-content;

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* font-size: ${(props) => `calc(${props.theme.widgetSize} * 0.45)`}; */
    font-size: 0px;
  }
`;
