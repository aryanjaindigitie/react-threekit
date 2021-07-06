import React from 'react';
import 'antd/dist/antd.css';

import { Description } from './index';

export default {
  title: 'Display/Description',
  component: Description,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <Description {...args} />;

export const Default = Template.bind({});
Default.args = {
  description: 'This is the description for a single-product configurator.',
};
