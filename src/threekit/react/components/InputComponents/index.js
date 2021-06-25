//  container for Asset type Attributes
import container from './attributeContainer';
//  Asset type attributes
import SwatchComponent from './Swatch';
import SwatchDetailedComponent from './SwatchDetailed';
import DropdownComponent from './Dropdown';
import ButtonsComponent from './Buttons';
import RadioButtonsComponent from './RadioButtons';
import ColorSwatchComponent from './ColorSwatch';
import SwitchComponent from './Switch';
import TextInputComponent from './TextInput';
//  Array type attributes
import OrdinalFloorPlannerComponent from './OrdinalFloorPlanner';
import OrdinalListComponent from './OrdinalList';

export const Swatch = container(SwatchComponent);
export const SwatchDetailed = container(SwatchDetailedComponent);
export const Dropdown = container(DropdownComponent);
export const Buttons = container(ButtonsComponent);
export const RadioButtons = container(RadioButtonsComponent);
export const ColorSwatch = container(ColorSwatchComponent);
export const OrdinalList = container(OrdinalListComponent);
export const OrdinalFloorPlanner = container(OrdinalFloorPlannerComponent);
OrdinalFloorPlanner.Item = OrdinalFloorPlannerComponent.Item;
// export const Switch = container(SwitchComponent);
// export const TextInput = container(TextInputComponent);
