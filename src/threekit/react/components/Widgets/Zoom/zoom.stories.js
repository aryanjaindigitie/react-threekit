import React from 'react';
import 'antd/dist/antd.css';

import { Zoom } from './index';

export default {
  title: 'Widgets/Zoom',
  component: Zoom,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <Zoom {...args} />;

export const Horizontal = Template.bind({});
Horizontal.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
};
