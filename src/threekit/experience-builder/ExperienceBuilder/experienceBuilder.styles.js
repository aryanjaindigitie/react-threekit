import styled from 'styled-components';

export const CatalogTableRow = styled.div`
  display: grid;
  grid-template-columns: 200px max-content;

  cursor: pointer;
  padding: 10px 5px;

  &:hover {
    background: #1890ff99;
  }
`;

export const ExperienceSelectorWrapper = styled.div`
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

export const ComponentSelectorWrapper = styled.div`
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
