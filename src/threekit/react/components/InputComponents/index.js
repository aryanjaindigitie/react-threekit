//  container for Asset type Attributes
import assetContainer from './assetContainer';
//  Asset type attributes
import SwatchComponent from './Swatch';
import DropdownComponent from './Dropdown';
import RadioButtonsComponent from './RadioButtons';

export const Swatch = assetContainer(SwatchComponent);
export const Dropdown = assetContainer(DropdownComponent);
export const RadioButtons = assetContainer(RadioButtonsComponent);
