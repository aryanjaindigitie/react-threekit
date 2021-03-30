import React from 'react'

import { RadioButtons } from './index'

const options = [
    { name: 'blue', value: 'blue' },
    { name: 'green', value: 'green' },
]

export default {
    title: 'Input Components/Part Reference/RadioButtons',
    component: RadioButtons,
}

const Template = (args) => <RadioButtons {...args} />

export const Primary = Template.bind({})
Primary.args = {
    title: 'Title',
    type: 'Asset',
    options,
}
