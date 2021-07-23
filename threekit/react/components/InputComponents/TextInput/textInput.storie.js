import React from 'react';

import { TextInput } from './index';

const value = 'Test Value';

export default {
  title: 'Input Components/TextInput',
  component: TextInput,
};

const Template = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  value,
};
