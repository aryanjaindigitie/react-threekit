import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'styled-components';

const ordinalContianer = (WrappedComponent) => (props) => {
  const [activeItemIdx, setActiveItemIdx] = useState(null);
  const moveToIdx = useRef(null);
  const currentEl = useRef(null);
  const theme = useTheme();

  const { options, attributes, handleMoveItem, handleDeleteItem } = props;

  const handleMouseDown = (idx) => {
    moveToIdx.current = null;
    setActiveItemIdx(idx);
  };

  const handleMouseEnter = (idx) => {
    if (activeItemIdx === null) return;
    moveToIdx.current = idx;
    currentEl.current = document.getElementsByClassName(
      `tk-floor-planner-item-${idx}`
    )[0];
    if (currentEl.current && idx !== activeItemIdx)
      currentEl.current.style.background = theme.secondaryColor;
  };

  const handleMouseLeave = () => {
    if (activeItemIdx === null) return;
    moveToIdx.current = null;
    if (currentEl.current)
      currentEl.current.style.background = theme.primaryColor;
  };

  const handleMouseUp = () => {
    let fromIdx = activeItemIdx;
    let toIdx = moveToIdx.current;
    if (currentEl.current)
      currentEl.current.style.background = theme.primaryColor;
    currentEl.current = null;

    setActiveItemIdx(null);
    moveToIdx.current = null;

    if (toIdx === 'delete') return handleDeleteItem(fromIdx);

    if (fromIdx !== null && toIdx !== null && fromIdx !== toIdx)
      handleMoveItem(fromIdx, toIdx, { method: 'move' });
  };

  useEffect(() => {
    (() => {
      document.addEventListener('mouseup', handleMouseUp);
    })();
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line
  }, [activeItemIdx, moveToIdx]);

  const items = Object.values(attributes || []).reduce((output, attribute) => {
    if (!attribute.value?.assetId?.length) return output;
    output.push({
      attributeName: attribute.name,
      attributeLabel: attribute.label,
      ...attribute.value,
      ...options[attribute.value.assetId],
    });
    return output;
  }, []);

  return (
    <WrappedComponent
      {...props}
      items={items}
      handleMouseDown={handleMouseDown}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

export default ordinalContianer;
