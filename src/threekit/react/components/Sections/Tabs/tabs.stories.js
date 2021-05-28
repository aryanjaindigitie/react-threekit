import React from 'react';

import { Tabs } from './index';
const { TabItem } = Tabs;

const items = [
  {
    label: 'First Section',
    content: 'This is some content in the first section',
  },
  {
    label: 'Second Section',
    content: 'This is different content for a different section',
  },
];

export default {
  title: 'Sections/Tabs',
  component: Tabs,
};

const Template = (args) => (
  <Tabs {...args}>
    {items.map((el, i) => (
      <TabItem key={i} label={el.label}>
        {el.content}
      </TabItem>
    ))}
  </Tabs>
);

export const Primary = Template.bind({});
