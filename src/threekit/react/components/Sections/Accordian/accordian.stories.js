import React from 'react';
import { Story } from '@storybook/react';
import { SectionProps } from '../index';

import { Accordian } from './index';
const { AccordianItem } = Accordian;

const items = [
  { label: 'Demo', content: 'hello mars' },
  { label: 'Test', content: 'hello mars' },
];

export default {
  title: 'Sections/Accordian',
  component: Accordian,
};

const Template = (args) => (
  <Accordian {...args}>
    <AccordianItem label="Section 1">Content</AccordianItem>
    <AccordianItem label="Section 2">Content</AccordianItem>
  </Accordian>
);

export const Primary = Template.bind({});
