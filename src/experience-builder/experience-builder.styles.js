import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 90vw;
  margin: 0 auto;
`;

export const Title = styled.div``;

export const Content = styled.div``;

export const DetailsWrapper = styled.div`
  width: 320px;
`;

export const ExperiencesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > div {
    margin-bottom: 10px;
    margin-right: 10px;
    width: 320px;
  }
`;

export const ClickableSpan = styled.span`
  color: #1890ff;
  cursor: pointer;
`;
