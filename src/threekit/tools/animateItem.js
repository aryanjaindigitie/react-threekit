import { METADATA_RESERVED } from '../constants';
import { easeInOutCubic } from './tools-utils';

const animateItem = (config) => {
  const { topItemOnly, translateMetadataField, duration } = Object.assign(
    {
      topItemOnly: true,
      translateMetadataField: METADATA_RESERVED.translate,
      duration: 1000,
    },
    config
  );

  let originalPosition = {};
  let isTransformed = {};
  let animationInProgress = {};

  return () => ({
    key: 'animate-item',
    label: 'animate-item',
    active: true,
    enabled: true,
    handlers: {
      click: async (event) => {
        const hits = event.hitNodes;
        if (!hits?.length) return undefined;
        const hierarchy = [...hits[0].hierarchy];
        hierarchy.reverse();

        let itemId;
        let item;
        let nullId;
        let translateDelta;
        if (topItemOnly) {
          for (let node of hierarchy) {
            if (itemId) continue;
            if (node.type === 'Null') {
              nullId = node.nodeId;
              continue;
            }
            if (node.type === 'Item') itemId = node.nodeId;
          }
          if (!nullId) return;

          if (animationInProgress[nullId] === true) return;

          item = window.threekit.player.scene.get({ id: itemId });

          const translate = item.configurator?.metadata.find(
            (el) => el.name === translateMetadataField
          );

          if (!translate) return;

          try {
            translateDelta = Object.assign(
              { x: 0, y: 0, z: 0, duration },
              JSON.parse(translate?.defaultValue)
            );
          } catch (e) {}

          originalPosition[nullId] = window.threekit.player.scene.get({
            id: nullId,
            plug: 'Transform',
            property: 'translation',
          });
        }

        if (!(nullId in isTransformed)) isTransformed[nullId] = false;

        let start;
        const animateFrame = (timestamp) => {
          let updatedPosition = { x: undefined, y: undefined, z: undefined };
          if (start === undefined) start = timestamp;
          const elapsed = timestamp - start;
          const progress = elapsed / translateDelta.duration;
          const animPercent = easeInOutCubic(progress);

          updatedPosition = Object.keys(updatedPosition).reduce(
            (output, axis) => {
              if (!isTransformed[nullId])
                output[axis] = Math.min(
                  originalPosition[nullId][axis] +
                    translateDelta[axis] * animPercent,
                  translateDelta[axis]
                );
              else
                output[axis] = Math.min(
                  originalPosition[nullId][axis] -
                    translateDelta[axis] * animPercent,
                  translateDelta[axis]
                );
              return output;
            },
            {}
          );

          window.threekit.player.scene.set(
            {
              id: nullId,
              plug: 'Transform',
              property: 'translation',
            },
            updatedPosition
          );

          if (elapsed < translateDelta.duration) {
            window.requestAnimationFrame(animateFrame);
          } else {
            animationInProgress[nullId] = false;
            isTransformed[nullId] = !isTransformed[nullId];
          }
        };

        animationInProgress[nullId] = true;
        window.requestAnimationFrame(animateFrame);
      },
    },
  });
};

export default animateItem;
