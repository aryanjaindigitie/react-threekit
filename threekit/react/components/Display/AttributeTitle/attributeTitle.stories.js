import React from 'react';
import 'antd/dist/antd.css';

import { AttributeTitle } from './index';

export default {
  title: 'Display/Attribute Title',
  component: AttributeTitle,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <AttributeTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Color',
};
