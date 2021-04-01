# Threekit React Boilerplate

The Threekit React Boilerplate is a feature-rich codebase, containing a vast set of tools, functionality, components, and examples to build an impressive front-end experience for a Threekit Configurator. We have everything you need to get started!

## Table of Contents

- [Threekit React Boilerplate](#threekit-react-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Quick Start](#quick-start)
    - [How to use this Boilerpate](#how-to-use-this-boilerpate)
      - [Project Setup](#project-setup)
      - [Boilerplate Overview](#boilerplate-overview)
  - [Scripts](#scripts)
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
    - [Wrappers](#wrappers)
      - [Await Loader](#await-loader)
      - [Attribute](#attribute)
  - [API](#api)
    - [Player API](#player-api)
      - [Launch](#launch)
      - [Add Player To Component (MOVE TO INTERNAL)](#add-player-to-component-move-to-internal)
      - [Get State](#get-state)
      - [Set State](#set-state)
      - [Subscribe to Attribute](#subscribe-to-attribute)
      - [Publish to Attribute](#publish-to-attribute)
      - [Save Configuration](#save-configuration)
      - [Resume Configuration](#resume-configuration)
      - [Step Backward (Undo)](#step-backward-undo)
      - [Step Forward (Redo)](#step-forward-redo)
      - [Zoom](#zoom-1)
    - [Threekit API](#threekit-api)

## Installation

### Quick Start

Clone, Fork or Download the repository to your computer and navigate to the project directory:

```sh
git clone https://github.com/Threekit/boilerplate-react.git
cd ./boilerplate-react
```

Install all the dependencies:

`yarn install`

Start development server:

`yarn start`

This should launch our Demo project, available locally on `http://localhost:3000`.

### How to use this Boilerpate

#### Project Setup

Some common best practices in setting up the boilerplate for a project:

1. Update the project `name` in the `package.json` file.
2. Update the website title in the `public/index.html` file.
3. Create a folder in the `src` folder to hold all the project-specific work.
   **_Note: since this boilerplate is in active development it is highly recommended to keep all project-specific code in a single folder which is easy to migrate to a newer release of the boilerplate_**

#### Boilerplate Overview

Our React Boilerplate follows a Provider Pattern where you wrap all the React code that will interact with the Threekit API inside the ThreekitProvider. Within the ThreekitProvider context all our components and hooks have complete flexibility in where and how they are used while still being fully connected to the Threekit API, the 3D Player, and each other.

## Scripts

All scripts are expected to be run from the project root directory. These include:

### Development Server Scripts

#### `yarn start`

Starts up the local development server on `port 3000`.

#### `yarn storybook`

Starts up the local Storybook server on `port 6006`, where you can explore and play around with our UI component library.

We use [Storybook](https://storybook.js.org/) to build, test and showcase our components. You can also use storybook to support any further development using the boilerplate by adding stories for your own components.

### Build Scripts

All React-app production builds are placed in the `build` folder, located in the project root folder. Building a project will replace any files currently in the `build` folder.

#### `yarn build`

Bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

#### `yarn build:compact`

Bundles React in production mode into a single javascript file with the name `threekit-embed.js`.

This build strategy is useful for eCommerce embeds, requiring only a single-file upload.

## React Features

### Threekit Provider

The Threekit Provider `<ThreekitProvider />` should be wrapped around the portion of the React app where the Threekit API is being used. It initializes the player and sets up a store to power all the hooks and connected components that will be used to build the UI to interact with the player.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from './threekit';
import App from './App';

const threekitConfig = {
  authToken: '3fb4asd5d-ea38-4a05-a1c3-6cf9d8dd3d48',
  assetId: 'a9a66218-bkid-4106-96fe-a0709fdc3dc1',
  orgId: '20df501b-1ef8-4bh0-sfda-2b99426624de',
  threekitEnv: 'admin-fts',
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <ThreekitProvider config={threekitConfig}>
    <App /> // All Threekit related code goes here
  </ThreekitProvider>,
  rootElement
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
  const [attribute, setAttribute] = useAttribute();
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
import { InputComponents } from './threekit';

//  Components for Part Reference type Attributes
const { RadioButtons, Dropdown, Swatch } = InputComponents;
```

Input Components Storybook coming soon!

### Widgets

#### Zoom

The `<Zoom />` component provides a simple pair of `+` and `-` buttons to update the player's zoom position.

It defaults to single increments changes but also accepts increment values to use instead.

```javascript
import { Widgets } from './threekit';

const { Zoom } = Widgets;

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
import { Widgets } from './threekit';

const { LocaleSelector } = Widgets;

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
import { Widgets } from './threekit';

const { Undo } = Widgets;

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
import { Widgets } from './threekit';

const { Redo } = Widgets;

const Component = () => {
  return (
    <div>
      // Any React content
      <Redo />
    </div>
  );
};
```

### Wrappers

#### Await Loader

The `<AwaitPlayerLoad>` will not render any content placed inside it until the Threekit API has initialized.

```javascript
import { Wrappers } from './threekit';

const { AwaitPlayerLoad } = Wrappers;

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
    import { Wrappers } from "./threekit"

    const { Attribute } = Wrappers

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

## API

```javascript
import threekitApi from './threekit';

const { player, threekit } = threekitApi;
```

### Player API

The player API has all the higher-level functionality to interact with the 3D.

```javascript
import { player } from './threekit';
```

#### Launch

```javascript
import { player } from './threekit';

const initObj = {
  //  required
  authToken: '3fb4asd5d-ea38-4a05-a1c3-6cf9d8dd3d48',
  assetId: '20df501b-1ef8-4bh0-sfda-2b99426624de',
  //  optional
  elementId: 'player-div-id',
};

player.launch(initObj);
```

#### Add Player To Component (MOVE TO INTERNAL)

```javascript
import { player } from './threekit';

player.addPlayerToComponent('player-div-id');
```

#### Get State

This method returns all the Attributes on the initialized asset and their selected values, prepped for consumption by a UI Component. It can also provide a single attribute's state if we pass it the attribute name.

For a `Part Reference` type attribute, the returned options also include their metadata and tags.

This method also excepts an options object which allows us to define the language we want the returned state to be.

```javascript
import { player } from './threekit';

//  optional
const options = {
  locale: 'IT',
};

// Returns the attributes state
const attributesState = await player.getState();

// Returns the attributes state in Italian
// as specified by the options
const attributesState = await player.getState(options);

// Returns the attribute state provided attribute
const attributeState = await player.getAttributesDisplay('Attribute Name');

// If an attribute name is provided then we
// add the options object as the second argument
const attributeState = await player.getAttributesDisplay(
  'Attribute Name',
  options
);
```

#### Set State

Use this method to update the configuration of one or multiple attributes.

```javascript
import { player } from './threekit';

const configurationUpdate = {
  'Attribute Name': { assetId: '20df501b-1ef8-4bh0-sfda-2b99426624de' },
};

const updatedState = await player.setState(configurationUpdate);
```

#### Subscribe to Attribute

Subscribing to an attribute allows you to attach a function to that attribute, which is fired every time that attribute's value or option set is updated.

If building within the `<TheekitProvider>` component as recommended you should avoid using this method and instead rely on the [useAttribute](#use-attribute) hook to connect to the attributes state.

```javascript
import { player } from './threekit';

const callback = (attributeState) => {
  console.log(attributeState);
};

player.subscribeToAttribute('Attribute Name', callback);
```

#### Publish to Attribute

Publishing to an attribute allows us to update the configuration state for that attribute.

If building within the `<TheekitProvider>` component as recommended you should avoid using this method and instead rely on the [useAttribute](#use-attribute) hook to connect to the attributes state.

```javascript
import { player } from './threekit';

const updateConfiguration = { assetId: '20df501b-1ef8-4bh0-sfda-2b99426624de' };

player.publishToAttribute('Attribute Name', updateConfiguration);
```

#### Save Configuration

Use this method to save a configuration on the Threekit platform, along with any additional metadata or thumbnail urls related to that configuration.

```javascript
import { player } from './threekit';

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

const response = await player.saveConfiguration(saveData);
```

#### Resume Configuration

Use this method to resume a configuration saved on the Threekit platform by passing it the saved configuration's Id.

```javascript
import { player } from './threekit';

await player.resumeConfiguration('20df501b-1ef8-4bh0-sfda-2b99426624de');
```

#### Step Backward (Undo)

#### Step Forward (Redo)

#### Zoom

Use this method to update the zoom position in the player.

```javascript
import { player } from './threekit';

//  Changes zoom position by +1 (value required)
player.zoom(1);

//  Changes zoom position by +1 (default)
player.zoomIn();

//  Changes zoom position by +6
player.zoomIn(6);

//  Changes zoom position by -1 (default)
player.zoomOut();

//  Changes zoom position by +8
player.zoomOut(8);
```

### Threekit API

```javascript
import { threekit } from './threekit';
```
