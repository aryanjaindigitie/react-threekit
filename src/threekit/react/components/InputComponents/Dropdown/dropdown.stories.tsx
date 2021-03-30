import React from 'react'
import 'antd/dist/antd.css'

import { Dropdown } from './index'

const options = [
    { name: 'blue', value: 'blue' },
    { name: 'green', value: 'green' },
]

export default {
    title: 'Input Components/Part Reference/Dropdown',
    component: Dropdown,
}

const Template = (args) => <Dropdown {...args} />

export const Primary = Template.bind({})
Primary.args = {
    type: 'Asset',
    title: 'Title',
    options,
}
