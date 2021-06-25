import React from 'react';
import { Wrapper } from './description.styles';
import container from './descriptionContainer';

export const Description = (props) => {
  const { description } = props;
  return <Wrapper>{description}</Wrapper>;
};

export default container(Description);
