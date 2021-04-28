import React from 'react';
import { useAttribute, isPlayerLoading } from '../../hooks';
import { METADATA_RESERVED } from '../../../constants';

const container = (WrappedComponent) => (props) => {
  const {
    attribute,
    imgFromMetadata,
    colorFromMetadata,
    showAttributeTitle,
  } = props;
  if (!attribute) return <WrappedComponent {...props} />;

  const [attributeData, setAttribute] = useAttribute(attribute);
  if (!attributeData) return null;

  const loading = isPlayerLoading();

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

  let preppedProps = { ...props };
  if (showAttributeTitle) preppedProps.title = attributeData.label;

  return (
    <WrappedComponent
      {...preppedProps}
      attribute={attribute}
      selected={attributeData.value?.assetId}
      handleClick={handleSetAttribute}
      options={options}
      loading={loading}
    />
  );
};

export default container;
