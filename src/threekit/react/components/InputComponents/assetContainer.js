import React from 'react';
import { useAttribute } from '../../hooks';

const container = (WrappedComponent) => (props) => {
  const { attribute } = props;
  const [attributeData, setAttribute] = useAttribute(attribute);

  if (!attributeData) return null;

  const handleSetAttribute = (assetId) => setAttribute({ assetId });

  return (
    <WrappedComponent
      {...props}
      selected={attributeData.selected?.assetId}
      handleClick={handleSetAttribute}
      options={attributeData.values}
    />
  );
};

export default container;
