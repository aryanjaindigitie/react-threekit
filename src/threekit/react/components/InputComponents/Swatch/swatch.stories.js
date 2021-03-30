import React from 'react'

import { Swatch } from './index'

const options = [
    { name: 'blue', value: 'blue' },
    { name: 'green', value: 'green' },
]

export default {
    title: 'Input Components/Part Reference/Swatch',
    component: Swatch,
}

const Template = (args) => <Swatch {...args} />

export const Primary = Template.bind({})
Primary.args = {
    type: 'Asset',
    title: 'Title',
    options,
}
