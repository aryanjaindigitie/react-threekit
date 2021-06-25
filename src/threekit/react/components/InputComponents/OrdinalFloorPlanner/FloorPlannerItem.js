import React, { useContext } from 'react';
import {
  ItemWrapper as Wrapper,
  ConfigureButton,
} from './ordinalFloorPlanner.styles';
// import { icons } from '../../assets';
import { Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ItemConfigurator from './FloorPlannerItemConfigurator';
import { Modal, Drawer } from '../../Layouts';
import { OrdinalFloorPlannerContext } from './index';

export const FloorPlannerItem = (props) => {
  const {
    displayItemConfigurator,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleSelect,
    activeAttribute,
  } = useContext(OrdinalFloorPlannerContext);
  const { side, name, attributeName, assetId, metadata, idx } = props;

  const handleOpenConfigurator = (e) => {
    handleSelect(attributeName);
    e.stopPropagation();
  };

  const handleCloseConfigurator = () => handleSelect(undefined);

  const ExpandableComponent =
    displayItemConfigurator === 'modal'
      ? Modal
      : displayItemConfigurator.toLowerCase() === 'drawer'
      ? Drawer
      : undefined;

  return (
    <>
      <Tooltip title={name} placement={side}>
        <Wrapper
          onMouseDown={() => handleMouseDown(idx)}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          className={`tk-floor-planner-item tk-floor-planner-item-${idx}`}
        >
          <div>
            {metadata?._icon ? (
              <img src={metadata._icon} alt="icon" draggable={false} />
            ) : null}
            {/* <img src={icons[metadata._icon]} alt="icon" draggable={false} /> */}
          </div>
          {!!displayItemConfigurator ? (
            <ConfigureButton onClick={handleOpenConfigurator}>
              <div>
                <SettingOutlined />
              </div>
            </ConfigureButton>
          ) : null}
        </Wrapper>
      </Tooltip>
      {!!displayItemConfigurator ? (
        <ExpandableComponent
          show={activeAttribute === attributeName}
          handleClose={handleCloseConfigurator}
        >
          <ItemConfigurator name={name} assetId={assetId} />
        </ExpandableComponent>
      ) : null}
    </>
  );
};

export default FloorPlannerItem;
