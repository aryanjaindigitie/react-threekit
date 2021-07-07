export const TK_PLAYER_DIV_ID = 'threekit-player';

export const DEFAULT_CLASS_NAME = `threekit-react`;

export const CLASS_NAME_PREFIX = `tk`;

const arrayValidations = {
  maxItems: 'maxItems',
};

const arrayItemValidations = {
  minAllowed: 'minAllowed',
  maxAllowed: 'maxAllowed',
  minProximityToSelf: 'minProximityToSelf',
  maxProximityToSelf: 'maxProximityToSelf',
  minProximityToStart: 'minProximityToStart',
  maxProximityToStart: 'maxProximityToStart',
  minProximityToFinish: 'minProximityToFinish',
  maxProximityToFinish: 'maxProximityToFinish',
  minProximityToEnds: 'minProximityToEnds',
  maxProximityToEnds: 'maxProximityToEnds',
  positionsNotAllowed: 'positionsNotAllowed',
  positionsAllowed: 'positionsAllowed',
};

export const ARRAY_VALIDATION = Object.assign(
  arrayValidations,
  arrayItemValidations
);

export const METADATA_RESERVED = Object.assign(
  {
    title: '_title',
    description: '_description',
    imageUrl: '_imageUrl',
    colorValue: '_colorValue',
    sku: '_sku',
    filters: '_filters',
    tooltip: '_tooltip',
    price: '_price',
    description: '_description',
    translate: '_translate',
    rotation: '_rotation',
    scale: '_scale',
  },
  //  Array type related metadata
  Object.entries(arrayItemValidations).reduce(
    (output, [key, val]) => Object.assign(output, { [key]: `_${val}` }),
    {}
  )
);

export const ATTRIBUTES_RESERVED = {
  step: '_step',
  stepTo: '_stepTo',
  attribute: '_attribute',
};

export const ATTRIBUTE_TYPES = {
  asset: 'Asset',
  string: 'String',
  number: 'Number',
  color: 'Color',
  boolean: 'Boolean',
  arraySelector: 'AttributesArraySelector',
  arrayEditor: 'AttributesArrayEditor',
};
