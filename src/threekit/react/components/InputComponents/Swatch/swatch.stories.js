import React from 'react';

import { Swatch as SwatchComponent } from './index';

const options = [
  { name: 'blue', value: 'blue' },
  { name: 'green', value: 'green' },
  { name: 'red', value: 'red' },
  { name: 'yellow', value: 'yellow' },
];

export default {
  title: 'Input Components/Swatch',
  component: SwatchComponent,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <SwatchComponent {...args} />;

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
  title: 'Swatch Title',
  options,
  selected: options[1].value,
};
