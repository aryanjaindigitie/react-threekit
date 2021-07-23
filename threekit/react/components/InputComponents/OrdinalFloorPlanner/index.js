import React, { createContext } from 'react';
import {
  CanvasWrapper,
  Content,
  TrashWrapper,
} from './ordinalFloorPlanner.styles';
import Item from './FloorPlannerItem';
import { DeleteOutlined } from '@ant-design/icons';
import container from '../ordinalContainer';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const OrdinalFloorPlannerContext = createContext();

export const OrdinalFloorPlannerComponent = (props) => {
  const {
    children,
    items,
    handleSelect,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    displayItemConfigurator,
    activeAttribute,
  } = Object.assign({ displayItemConfigurator: 'modal' }, props);

  return (
    <OrdinalFloorPlannerContext.Provider
      value={{
        displayItemConfigurator,
        handleMouseDown,
        handleMouseEnter,
        handleMouseLeave,
        handleSelect,
        activeAttribute,
      }}
    >
      <CanvasWrapper>
        <Content>
          {children
            ? children(items)
            : items.map((el, i) => <Item key={i} idx={i} {...el} />)}
        </Content>
        <TrashWrapper
          className={`tk-floor-planner-item-delete`}
          onMouseEnter={() => handleMouseEnter('delete')}
          onMouseLeave={() => handleMouseLeave()}
        >
          <div>
            <DeleteOutlined />
          </div>
        </TrashWrapper>
      </CanvasWrapper>
    </OrdinalFloorPlannerContext.Provider>
  );
};

const OrdinalFloorPlanner = container(OrdinalFloorPlannerComponent);

OrdinalFloorPlanner.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.arrayEditor,
]);

OrdinalFloorPlanner.Item = Item;

export default OrdinalFloorPlanner;
