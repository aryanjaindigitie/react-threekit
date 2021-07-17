import React from 'react';
import { useAttributes, useNestedConfigurator } from '../../../hooks';
import { Modal, Drawer } from '../../Layouts';

const attributesContainer = (WrappedComponent, props) => {
  const [attributes] = useAttributes();
  return (
    <WrappedComponent
      {...props}
      attributes={Object.values(attributes || {}).filter(
        (el) => el && el.name[0] !== '_'
      )}
    />
  );
};

const nestedAttributesContainer = (WrappedComponent, props) => {
  const [
    nestedAttributes,
    address,
    setNestedAttributeAddress,
  ] = useNestedConfigurator();

  const DisplayComponent =
    props.display === 'drawer'
      ? Drawer
      : props.display === 'modal'
      ? Modal
      : undefined;

  if (!DisplayComponent)
    return (
      <WrappedComponent
        {...props}
        title={address?.[0] || ''}
        attributes={nestedAttributes}
      />
    );

  return (
    <DisplayComponent
      show={!!address}
      handleClose={() => setNestedAttributeAddress(undefined)}
    >
      <WrappedComponent
        {...props}
        title={address?.[0] || ''}
        attributes={nestedAttributes}
      />
    </DisplayComponent>
  );
};

const basicFormContainer = (WrappedComponent) => (props) => {
  if (props.nestedConfigurator)
    return nestedAttributesContainer(WrappedComponent, props);
  return attributesContainer(WrappedComponent, props);
};

export default basicFormContainer;
