import React from 'react';
import 'antd/dist/antd.css';

import { Title } from './index';

export default {
  title: 'Display/Title',
  component: Title,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Product Title',
};
