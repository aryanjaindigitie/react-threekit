import React from 'react';
import { Wrapper } from './title.styles';
import container from './titleContainer';

export const Title = (props) => {
  const { title } = props;
  return <Wrapper>{title}</Wrapper>;
};

export default container(Title);
