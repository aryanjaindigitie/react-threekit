import reorderOrdinalAttributes from './reorderOrdinalAttributes';
import selectOrdinalAttributes from './selectOrdinalAttributes';

const ordinalAttributesToolkit = (arrayLabel, config) => {
  return [
    reorderOrdinalAttributes(arrayLabel, config),
    selectOrdinalAttributes(arrayLabel, config),
  ];
};

export default ordinalAttributesToolkit;
