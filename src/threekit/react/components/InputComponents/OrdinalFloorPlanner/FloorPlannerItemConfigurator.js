import React from 'react';
import {
  ConfiguratorWrapper as Wrapper,
  ConfiguratorTitle as Title,
} from './ordinalFloorPlanner.styles';
import { SingleProductForm } from '../../Forms';

export const FloorPlannerItemConfigurator = ({ name }) => {
  return (
    <Wrapper>
      <Title>{name}</Title>
      <SingleProductForm nestedConfigurator />
    </Wrapper>
  );
};

export default FloorPlannerItemConfigurator;
