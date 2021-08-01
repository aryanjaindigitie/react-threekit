import React from 'react';
import 'antd/dist/antd.css';

import { CameraToggle } from './index';

export default {
  title: 'Widgets/Camera Toggle',
  component: CameraToggle,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <CameraToggle {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = { showLabel: true };
