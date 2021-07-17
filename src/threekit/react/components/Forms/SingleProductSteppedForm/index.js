import React from 'react';
import {
  Wrapper,
  Title,
  Content,
  ActionArea,
  StepButtons,
} from './singleProductSteppedForm.styles';
import { componentOptions } from '../../InputComponents';
import container from './singleProductSteppedFormContainer';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export const SingleProductSteppedForm = (props) => {
  const {
    title,
    attributes,
    hasPrevious,
    hasNext,
    handleClickNext,
    handleClickPrevious,
    attributeComponents,
  } = Object.assign({ attributes: [], attributeComponents: {} }, props);

  return (
    <Wrapper>
      {title ? (
        <Title>
          {title}
          <hr />
        </Title>
      ) : null}
      <Content>
        {attributes.map((attr, i) => {
          const Component = Object.values(componentOptions[attr.type])[
            attributeComponents[attr.name] || 0
          ];
          if (!Component) {
            console.log(
              `No default component available for ${attr.type} type Attributes`
            );
            return null;
          }
          return <Component key={i} attribute={attr.name} />;
        })}
      </Content>
      <ActionArea>
        {hasPrevious ? (
          <StepButtons onClick={handleClickPrevious}>
            <ArrowLeftOutlined /> Previous
          </StepButtons>
        ) : (
          <div />
        )}
        {hasNext ? (
          <StepButtons onClick={handleClickNext}>
            Next <ArrowRightOutlined />
          </StepButtons>
        ) : (
          <div />
        )}
      </ActionArea>
    </Wrapper>
  );
};

export default container(SingleProductSteppedForm);
