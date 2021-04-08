import React from 'react';
import { useAttribute } from '../../hooks';
import { METADATA_RESERVED } from '../../../constants';

const container = (WrappedComponent) => (props) => {
  const { attribute, imgFromMetadata, colorFromMetadata } = props;
  if (!attribute) return <WrappedComponent {...props} />;

  const [attributeData, setAttribute] = useAttribute(attribute);

  if (!attributeData) return null;

  const imgKey = imgFromMetadata || METADATA_RESERVED.imageUrl;
  const colorValKey = colorFromMetadata || METADATA_RESERVED.colorValue;

  const options = attributeData.values.map((el) =>
    Object.assign(
      {},
      el,
      {
        value: el.assetId,
      },
      el[imgKey]
        ? {
            imgUrl: (imgBaseUrl || '') + el[imgKey],
          }
        : undefined,
      el[colorValKey]
        ? {
            colorValue: el[colorValKey],
          }
        : undefined
    )
  );

  const handleSetAttribute = (assetId) => setAttribute({ assetId });

  return (
    <WrappedComponent
      {...props}
      attribute={attribute}
      selected={attributeData.selected?.assetId}
      handleClick={handleSetAttribute}
      options={options}
    />
  );
};

export default container;
