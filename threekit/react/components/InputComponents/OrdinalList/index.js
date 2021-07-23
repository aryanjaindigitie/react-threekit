import React from 'react';
import { Wrapper, Title, ListWrapper } from './ordinalList.styles';
import Item from './OrdinalListItem';
import container from '../ordinalContainer';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const OrdinalListComponent = (props) => {
  const {
    title,
    items,
    handleSelect,
    handleDeleteItem,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    displayItemConfigurator,
    activeAttribute,
  } = Object.assign({ items: [], displayItemConfigurator: 'default' }, props);

  return (
    <Wrapper>
      {title ? <Title>{title}</Title> : null}
      <ListWrapper>
        {items.map((item, i) => (
          <Item
            key={i}
            idx={i}
            {...item}
            displayItemConfigurator={displayItemConfigurator}
            activeAttribute={activeAttribute}
            handleDelete={handleDeleteItem}
            handleSelect={handleSelect}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleMouseDown={handleMouseDown}
          />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

const OrdinalList = container(OrdinalListComponent);

OrdinalList.compatibleAttributes = new Set([ATTRIBUTE_TYPES.arrayEditor]);

export default OrdinalList;
