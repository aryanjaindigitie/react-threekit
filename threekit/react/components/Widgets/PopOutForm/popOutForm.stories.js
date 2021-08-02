import React from 'react';
import 'antd/dist/antd.css';

import { PopOutForm } from './index';

export default {
  title: 'Widgets/Pop-out Form',
  component: PopOutForm,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <PopOutForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  orientation: 'bottom-left',
};
