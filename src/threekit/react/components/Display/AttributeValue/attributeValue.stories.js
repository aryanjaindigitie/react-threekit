import React from 'react';
import 'antd/dist/antd.css';

import { AttributeValue } from './index';

export default {
  title: 'Display/Attribute Value',
  component: AttributeValue,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <AttributeValue {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Blue',
};
