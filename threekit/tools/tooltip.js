import { METADATA_RESERVED } from '../constants';

const classNames = {
  tooltip: 'threekit-tooltip',
  tooltipInner: 'threekit-tooltip-inner',
  tooltipContent: 'threekit-tooltip-content',
  tooltipArrow: 'threekit-tooltip-arrow',
};

const styles = `
  .${classNames.tooltip} {
    position: absolute;
    left: -300px;
    top: -300px;
    transform: translateY(calc(-100% - 20px)) translateX(-50%);

    display: none;

    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    line-height: 1.5715;
    max-width: 250px;

  }

  .${classNames.tooltipInner} {
    min-width: 30px;
    min-height: 32px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    background-color: rgba(0,0,0,.6);
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  }

  .${classNames.tooltipArrow} {
    position: absolute;
    display: block;
    left: 50%;
    transform: translateX(-50%);

    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    
    border-top: 8px solid rgba(0,0,0,.6);

    overflow: hidden;
    pointer-events: none;
    
  }
`;

const tooltip = (config = {}) => {
  const { duration, metadataField, prepOutput } = Object.assign(
    {
      duration: 0.7,
      metadataField: METADATA_RESERVED.tooltip,
      prepOutput: undefined,
    },
    config
  );

  const css = document.createElement('style');

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName('head')[0].appendChild(css);

  const tooltipDiv = document.createElement('div');
  tooltipDiv.classList.add(classNames.tooltip);

  const tooltipContentDiv = document.createElement('div');
  tooltipContentDiv.classList.add(classNames.tooltipContent);

  const tooltipInnerDiv = document.createElement('div');
  tooltipInnerDiv.classList.add(classNames.tooltipInner);

  const tooltipArrowDiv = document.createElement('div');
  tooltipArrowDiv.classList.add(classNames.tooltipArrow);

  tooltipContentDiv.appendChild(tooltipInnerDiv);
  tooltipContentDiv.appendChild(tooltipArrowDiv);

  tooltipDiv.appendChild(tooltipContentDiv);

  document.getElementsByTagName('body')[0].appendChild(tooltipDiv);

  let timeout;

  const hideTooltip = () => {
    tooltipDiv.style.display = 'none';
    tooltipDiv.style.top = '-300px';
    tooltipDiv.style.left = '-300px';
  };

  return (player) => ({
    key: 'tooltip',
    label: 'tooltip',
    active: true,
    enabled: true,
    handlers: {
      mousedown: () => {
        if (!timeout) return;
        clearTimeout(timeout);
        hideTooltip();
      },
      hover: async (event) => {
        const hits = event.hitNodes;
        if (!hits.length) return;
        const hierarchy = [...hits[0].hierarchy];
        hierarchy.reverse();

        for (let node of hierarchy) {
          if (node.type === 'Item') {
            const item = player.scene.get({
              id: node.nodeId,
            });
            const tooltip = item.configurator.metadata.find(
              (el) => el.name === metadataField
            );
            if (tooltip?.defaultValue?.length) {
              if (timeout) clearTimeout(timeout);
              const tooltipEl = document.getElementsByClassName(
                classNames.tooltip
              )[0];
              const tooltipInnerEl = document.getElementsByClassName(
                classNames.tooltipInner
              )[0];

              //  Updates the tooltip
              tooltipEl.style.display = 'block';
              tooltipEl.style.top = event.originalEvent.pageY + 'px';
              tooltipEl.style.left = event.originalEvent.pageX + 'px';
              tooltipInnerEl.innerHTML = prepOutput
                ? prepOutput(tooltip.defaultValue)
                : tooltip.defaultValue;

              //
              timeout = setTimeout(() => hideTooltip(), duration * 1000);
              break;
            }
          }
        }
      },
    },
  });
};

export default tooltip;
