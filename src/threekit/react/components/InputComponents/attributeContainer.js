import React from 'react';
import {
  useAttribute,
  useAttributesArray,
  useThreekitInitStatus,
  usePlayerLoadingStatus,
  useActiveAttribute,
} from '../../hooks';
import { METADATA_RESERVED, ATTRIBUTE_TYPES } from '../../../constants';

const attributesArrayContainer = (WrappedComponent, props) => {
  const {
    attributesArrayLabel,
    imgFromMetadata,
    colorFromMetadata,
    priceFromMetadata,
    descriptionFromMetadata,
  } = props;

  const loading = usePlayerLoadingStatus();

  const [
    options,
    attributes,
    addItem,
    deleteItem,
    moveItem,
  ] = useAttributesArray(attributesArrayLabel);
  const [
    activeAttribute,
    attribute,
    handleSetActiveAttribute,
  ] = useActiveAttribute();
  if (!options) return null;

  const imgKey = imgFromMetadata || METADATA_RESERVED.imageUrl;
  const colorValKey = colorFromMetadata || METADATA_RESERVED.colorValue;
  const priceKey = priceFromMetadata || METADATA_RESERVED.price;
  const descriptionKey =
    descriptionFromMetadata || METADATA_RESERVED.description;

  let preppedOptions = Object.values(options).map((el) =>
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
        : undefined,
      el.metadata[priceKey]
        ? {
            price: el.metadata[priceKey],
          }
        : undefined,
      el.metadata[descriptionKey]
        ? {
            description: el.metadata[descriptionKey],
          }
        : undefined
    )
  );

  if (WrappedComponent.compatibleAttributes.has(ATTRIBUTE_TYPES.arraySelector))
    return (
      <WrappedComponent
        isPlayerLoading={loading}
        handleClick={addItem}
        options={preppedOptions}
        {...props}
      />
    );
  else if (
    WrappedComponent.compatibleAttributes.has(ATTRIBUTE_TYPES.arrayEditor)
  )
    return (
      <WrappedComponent
        isPlayerLoading={loading}
        options={options}
        attributes={attributes}
        handleDeleteItem={deleteItem}
        handleMoveItem={moveItem}
        handleSelect={handleSetActiveAttribute}
        activeAttribute={activeAttribute}
        {...props}
      />
    );
  console.log('incompatible attribute type for this component');
  return null;
};

const attributeContainer = (WrappedComponent, props) => {
  const {
    attribute,
    imgFromMetadata,
    imgBaseUrl,
    colorFromMetadata,
    priceFromMetadata,
    descriptionFromMetadata,
    hideAttributeTitle,
  } = props;

  const loading = usePlayerLoadingStatus();

  const [attributeData, setAttribute] = useAttribute(attribute);
  if (!attributeData) return null;

  if (!WrappedComponent.compatibleAttributes.has(attributeData.type)) {
    console.log('incompatible attribute type for this component');
    return null;
  }
  const imgKey = imgFromMetadata || METADATA_RESERVED.imageUrl;
  const colorValKey = colorFromMetadata || METADATA_RESERVED.colorValue;
  const priceKey = priceFromMetadata || METADATA_RESERVED.price;
  const descriptionKey =
    descriptionFromMetadata || METADATA_RESERVED.description;

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
              : undefined,
            el.metadata[priceKey]
              ? {
                  price: el.metadata[priceKey],
                }
              : undefined,
            el.metadata[descriptionKey]
              ? {
                  description: el.metadata[descriptionKey],
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

const container = (WrappedComponent) => (props) => {
  if (props.attribute) {
    return attributeContainer(WrappedComponent, props);
  } else if (props.attributesArrayLabel) {
    return attributesArrayContainer(WrappedComponent, props);
  } else {
    return <WrappedComponent {...props} />;
  }
};

export default container;
