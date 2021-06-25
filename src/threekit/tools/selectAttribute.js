import store from '../react/store';
import { setConfiguration } from '../react/store/threekit';
import { TK_PLAYER_DIV_ID } from '../constants';

const selectAttribute = (config) => {
  const { active } = Object.assign({ active: false }, config);

  // Sets up our attributes names RegExp
  let htmlEl;
  let attributesList;

  return () => ({
    key: 'select-attribute',
    label: 'select-attribute',
    active: true,
    enabled: true,
    handlers: {
      hover: async (event) => {
        if (!htmlEl) htmlEl = document.getElementById(TK_PLAYER_DIV_ID);
        if (!attributesList)
          attributesList = Object.keys(
            window.threekit.configurator.getConfiguration()
          );

        if (!event.hitNodes[0]) {
          htmlEl.style.cursor = 'default';
          return;
        }

        const hierarchy = [...event.hitNodes[0].hierarchy];
        hierarchy.reverse();

        let model = hierarchy.find((el) => el.type === 'Model');
        if (!model) {
          htmlEl.style.cursor = 'default';
          return;
        }

        if (attributesList.includes(model.name)) {
          htmlEl.style.cursor = 'pointer';
          return;
        }
        htmlEl.style.cursor = 'default';
      },
      click: async (event) => {
        if (!event.hitNodes[0]) return;

        const hierarchy = [...event.hitNodes[0].hierarchy];
        hierarchy.reverse();

        let model = hierarchy.find((el) => el.type === 'Model');
        if (!model) return;

        if (attributesList.includes(model.name))
          store.dispatch(setConfiguration({ _attribute: model.name }));
      },
    },
  });
};

export default selectAttribute;
