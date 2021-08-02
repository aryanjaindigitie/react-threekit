import React from 'react';
import { useAttributes, useNestedConfigurator } from '../../../hooks';
import { Modal, Drawer } from '../../Layouts';

const attributesContainer = (WrappedComponent, props) => {
  const [attributes] = useAttributes();
  const { includeReservedAttributes, attributeComponents } = Object.assign(
    { includeReservedAttributes: false, attributeComponents: {} },
    props
  );

  const filterAttributes = Object.values(attributes || {}).filter((attr) => {
    if (!attr) return false;
    if (!includeReservedAttributes && attr?.name?.[0] === '_') return false;
    if (attr?.name in attributeComponents) {
      if ([undefined, false].includes(attributeComponents[attr.name]))
        return false;
    }
    return true;
  });

  return <WrappedComponent {...props} attributes={filterAttributes} />;
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

const formContainer = (WrappedComponent) => (props) => {
  if (props.nestedConfigurator)
    return nestedAttributesContainer(WrappedComponent, props);
  return attributesContainer(WrappedComponent, props);
};

export default formContainer;
