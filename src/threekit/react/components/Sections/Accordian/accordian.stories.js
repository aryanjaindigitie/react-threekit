import React from 'react';

import { Accordian } from './index';
const { AccordianItem } = Accordian;

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
  title: 'Sections/Accordian',
  component: Accordian,
};

const Template = (args) => (
  <Accordian {...args}>
    {items.map((el, i) => (
      <AccordianItem key={i} label={el.label}>
        {el.content}
      </AccordianItem>
    ))}
  </Accordian>
);

export const Primary = Template.bind({});
