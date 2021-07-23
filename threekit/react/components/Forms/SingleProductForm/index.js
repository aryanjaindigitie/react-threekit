import React from 'react';
import { Wrapper, Title } from './singleProductForm.styles';
import { componentOptions } from '../../InputComponents';
import container from './singleProductFormContainer';

export const SingleProductForm = (props) => {
  const {
    title,
    attributes,
    attributeComponents,
    nestedConfigurator,
  } = Object.assign(
    { attributes: [], attributeComponents: {}, nestedConfigurator: false },
    props
  );

  if (!attributes) return null;

  return (
    <Wrapper>
      {title ? <Title>{title}</Title> : null}
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

export default container(SingleProductForm);
