import React from 'react';
import {
  useAttribute,
  useThreekitInitStatus,
  usePlayerLoadingStatus,
} from '../../hooks';
import { METADATA_RESERVED, ATTRIBUTE_TYPES } from '../../../constants';

const container = (WrappedComponent) => (props) => {
  const {
    attribute,
    imgFromMetadata,
    imgBaseUrl,
    colorFromMetadata,
    hideAttributeTitle,
  } = props;

  if (!attribute) return <WrappedComponent {...props} />;

  const loading = usePlayerLoadingStatus();

  const [attributeData, setAttribute] = useAttribute(attribute);
  if (!attributeData) return null;

  if (!WrappedComponent.compatibleAttributes.has(attributeData.type)) {
    console.log('incompatible attribute type for this component');
    return null;
  }
  const imgKey = imgFromMetadata || METADATA_RESERVED.imageUrl;
  const colorValKey = colorFromMetadata || METADATA_RESERVED.colorValue;

  let options = attributeData.values;
  let selected = attributeData.value;

  if (attributeData.type === ATTRIBUTE_TYPES.asset) {
    selected = attributeData.value.assetId;
    options = attributeData.values
      ? attributeData.values.map((el) =>
          Object.assign(
            {},
            el,
            {
              value: el.assetId,
            },
            el.metadata[imgKey]
              ? {
                  imageUrl: (imgBaseUrl || '') + el.metadata[imgKey],
                }
              : undefined,
            el.metadata[colorValKey]
              ? {
                  colorValue: el.metadata[colorValKey],
                }
              : undefined
          )
        )
      : [];
  }

  const handleSetAttribute = (value) => setAttribute(value);

  let preppedProps = { ...props };
  if (!hideAttributeTitle) preppedProps.title = attributeData.label;

  return (
    <WrappedComponent
      {...preppedProps}
      attribute={attribute}
      selected={selected}
      handleClick={handleSetAttribute}
      options={options}
      isPlayerLoading={loading}
    />
  );
};

export default container;
