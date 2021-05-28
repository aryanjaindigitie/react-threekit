import React from 'react';
import { useAttribute } from '../../../hooks';

export const AttributeTitle = (props) => {
  if (!props.attribute) return null;
  const [attributeData] = useAttribute(props.attribute);
  if (!attributeData) return null;
  return <span className={`attribute-title`}>{attributeData.label}</span>;
};

export default AttributeTitle;
