# Threekit React

The Threekit React Project is a feature-rich React Development Kit, containing a vast set of tools, functionality, components, and examples to build an impressive front-end experience for a Threekit Configurator. We have everything you need to get started!

## Table of Contents

- [Threekit React](#threekit-react)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Quick Start](#quick-start)
    - [How to use this Development Kit](#how-to-use-this-development-kit)
      - [Project Setup](#project-setup)
      - [Development Kit Overview](#development-kit-overview)
  - [Scripts and Deployment Strategies](#scripts-and-deployment-strategies)
    - [Development Server Scripts](#development-server-scripts)
      - [`yarn start`](#yarn-start)
      - [`yarn storybook`](#yarn-storybook)
    - [Build Scripts](#build-scripts)
      - [`yarn build`](#yarn-build)
      - [`yarn build:compact`](#yarn-buildcompact)
  - [React Features](#react-features)
    - [Threekit Provider](#threekit-provider)
    - [Player](#player)
    - [Hooks](#hooks)
      - [Use Attribute](#use-attribute)
      - [Use Zoom](#use-zoom)
      - [Use Locale](#use-locale)
      - [Use Undo](#use-undo)
      - [Use Redo](#use-redo)
    - [Input Components](#input-components)
    - [Widgets](#widgets)
      - [Zoom](#zoom)
      - [Locale Selector](#locale-selector)
      - [Undo](#undo)
      - [Redo](#redo)
    - [Displays](#displays)
      - [Title](#title)
      - [Description](#description)
      - [Attribute Title](#attribute-title)
      - [Attribute Value](#attribute-value)
    - [Wrappers](#wrappers)
      - [Await Loader](#await-loader)
      - [Attribute](#attribute)
    - [Layouts](#layouts)
      - [Accordion](#accordion)
      - [Tabs](#tabs)
      - [Modal](#modal)
      - [Drawer](#drawer)
  - [Tools](#tools)
    - [Tooltip](#tooltip)
    - [Animate Item](#animate-item)
  - [API](#api)
    - [Player API](#player-api)
    - [Configurator API](#configurator-api)
    - [Controller API](#controller-api)
      - [Save Configuration](#save-configuration)
      - [Resume Configuration](#resume-configuration)

## Installation

### Quick Start

Clone, Fork or Download the repository to your computer and navigate to the project directory:

```sh
git clone https://github.com/Threekit/threekit-react.git
cd ./threekit-react
```

Install all the dependencies:

`yarn install`

Start development server:

`yarn start`

This should launch our Demo project, available locally on `http://localhost:3000`.

### How to use this Development Kit

#### Project Setup

Some best practices in setting up the boilerplate for a project:

1. Start by replacing the existing git setup. You can do this by running `sudo rm -r .git` from the project's root directory to remove the existing git setup and start then start a new one with `git init`.
2. Update the project `name` and `homepage` in the `package.json` file.
3. Update the `<title>` tag in the `public/index.html` file.
4. Create a `.env` file in the root directory and add your Threekit Environment, Org ID, Asset ID, and Auth Token. You can use `.env.sample` as an example of what your file should look like.
5. Create a folder in the `src` folder to hold all the project-specific work.
   **_Note: since this boilerplate is in active development it is highly recommended to keep all project-specific code in a single folder which is easy to migrate to a newer release of the boilerplate_**

#### Development Kit Overview

This React Development Kit follows a 'Provider' Pattern where all the React code that interacts with the Threekit API is placed inside the ThreekitProvider. Within the ThreekitProvider context all our components and hooks have complete flexibility in where and how they're used while still fully connected to the Threekit API, the 3D Player, and each other.

## Scripts and Deployment Strategies

All scripts are expected to be run from the project root directory. These include:

### Development Server Scripts

#### `yarn start`

Starts up a local development server on accessible on `localhost:3000`.

#### `yarn storybook`

Starts up the local Storybook server on `localhost:6006`, where you can explore and play around with our UI component library.

We use [Storybook](https://storybook.js.org/) to build, test, and showcase our components. You can also use Storybook to support any further development using the boilerplate by adding stories for your own components.

### Build Scripts

All Threekit React production builds are placed in the `build` folder, located in the project root folder. Building a project will replace any files currently in the `build` folder.

#### `yarn build`

Bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

#### `yarn build:compact`

Bundles React in production mode into a single javascript file with the name `threekit-embed.js`.

This build strategy is suitable for eCommerce embeds, requiring only a single-file upload.

## React Features

### Threekit Provider

The Threekit Provider `<ThreekitProvider />` should be wrapped around the portion of the React app where the Threekit API is being used. It initializes the player and sets up a store to power all the hooks and connected components that will be used to build the UI to interact with the player.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from './threekit';
import App from './App';

const config = {
  //  Instead of using the `.env` file to store the project config
  //  these variables can also be passed explicity to the ThreekitProvider
  authToken: '3fb4asd5d-ea38-4a05-a1c3-6cf9d8dd3d48',
  assetId: 'a9a66218-bkid-4106-96fe-a0709fdc3dc1',
  orgId: '20df501b-1ef8-4bh0-sfda-2b99426624de',
  threekitEnv: 'admin-fts.threekit.com',
  // We can also pass overwrites to the default theme
  theme: { primaryColor: '#54AA54' },
};

ReactDOM.render(
  <ThreekitProvider config={config}>
    <App /> // All Threekit related code goes here
  </ThreekitProvider>,
  document.getElementById('root')
);
```

### Player

The `<Player />` component renders the Threekit 3D player.

```javascript
import { Player } from './threekit';

const ThreekitApp = () => {
  return (
    <div>
      <Player />
    </div>
  );
};
```

### Hooks

#### Use Attribute

```javascript
import { hooks } from './threekit';

const { useAttribute } = hooks;

const AttributeComponent = () => {
  const [attribute, setAttribute] = useAttribute('Attribute Name');
  return <div>{/* Custom component to use attribute */}</div>;
};
```

#### Use Zoom

`useZoom` returns an array of 2 functions: zoom-in and zoom-out. Both functions accept a single argument: the zoom increment step.

The default increment value is `1`.

```javascript
import { hooks } from './threekit';

const { useZoom } = hooks;

const ZoomComponent = () => {
  const [zoomIn, zoomOut] = useZoom();
  return (
    <div>
      // Changes zoom by +1
      <ZoomInButton onClick={zoomIn} />
      // Changes zoom -3
      <ZoomOutButton onClick={() => zoomOut(3)} />
    </div>
  );
};
```

#### Use Locale

`useLocale` returns an array that includes, respectively, the selected locale, an array of locale options (strings) and a change handler for updating the locale/language.

Changing the locale will automatically re-render all attribute components to the updated locale.

```javascript
import { hooks } from './threekit';

const { useLocale } = hooks;

const LocaleSelector = () => {
  const [selected, options, handleChange] = useLocale();
  return <div>// Any custom comopnent to use locale</div>;
};
```

#### Use Undo

`useUndo` returns a function that allows us to step our configuration back by any number of steps per increment.

```javascript
import { hooks } from './threekit';

const { useUndo } = hooks;

const UndoButton = () => {
  const undo = useUndo();

  const handleClick = () => {
    undo();
  };

  return <button onClick={handleClick}>Click to Undo</button>;
};
```

#### Use Redo

`useRedo` returns a function that allows us to step our configuration forward by any number of steps per increment after it has been stepped backwards.

```javascript
import { hooks } from './threekit';

const { useRedo } = hooks;

const RedoButton = () => {
  const redo = useRedo();

  const handleClick = () => {
    redo();
  };

  return <button onClick={handleClick}>Click to Redo</button>;
};
```

### Input Components

```javascript
import { components } from './threekit';

//  Components for Part Reference or String type Attributes
const { Buttons, RadioButtons, Dropdown, Swatch } = components;
```

To explore our Input Components library on Storybook, [click here](https://threekit.github.io/react-threekit).

### Widgets

#### Zoom

The `<Zoom />` component provides a simple pair of `+` and `-` buttons to update the player's zoom position.

It defaults to single increments changes but also accepts increment values to use instead.

```javascript
import { components } from './threekit';

const { Zoom } = components;

const Component = () => {
  return (
    <div>
      // Any React content
      <Zoom />
    </div>
  );
};
```

#### Locale Selector

The `<LocaleSelector />` component renders out a simple dropdown to toggle through all the translation options.

```javascript
import { components } from './threekit';

const { LocaleSelector } = components;

const Component = () => {
  return (
    <div>
      // Any React content
      <LocaleSelector />
    </div>
  );
};
```

#### Undo

The `<Undo />` component renders a button that allows us to step our configuration backward.

```javascript
import { components } from './threekit';

const { Undo } = components;

const Component = () => {
  return (
    <div>
      // Any React content
      <Undo />
    </div>
  );
};
```

#### Redo

The `<Redo />` component renders a button that allows us to step our configuration forward, after it has been stepped backward by any number of steps.

```javascript
import { components } from './threekit';

const { Redo } = components;

const Component = () => {
  return (
    <div>
      // Any React content
      <Redo />
    </div>
  );
};
```

### Displays

Display components can be used to display specific information anywhere in the UI.

#### Title

The `<Title />` component will display the value of the metadata key `_title` on the Catalog Item used to initialize the Player.

```javascript
import { components } from './threekit';

const { Title } = components;

const Component = () => {
  return (
    <div>
      // Content here will be rendered as normal
      <Title />
    </div>
  );
};
```

#### Description

The `<Description />` component will display the value of the metadata key `_description` on the Catalog Item used to initialize the Player.

```javascript
import { components } from './threekit';

const { Description } = components;

const Component = () => {
  return (
    <div>
      // Content here will be rendered as normal
      <Description />
    </div>
  );
};
```

#### Attribute Title

The `<AttributeTitle>` will display the translated attribute name of an attribute.

```javascript
import { components } from './threekit';

const { AttributeTitle } = components;

const Component = () => {
  return (
    <div>
      // Content here will be rendered as normal
      <AttributeTitle attribute="Attribute Name" />
    </div>
  );
};
```

#### Attribute Value

The `<AttributeValue>` will display the translated selected value of an attribute.

```javascript
import { components } from './threekit';

const { AttributeValue } = components;

const Component = () => {
  return (
    <div>
      // Content here will be rendered as normal
      <AttributeValue attribute="Attribute Name">
    </div>
  );
};
```

### Wrappers

#### Await Loader

The `<AwaitPlayerLoad>` will not render any content placed inside it until the Threekit API has initialized.

```javascript
import { components } from './threekit';

const { AwaitPlayerLoad } = components;

const Component = () => {
  return (
    <div>
      // Content here will be rendered as normal
      <AwaitPlayerLoad>
        // Content here will only be rendered // after the player has loaded
      </AwaitPlayerLoad>
    </div>
  );
};
```

#### Attribute

The `<Attribute>` is a component-oriented way to use the [`useAttribute`](#use-attribute) hook. It expects a function as its child, which takes two arguments. The first argument is the attribute data, and the second is a change handler function to update the attribute value.

```javascript
    import { components } from "./threekit"

    const { Attribute } = components

    const AttributeComponent = () => {
        return(
            <Attribute>
                {(attribute, setAttribute) => {
                    return (
                        <div>
                            // Any custom component to use attribute
                        </div>
                }}
            </Attribute>
        )
    }
```

### Layouts

Layouts are organizational components that we can use to organize the layout of our configurator. Layouts are especially useful in breaking up large sets of attributes or information into smaller, more digestible portions.

#### Accordion

```javascript
import { components } from './threekit';

const { Accordion } = components;
const { AccordionItem } = Accordion;

const App = () => {
  return (
    <Accordion>
      <AccordionItem label="Section 1 Heading">Section 1 content</AccordionItem>
      <AccordionItem label="Section 2 Heading">Section 2 content</AccordionItem>
    </Accordion>
  );
};
```

#### Tabs

```javascript
import { components } from './threekit';

const { Tabs } = components;
const { TabPane } = Tabs;

const App = () => {
  return (
    <Tabs>
      <TabPane label="Section 1 Heading">Section 1 content</TabPane>
      <TabPane label="Section 2 Heading">Section 2 content</TabPane>
    </Tabs>
  );
};
```

#### Modal

A Modal can be used to present an actionable pop-up to the user.

```javascript
import { useState } from 'react';
import { components } from './threekit';

const { Modal } = components;

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} handleClose={handleClose}>
      <div>
        Content to be placed in the modal is added as an HTML child element.
      </div>
    </Modal>
  );
};
```

#### Drawer

A Drawer can be used to present an actionable slide-out drawer to the user.

```javascript
import { useState } from 'react';
import { components } from './threekit';

const { Drawer } = components;

const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => setShowDrawer(false);

  return (
    <Drawer show={showDrawer} handleClose={handleClose}>
      <div>
        Content to be placed in the drawer is added as an HTML child element.
      </div>
    </Drawer>
  );
};
```

## Tools

Tools add functionality to the 3D-player beyond the out-of-the-box features such as scroll to zoom, drag to rotate, and right-click to pan the camera. To implement a tool it needs to be added to the array of `additionalTools` that is passed to the `<ThreekitProvider>` as part of it config object.

```javascript
import { tools } from './threekit';

const { exampleTool } = tools;

const config = {
  additionalTools: [exampleTool()],
};

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  );
};
```

### Tooltip

The `tooltip` tool displays information stored in the metadata of a catalog item as a tooltip when a user hovers over it in the Player.

```javascript
import { tools } from './threekit';

const { tooltip } = tools;

const config = {
  additionalTools: [tooltip({ metadataField: 'productName' })],
};

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  );
};
```

### Animate Item

The `animateItem` tool applies a transform (translation, rotation, re-scale), stored in the metadata of a catalog item, to the model in the 3D when the user clicks on it.

```javascript
import { tools } from './threekit';

const { animateItem } = tools;

const config = {
  additionalTools: [animateItem()],
};

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  );
};
```

## API

```javascript
const { player, configurator, controller } = window.threekit;
```

The `player` and `configurator` API are the standard API interfaces returned when initializing the Threekit Player.

### Player API

For documentation on the Player API, [click here](https://docs.threekit.com/docs/player-api).

### Configurator API

For documentation on the Configurator API, [click here](https://docs.threekit.com/docs/configurator-api).

### Controller API

The controller API has all the higher-level functionality to interact with the 3D.

```javascript
const { controller } = window.threekit;
```

#### Save Configuration

Use this method to save a configuration on the Threekit platform, along with any additional metadata or thumbnail URLs related to that configuration.

```javascript
const { controller } = window.threekit;

//  optional
const saveData = {
  metadata: {
    color: 'blue',
    sku: 'ABCD-1',
  },
  productVersion: 'v5', // defaults to v1
  thumbnail:
    'https://www.threekit.com/hubfs/Logos%20and%20Trademarks/threekit_logo_black.svg',
};

const response = await controller.saveConfiguration(saveData);
```

#### Resume Configuration

Use this method to resume a configuration saved on the Threekit platform by passing it the saved configuration's ID.

```javascript
const { controller } = window.threekit;

await controller.resumeConfiguration('20df501b-1ef8-4bh0-sfda-2b99426624de');
```
