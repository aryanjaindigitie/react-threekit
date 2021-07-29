import React from 'react';
import { Wrapper } from './form.styles';
import { Title, Description } from '../../Display';
import { componentOptions } from '../../InputComponents';
import container from './formContainer';

export const Form = (props) => {
  const {
    title,
    attributes,
    attributeComponents,
    nestedConfigurator,
  } = Object.assign(
    {
      title: undefined,
      description: undefined,
      attributes: [],
      attributeComponents: {},
      nestedConfigurator: false,
    },
    props
  );

  if (!attributes) return null;

  return (
    <Wrapper>
      {!nestedConfigurator ? (
        <>
          <Title title={title} />
          <Description description={description} />
        </>
      ) : null}
      {attributes.map((attr, i) => {
        const Component = Object.values(componentOptions[attr.type] || {})[
          attributeComponents[attr.name] || 0
        ];
        if (!Component) {
          console.log(
            `No default component available for ${attr.type} type Attributes`
          );
          return null;
        }
        return (
          <Component
            key={i}
            nestedConfigurator={nestedConfigurator}
            attribute={attr.name}
          />
        );
      })}
    </Wrapper>
  );
};

export default container(Form);
