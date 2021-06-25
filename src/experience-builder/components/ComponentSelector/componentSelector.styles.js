import styled from 'styled-components';

export const Wrapper = styled.div`
  hr {
    width: 80%;
    height: 1px;
    background: #ddd;
    outline: none;
    border: none;
    margin: 20px auto;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  margin-bottom: 25px;
`;

export const SelectedExperienceWrapper = styled(Title)`
  span {
    text-transform: capitalize;
    padding-left: 4px;
  }
`;

export const AttributeRow = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-gap: 20px;

  margin-bottom: 12px;
`;

export const OrdinalCustomizerWrapper = styled.div`
  & > div {
    display: grid;
    grid-template-columns: 200px auto;
    grid-gap: 20px;

    margin-bottom: 12px;
  }
`;
