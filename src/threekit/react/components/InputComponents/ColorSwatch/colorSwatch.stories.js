import React from 'react';
import 'antd/dist/antd.css';

import { ColorSwatch } from './index';

const options = [
  { name: 'blue', value: 'blue', colorValue: 'blue' },
  { name: 'green', value: 'green', colorValue: 'green' },
  { name: 'red', value: 'red', colorValue: 'red' },
  { name: 'yellow', value: 'yellow', colorValue: 'yellow' },
];

export default {
  title: 'Input Components/Color Swatch',
  component: ColorSwatch,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <ColorSwatch {...args} />;

export const Default = Template.bind({});
Default.args = {
  options,
};

export const Selected = Template.bind({});
Selected.args = {
  options,
  selected: options[1].value,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Color Swatch Title',
  options,
  selected: options[1].value,
};
