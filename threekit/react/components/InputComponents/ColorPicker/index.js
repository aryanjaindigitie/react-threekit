import React from 'react';
import {
  BlockPicker,
  CirclePicker,
  MaterialPicker,
  ChromePicker,
} from 'react-color';
import { InputComponentTitle as Title } from '../inputComponents.styles';
import { ATTRIBUTE_TYPES } from '../../../../constants';

const components = {
  block: BlockPicker,
  circle: CirclePicker,
  material: MaterialPicker,
  chrome: ChromePicker,
};

import { Wrapper } from './colorPicker.styles';

export const ColorPicker = (props) => {
  const { title, selected, handleClick, colorPicker } = Object.assign(
    { options: [], colorPicker: 'chrome' },
    props
  );

  const Component = components[colorPicker] || components.chrome;

  const handleSelectColor = (color) => handleClick(color.rgb);

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <Component color={selected} onChangeComplete={handleSelectColor} />
    </Wrapper>
  );
};

ColorPicker.compatibleAttributes = new Set([ATTRIBUTE_TYPES.color]);

export default ColorPicker;
