import React from 'react';
import 'antd/dist/antd.css';

import { Dropdown } from './index';

const options = [
  { name: 'blue', value: 'blue' },
  { name: 'green', value: 'green' },
  { name: 'red', value: 'red' },
  { name: 'yellow', value: 'yellow' },
];

export default {
  title: 'Input Components/Dropdown',
  component: Dropdown,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Dropdown Title',
  options,
  placeholder: 'Select a color!',
};

export const Selected = Template.bind({});
Selected.args = {
  title: 'Dropdown Title',
  options,
  placeholder: 'Select a color!',
  selected: options[1].value,
};
