import React from 'react';
import { useMetadata } from '../../../hooks';

const titleContainer = (WrappedComponent) => (props) => {
  const metadata = useMetadata();
  const title = props.title || props.value || metadata?._title;
  if (!title) return null;
  return <WrappedComponent title={title} />;
};

export default titleContainer;
