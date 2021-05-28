//  container for Asset type Attributes
import container from './attributeContainer';
//  Asset type attributes
import SwatchComponent from './Swatch';
import DropdownComponent from './Dropdown';
import ButtonsComponent from './Buttons';
import RadioButtonsComponent from './RadioButtons';
import ColorSwatchComponent from './ColorSwatch';
import SwitchComponent from './Switch';
import TextInputComponent from './TextInput';

export const Swatch = container(SwatchComponent);
export const Dropdown = container(DropdownComponent);
export const Buttons = container(ButtonsComponent);
export const RadioButtons = container(RadioButtonsComponent);
export const ColorSwatch = container(ColorSwatchComponent);
// export const Switch = container(SwitchComponent);
// export const TextInput = container(TextInputComponent);
