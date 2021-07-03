import { ATTRIBUTE_TYPES } from '../../../constants';

import {
  Swatch,
  Card,
  Dropdown,
  Buttons,
  RadioButtons,
  ColorSwatch,
  ColorPicker,
} from './index';

export default {
  [ATTRIBUTE_TYPES.asset]: {
    //  First option is default
    dropdown: Dropdown,
    card: Card,
    swatch: Swatch,
    buttons: Buttons,
    'radio-buttons': RadioButtons,
    'color-swatch': ColorSwatch,
  },
  [ATTRIBUTE_TYPES.string]: {
    //  First option is default
    dropdown: Dropdown,
  },
  [ATTRIBUTE_TYPES.color]: {
    'color-picker': ColorPicker,
  },
};
