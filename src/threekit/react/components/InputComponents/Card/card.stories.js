import React from 'react';

import { Card } from './index';

const props = {
  options: [
    {
      name: 'Celtic',
      description: 'This is bob',
      price: 50,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Celtic_FC.svg/1200px-Celtic_FC.svg.png',
    },
    {
      name: 'Arsenal',
      description: 'This is bob',
      price: 50,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    },
    {
      name: 'Dortmund',
      description: 'This is bob',
      price: 50,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
    },
  ],
};

export default {
  title: 'Input Components/Card',
  component: Card,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = props;
