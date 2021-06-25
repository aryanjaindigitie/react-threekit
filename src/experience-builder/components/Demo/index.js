import React from 'react';
import threekit from '../../../threekit';
import { CONFIGURATION_EXPERIENCES } from '../../constants';

const { Minimalist, Ordinal } = threekit.experiences;

const prepAttributes = (attributes) =>
  atob(attributes)
    .split(',')
    .reduce((output, el) => {
      const [key, val] = el.split('::');
      return Object.assign(output, { [key]: val });
    }, {});

export const Demo = () => {
  const params = window.location.search.split('?')[1];
  let attributeComponents;
  const config = params.split('&').reduce((output, el) => {
    const [key, val] = el.split('=');
    if (key === 'attributes') {
      attributeComponents = prepAttributes(val);
      return output;
    }
    return Object.assign(output, {
      [key]: val,
    });
  }, {});

  if (config.experience === CONFIGURATION_EXPERIENCES['ordinal-interactive'])
    return (
      <Ordinal
        config={config}
        attributesArrayLabel={config.arrayAttribute}
        display={config.display}
      />
    );

  if (config.experience === CONFIGURATION_EXPERIENCES['single-product'])
    return (
      <Minimalist
        form="basic"
        config={config}
        attributeComponents={attributeComponents}
      />
    );
  if (config.experience === CONFIGURATION_EXPERIENCES['single-product-stepped'])
    return (
      <Minimalist
        form="stepped"
        config={config}
        attributeComponents={attributeComponents}
      />
    );
  if (
    config.experience ===
    CONFIGURATION_EXPERIENCES['single-product-interactive']
  )
    return (
      <Minimalist
        form="basic"
        interactive
        config={config}
        attributeComponents={attributeComponents}
      />
    );
  if (
    config.experience === CONFIGURATION_EXPERIENCES['single-product-animated']
  )
    return (
      <Minimalist
        form="stepped"
        animated
        config={config}
        attributeComponents={attributeComponents}
      />
    );

  return <div>{config.experience} experience not found.</div>;
};

export default Demo;
