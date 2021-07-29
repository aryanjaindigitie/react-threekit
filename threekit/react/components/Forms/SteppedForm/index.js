import React from 'react';
import {
  Wrapper,
  Content,
  ActionArea,
  StepButtons,
} from './steppedForm.styles';
import { componentOptions } from '../../InputComponents';
import container from './steppedFormContainer';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Title, Description } from '../../Display';

export const SteppedForm = (props) => {
  const {
    title,
    description,
    attributes,
    hasPrevious,
    hasNext,
    handleClickNext,
    handleClickPrevious,
    attributeComponents,
  } = Object.assign(
    {
      title: undefined,
      description: undefined,
      attributes: [],
      attributeComponents: {},
    },
    props
  );

  return (
    <Wrapper>
      {title !== false ? <Title title={title} /> : null}
      {description !== false ? <Description description={description} /> : null}
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

export default container(SteppedForm);
