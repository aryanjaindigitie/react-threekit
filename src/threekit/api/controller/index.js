import { validate as isUuid } from 'uuid';
import { deepCompare } from '../utils';
import api from '../api';
import connection from '../connection';

let PRODUCTS;
let TRANSLATION_MAP;
export let LOCALE_OPTIONS;
let ASSET_ID;
let HISTORY;
let POSITION = 0;
let ATTRIBUTE_SUBSCRIBERS = {};

//  Internal Methods
const fetchProductsData = () =>
  new Promise(async (resolve, reject) => {
    if (PRODUCTS) return resolve(PRODUCTS);

    let itemsArr;
    try {
      if (!TRANSLATION_MAP) {
        TRANSLATION_MAP = await api.products.fetchTranslations();
        LOCALE_OPTIONS = Object.keys(Object.values(TRANSLATION_MAP)[1]);
      }
      itemsArr = await api.products.find();
      if (!itemsArr) return reject('no items');
      PRODUCTS = itemsArr.reduce(
        (output, item) => Object.assign(output, { [item.id]: item }),
        {}
      );
      resolve(PRODUCTS);
    } catch (e) {
      reject(e);
    }
  });

const pushToHistory = (historyItem) => {
  if (!HISTORY) {
    HISTORY = [historyItem];
    return;
  }

  if (POSITION === HISTORY.length - 1) {
    HISTORY.push(historyItem);
    POSITION++;
    return;
  }

  HISTORY.splice(POSITION + 1);
  HISTORY.push(historyItem);
  POSITION++;
};

const compareAttributes = (configuration1, configuration2) => {
  let updatedAttributes = new Set([]);
  const attributes1 = Object.keys(configuration1);
  const attributes2 = Object.keys(configuration2);

  if (attributes1.length !== attributes2.length) {
    attributes1
      .filter((attribute) => attributes2.indexOf(attribute) == -1)
      .forEach((attribute) => updatedAttributes.add(attribute));
  }

  for (let key of attributes1) {
    const value1 = configuration1[key];
    const value2 = configuration2[key];

    if (typeof value1 !== typeof value2) {
      updatedAttributes.add(key);
      continue;
    }

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!deepCompare(value1, value2)) {
        updatedAttributes.add(key);
      }
      continue;
    }

    if (value1 !== value2) updatedAttributes.add(key);
  }

  return Array.from(updatedAttributes);
};

const broadcastToAttribute = (attributeName, data) => {
  if (!attributeName || !ATTRIBUTE_SUBSCRIBERS[attributeName]) return;
  Object.values(ATTRIBUTE_SUBSCRIBERS[attributeName]).forEach((callback) =>
    callback(data)
  );
};

const hydrateAttributes = (attributes, configuration, options = {}) => {
  const hydrateAsset = (attribute) => {
    const { locale } = options;
    let hiddenValues = new Set([]);

    if (attribute.hiddenValues?.length) {
      attribute.hiddenValues.forEach((el) =>
        isUuid(el) ? hiddenValues.add(el) : undefined
      );
    }

    const values = attribute.values.map((el) => ({
      ...el,
      name:
        locale?.length && TRANSLATION_MAP[el.name]?.[locale]
          ? TRANSLATION_MAP[el.name]?.[locale]
          : el.name,
      metadata: PRODUCTS[el.assetId]?.metadata,
      tags: PRODUCTS[el.assetId]?.tags,
      disabled: hiddenValues.has(el.assetId),
    }));

    const selectedAsset = configuration[attribute.name];

    return {
      ...attribute,
      label:
        locale?.length && TRANSLATION_MAP[attribute.name]?.[locale]
          ? TRANSLATION_MAP[attribute.name]?.[locale]
          : attribute.name,
      values,
      selected: selectedAsset
        ? Object.assign({}, selectedAsset, {
            name: PRODUCTS[selectedAsset.assetId]?.name,
            metadata: PRODUCTS[selectedAsset.assetId]?.metadata,
            tags: PRODUCTS[selectedAsset.assetId]?.tags,
            disabled: hiddenValues.has(selectedAsset.assetId),
          })
        : undefined,
    };
  };

  const hydrateString = (attribute) => ({
    ...attribute,
    selected: configuration[attribute.name],
  });

  const hydrateColor = (attribute) => ({
    ...attribute,
    selected: configuration[attribute.name],
  });

  const hydrateNumber = (attribute) => ({
    ...attribute,
    selected: configuration[attribute.name],
  });

  const hydrateAttribute = (attribute) => {
    switch (attribute.type) {
      case 'String':
        return hydrateString(attribute);
      case 'Asset':
        return hydrateAsset(attribute);
      case 'Color':
        return hydrateColor(attribute);
      case 'Number':
        return hydrateNumber(attribute);
      default:
        return undefined;
    }
  };

  return attributes.reduce((output, attribute) => {
    const hydratedAttribute = hydrateAttribute(attribute);
    if (!hydratedAttribute) return output;
    return Object.assign(output, {
      [attribute.name]: hydratedAttribute,
    });
  }, {});
};

