import store from '../react/store';
import {
  setAllowInPlayerSelect,
  setActiveAttribute,
} from '../react/store/threekit';
import { findHitNode } from './tools-utils';
import { attrNameToRegExp } from '../utils';

const selectOrdinalAttributes = (arrayLabel, config) => {
  const { active } = Object.assign({ active: false }, config);

  store.dispatch(setAllowInPlayerSelect(!!active));

  // Sets up our attributes names RegExp
  const attributesRegExp = attrNameToRegExp(arrayLabel);

  return () => ({
    key: 'select-ordinal-attribute',
    label: 'select-ordinal-attribute',
    active: true,
    enabled: true,
    handlers: {
      click: async (event) => {
        const { threekit } = store.getState();
        if (!threekit.allowInPlayerSelect) return;

        const clickedAttribute = findHitNode(event.hitNodes, attributesRegExp);

        if (clickedAttribute)
          store.dispatch(setActiveAttribute(clickedAttribute.name));
      },
    },
  });
};

export default selectOrdinalAttributes;
