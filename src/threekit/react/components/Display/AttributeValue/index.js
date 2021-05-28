import React from 'react';
import { useAttribute } from '../../../hooks';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const AttributeValue = (props) => {
  if (!props.attribute) return null;
  const [attributeData] = useAttribute(props.attribute);
  if (!attributeData) return null;

  let value = attributeData.value;

  if (attributeData.type === ATTRIBUTE_TYPES.asset) {
    if (!attributeData.value?.assetId) return null;
    value = attributeData.values.find(
      (el) => el.assetId === attributeData.value.assetId
    )?.name;
  }

  return <span className={`attribute-value`}>{value}</span>;
};

export default AttributeValue;