const createThreekitScript = (options, callback) => {
  const script = document.createElement('script');
  script.src = options.bundleUrl?.length
    ? options.bundleUrl
    : `${
        options.threekitEnv?.length
          ? `${options.threekitEnv}`
          : 'admin.threekit.com'
      }/app/js/threekit-player-bundle.js`;
  script.id = 'threekit-player-bundle';

  script.onload = () => callback();

  return script;
};

const createPlayerLoader = () => {
  const playerElement = document.createElement('div');
  playerElement.setAttribute('id', 'player-root');
  playerElement.style.height = '100%';

  const playerLoader = document.createElement('div');
  playerLoader.appendChild(playerElement);
  playerLoader.style.opacity = '0';

  return playerLoader;
};

const initializePlayer = (initializationObj) =>
  new Promise(async (resolve) => {
    const el = document.getElementById(
      initializationObj.elementId?.length
        ? initializationObj.elementId
        : 'player-root'
    );
    if (!el) return;
    const api = await window.threekitPlayer({
      el,
      authToken: initializationObj.authToken,
      assetId: initializationObj.assetId,
    });
    const configurator = await api.getConfigurator();

    window.threekit = { api, configurator };
    resolve({ api, configurator });
  });

//  Player API Methods
export const launch = (initializationObj) => {
  if (window.threekit) return;

  const connectionObj = connection.getConnection();
  if (!connectionObj) {
    throw new Error('Please connect to threekit');
  }

  let callbackArgs;

  if (typeof initializationObj === 'string') {
    ASSET_ID = initializationObj;
    callbackArgs = {
      authToken: connectionObj.authToken,
      assetId: initializationObj,
    };
  } else {
    ASSET_ID = initializationObj.assetId;
    callbackArgs = callbackArgs = {
      authToken: connectionObj.authToken,
      ...initializationObj,
    };
  }

  return new Promise((resolve) => {
    const scriptOnLoad = async () => {
      //  Pre launch
      if (typeof initializationObj !== 'string' && initializationObj?.preLaunch)
        initializationObj.preLaunch();

      //  Initialization & Product Fetching
      fetchProductsData();
      const threekitApi = await initializePlayer(callbackArgs);

      //  Post Launch
      if (typeof initializationObj !== 'string') {
        if (initializationObj.additionalTools?.length)
          initializationObj.additionalTools.forEach((tool) =>
            threekitApi.api.tools.addTool(tool(threekitApi.api))
          );
        if (initializationObj?.postLaunch)
          initializationObj.postLaunch(threekitApi.api);
      }
      resolve(threekitApi);
    };

    const scriptEl = createThreekitScript(
      {
        bundleUrl:
          typeof initializationObj === 'string'
            ? undefined
            : initializationObj.bundleUrl,
        threekitEnv: connectionObj.threekitEnv,
      },
      scriptOnLoad
    );
    const playerLoader = createPlayerLoader();

    document.body.appendChild(playerLoader);
    document.head.appendChild(scriptEl);
  });
};

export const addPlayerToComponent = (moveToElementId) => {
  const addPlayer = (tryCount = 0) => {
    if (tryCount >= 10) return;

    let player = document.getElementById('player-root');
    const playerWrapper = document.getElementById(moveToElementId);

    if (!player || !playerWrapper)
      return setTimeout(() => {
        addPlayer(tryCount + 1);
      }, 0.05 * 1000);

    if (!player) throw new Error('Initial Player element not found');
    if (!playerWrapper) throw new Error('Move To element not found');

    playerWrapper.appendChild(player);
  };

  addPlayer();
};

//  State (Configuration / Attributes) Interaction Methods
export const getState = (...args) =>
  new Promise(async (resolve, reject) => {
    if (!window.threekit) {
      setTimeout(async () => {
        const output = await getState();
        resolve(output);
      }, 0.2 * 1000);
      return;
    }

    let attribute;
    let options = {};

    if (args.length === 2) {
      attribute = args[0];
      options = args[1];
    } else if (args.length === 1) {
      if (typeof args[0] === 'string') attribute = args[0];
      else options = args[0];
    }

    await fetchProductsData();
    const attributes = window.threekit.configurator.getAttributes();
    const configuration = window.threekit.configurator.getConfiguration();

    const prepped = hydrateAttributes(attributes, configuration, options);

    resolve(attribute && prepped[attribute] ? prepped[attribute] : prepped);
  });

