import { ATTRIBUTE_TYPES } from '../../../constants';

import {
  Swatch,
  SwatchDetailed,
  Dropdown,
  Buttons,
  RadioButtons,
  ColorSwatch,
} from './index';

export default {
  [ATTRIBUTE_TYPES.asset]: {
    //  First option is default
    dropdown: Dropdown,
    'swatch-detailed': SwatchDetailed,
    swatch: Swatch,
    buttons: Buttons,
    'radio-buttons': RadioButtons,
    'color-swatch': ColorSwatch,
  },
};
