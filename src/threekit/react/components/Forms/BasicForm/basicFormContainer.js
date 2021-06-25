import React, { useState, useEffect } from 'react';
import { useAttributes, useActiveAttribute } from '../../../hooks';
import { Modal, Drawer } from '../../Layouts';

const assetContainer = (WrappedComponent, props) => {
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

const attributesArrayContainer = (WrappedComponent, props) => {
  const [
    activeAttribute,
    attribute,
    handleSetActiveAttribute,
  ] = useActiveAttribute();
  const [childAttributes, setChildAttributes] = useState([]);

  const DisplayComponent =
    props.display === 'drawer'
      ? Drawer
      : props.display === 'modal'
      ? Modal
      : undefined;

  useEffect(() => {
    (async () => {
      if (!attribute?.value?.assetId?.length) return setChildAttributes([]);
      const player = window.threekit.player.enableApi('player');
      const item = await player.getConfiguratorInstance([
        attribute.value.assetId,
        'plugs',
        'Proxy',
        0,
        'asset',
      ]);
      setChildAttributes(item.getDisplayAttributes());
    })();
  }, [activeAttribute]);

  if (!DisplayComponent)
    return (
      <WrappedComponent
        {...props}
        title={attribute?.name}
        attributes={childAttributes}
      />
    );

  return (
    <DisplayComponent
      show={!!activeAttribute}
      handleClose={() => handleSetActiveAttribute(undefined)}
    >
      <WrappedComponent
        {...props}
        title={attribute?.name}
        attributes={childAttributes}
      />
    </DisplayComponent>
  );
};

const basicFormContainer = (WrappedComponent) => (props) => {
  if (props.activeAttribute === true)
    return attributesArrayContainer(WrappedComponent, props);
  return assetContainer(WrappedComponent, props);
};

export default basicFormContainer;