export const setState = (configurationChange) => {
  if (!window.threekit) {
    setTimeout(async () => {
      return await setState(configurationChange);
      // resolve(output)
    }, 0.2 * 1000);
  }

  return new Promise(async (resolve) => {
    //  Current State
    const currentConfiguration = window.threekit.configurator.getConfiguration();
    const currentAttributes = window.threekit.configurator.getAttributes();
    const currentAttributesObj = currentAttributes.reduce(
      (output, attribute) =>
        Object.assign(output, { [attribute.name]: attribute }),
      {}
    );

    //  State Update
    await window.threekit.configurator.setConfiguration(configurationChange);

    //  Updated State
    const updatedConfiguration = window.threekit.configurator.getConfiguration();
    const updatedAttributes = window.threekit.configurator.getAttributes();
    const updatedAttributesObj = updatedAttributes.reduce(
      (output, attribute) =>
        Object.assign(output, { [attribute.name]: attribute }),
      {}
    );

    //  Calculate changes in configuration and attributes
    const attributesToUpdate = new Set([]);

    const configurationDelta = compareAttributes(
      currentConfiguration,
      updatedConfiguration
    );

    //  If the configuration hasn't changed the attributes
    //  wouldn't have changed either and the state hasn't changed
    if (!configurationDelta.length) return;

    const changedAttributesData = compareAttributes(
      currentAttributesObj,
      updatedAttributesObj
    );
    configurationDelta.forEach((attr) => attributesToUpdate.add(attr));
    changedAttributesData.forEach((attr) => attributesToUpdate.add(attr));

    const updatedState = hydrateAttributes(
      updatedAttributes,
      updatedConfiguration
    );

    //  Broadcast to all the attributes which changed
    Array.from(attributesToUpdate).forEach((attributeName) => {
      broadcastToAttribute(attributeName, updatedState[attributeName]);
    });

    // pushToHistory({
    //   change: configurationChange,
    //   updatedConfiguration: updatedConfiguration,
    // });
    pushToHistory([configurationChange, updatedConfiguration]);

    resolve(updatedState);
  });
};

//  Subscription approach - Untested
export const subscribeToAttribute = (attributeName, callback) => {
  if (!ATTRIBUTE_SUBSCRIBERS[attributeName])
    ATTRIBUTE_SUBSCRIBERS[attributeName] = {};

  const key = shortid.generate();
  ATTRIBUTE_SUBSCRIBERS[attributeName][key] = callback;

  return () => {
    delete ATTRIBUTE_SUBSCRIBERS[attributeName][key];
  };
};

export const publishToAttribute = (attributeName, value) => {
  if (!attributeName) return;
  setState({ [attributeName]: value });
};

//  Bom functionality
export const getBom = () => {
  const configuration = window.threekit.configurator.getConfiguration();
  const bom = Object.entries(configuration).reduce(
    (output, [attribute, selection]) => {
      if (typeof selection === 'object' && selection.assetId) {
        return Object.assign(output, {
          [attribute]: {
            ...selection,
            metadata: PRODUCTS[selection.assetId].metadata,
          },
        });
      }

      return Object.assign(output, { [attribute]: selection });
    },
    {}
  );
  return { bom, configuration };
};

//  Wrappers for interaction with configuration service
export const saveConfiguration = (data = {}, options = {}) =>
  new Promise(async (resolve) => {
    const { productVersion, metadata, thumbnail } = Object.assign(
      {
        productVersion: 'v1',
        metadata: {},
        thumbnail: '',
      },
      data
    );
    const { returnResumeLink } = Object.assign(
      {
        returnResumeLink: false,
      },
      options
    );
    const configuration = window.threekit.configurator.getConfiguration();
    const config = await api.configurations.save({
      assetId: ASSET_ID,
      configuration,
      productVersion,
      metadata,
      thumbnail,
    });
    resolve(config);
  });

export const resumeConfiguration = (configurationId) =>
  new Promise(async (resolve) => {
    if (!configurationId) return;
    const config = await api.configurations.fetch(configurationId);
    setState(config.variant);
    resolve();
  });

//  History - undo/redo
export const updateHistoryPosition = (step, options) =>
  new Promise(async (resolve) => {
    if (typeof step !== 'number' || step === 0) return resolve();
    if (POSITION + step < 0 || POSITION + step > HISTORY.length - 1)
      return resolve();
    POSITION += step;
    const updatedConfiguration = HISTORY[POSITION];
    await window.threekit.configurator.setConfiguration(
      updatedConfiguration[1]
    );
    const state = await getState(options);
    resolve(state);
  });

//  Zoom
export const zoom = (step) => {
  if (typeof step !== 'number' || step === 0) return;
  window.threekit.api.camera.zoom(step);
};

export const zoomIn = (increment) => zoom(increment ? Math.abs(increment) : 1);

export const zoomOut = (increment) =>
  zoom(increment ? -1 * Math.abs(increment) : -1);
