import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  height: ${(props) => props.theme.widgetSize};
  width: ${(props) =>
    props.showLabel ? 'max-content' : props.theme.widgetSize};
  border: 1px solid grey;
  cursor: pointer;
  padding: ${(props) => (props.showLabel ? '0 10px' : '0')};

  border-top-left-radius: ${(props) => `calc(${props.theme.widgetSize} / 2)`};
  border-top-right-radius: ${(props) => `calc(${props.theme.widgetSize} / 2)`};
  border-bottom-left-radius: ${(props) =>
    `calc(${props.theme.widgetSize} / 2)`};
  border-bottom-right-radius: ${(props) =>
    `calc(${props.theme.widgetSize} / 2)`};

  display: flex;
  flex-direction: row;

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
    transform: translateY(-50%);
    ${(props) =>
      !props.showLabel
        ? `
    left: 50%;
    transform: translate(-50%, -50%);
    `
        : ''};

    /* font-size: ${(props) => `calc(${props.theme.widgetSize} * 0.45)`}; */
  }
  & > div:nth-child(1) {
    font-size: 0px;
    width: max-content;
  }
  & > div:nth-child(2) {
    width: max-content;
    padding-left: 6px;

    display: ${(props) => (props.showLabel ? 'block' : 'none')};
  }
`;
