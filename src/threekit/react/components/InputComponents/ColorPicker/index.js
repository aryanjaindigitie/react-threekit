import React from 'react';
import {
  BlockPicker,
  CirclePicker,
  MaterialPicker,
  ChromePicker,
} from 'react-color';
import { ATTRIBUTE_TYPES } from '../../../../constants';
import { Wrapper, Header, OptionsWrapper } from './colorPicker.styles';

const components = {
  block: BlockPicker,
  circle: CirclePicker,
  material: MaterialPicker,
  chrome: ChromePicker,
};

export const ColorPicker = (props) => {
  const { title, selected, options, handleClick, colorPicker } = Object.assign(
    { options: [], colorPicker: 'chrome' },
    props
  );

  const Component = components[colorPicker] || components.chrome;

  const handleSelectColor = (color) => handleClick(color.rgb || color.hex);

  return (
    <Wrapper>
      {title && <Header>{title}</Header>}
      {options.length ? (
        <OptionsWrapper>
          <CirclePicker
            color={selected}
            onChangeComplete={handleSelectColor}
            colors={options}
          />
        </OptionsWrapper>
      ) : null}
      <Component color={selected} onChangeComplete={handleSelectColor} />
    </Wrapper>
  );
};

ColorPicker.compatibleAttributes = new Set([ATTRIBUTE_TYPES.color]);

export default ColorPicker;
