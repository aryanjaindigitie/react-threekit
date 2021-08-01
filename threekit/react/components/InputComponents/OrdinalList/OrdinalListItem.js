import React from 'react';
import {
  ItemWrapper as Wrapper,
  ItemPrimaryWrapper as PrimaryWrapper,
  PrimaryItemContent as PrimaryContent,
  ItemSecondaryWrapper as SecondaryWrapper,
} from './ordinalList.styles';
import { Modal, Drawer } from '../../Layouts';
import { DeleteOutlined, DragOutlined } from '../../../icons';
import { CaretDownOutlined } from '@ant-design/icons';

export const OrdinalListItem = (props) => {
  const {
    name,
    idx,
    description,
    attributeName,
    handleDelete,
    handleSelect,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    activeAttribute,
    displayItemConfigurator,
  } = props;

  const handleClickDelete = (e) => {
    e.stopPropagation();
    handleDelete(idx);
  };

  const handleClickSelect = (e) => {
    e.stopPropagation();
    handleSelect(attributeName);
  };

  const ExpandableComponent = !displayItemConfigurator
    ? undefined
    : displayItemConfigurator.toLowerCase() === 'drawer'
    ? Drawer
    : displayItemConfigurator.toLowerCase() === 'modal'
    ? Modal
    : undefined;

  const handleCloseConfigurator = () => handleSelect(undefined);

  return (
    <>
      <Wrapper>
        <PrimaryWrapper
          onClick={handleClickSelect}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          showDropdown={displayItemConfigurator === 'default'}
          className={`tk-floor-planner-item tk-floor-planner-item-${idx}`}
        >
          <div onMouseDown={() => handleMouseDown(idx)}>
            <DragOutlined />
          </div>
          <PrimaryContent>
            {name ? <div>{name}</div> : null}
            {description ? <div>{description}</div> : null}
          </PrimaryContent>
          <div onClick={handleClickDelete}>
            <DeleteOutlined />
          </div>
          {displayItemConfigurator === 'default' ? (
            <div onClick={handleClickDelete}>
              <CaretDownOutlined />
            </div>
          ) : null}
        </PrimaryWrapper>
        <SecondaryWrapper>Hello</SecondaryWrapper>
      </Wrapper>
      {ExpandableComponent ? (
        <ExpandableComponent
          show={activeAttribute === attributeName}
          handleClose={handleCloseConfigurator}
        >
          {/* <ItemConfigurator name={name} assetId={assetId} /> */}
          <div>Hello Mars</div>
        </ExpandableComponent>
      ) : null}
    </>
  );
};

export default OrdinalListItem;
