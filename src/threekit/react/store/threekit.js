import Controller from '../../controller';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { filterAttributesArray } from '../../utils';
import { arrayValidator } from '../validators';
import { message } from 'antd';

let HOOKS = {
  onSetConfiguration: undefined,
};

let MIDDLEWARE = {
  arrayValidation: undefined,
};

const initialState = {
  loaded: false,
  attributes: undefined,
  language: undefined,
  isPlayerLoading: false,
  allowInPlayerReorder: false,
  allowInPlayerSelect: false,
  activeAttribute: undefined,
  metadata: undefined,
};

const { actions, reducer } = createSlice({
  name: 'threekit',
  initialState,
  reducers: {
    setLoaded: (state, _) => {
      state.loaded = true;
      state.isPlayerLoading = true;
    },
    setInternalAttributesState: (state, action) => {
      state.attributes = Object.assign({}, state.attributes, action.payload);
    },
    updateLanguageState: (state, action) => {
      state.language = action.payload;
    },
    setPlayerLoading: (state, action) => {
      state.isPlayerLoading = action.payload;
    },
    setAllowInPlayerReorder: (state, action) => {
      state.allowInPlayerReorder = !!action.payload;
    },
    setAllowInPlayerSelect: (state, action) => {
      state.allowInPlayerSelect = !!action.payload;
    },
    setActiveAttribute: (state, action) => {
      state.activeAttribute = action.payload;
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
  },
});

const {
  setInternalAttributesState,
  updateLanguageState,
  setPlayerLoading,
  setMetadata,
} = actions;
export const {
  setLoaded,
  setAllowInPlayerReorder,
  setAllowInPlayerSelect,
  setActiveAttribute,
} = actions;

const getInternalAttributeState = (state) => {
  if (!state.threekit.loaded) return undefined;
  return state.threekit.attributes;
};

export const isThreekitLoaded = (state) => state.threekit.loaded;

export const isPlayerLoading = (state) => state.threekit.isPlayerLoading;

//  Languages and Translations
export const getLanguage = (state) => state.threekit.language;

export const getLanguageOptions = (state) => {
  if (!state.threekit.loaded) return [];
  return window.threekit.controller.getLanguageOptions();
};

export const setLanguage = (language) => async (dispatch) => {
  if (!language) return;
  const updatedState = window.threekit.controller.setLanguage(language);
  dispatch(updateLanguageState(language));
  dispatch(setInternalAttributesState(updatedState));
};

//  Metadata
export const getMetadata = (state) => state.threekit.metadata;

//  Attribute + Configuration state
export const getActiveAttribute = (state) => state.threekit.activeAttribute;

export const getAttributes = (attribute) =>
  createSelector(getInternalAttributeState, (attributes) => {
    if (!attributes) return undefined;
    if (!attribute) return attributes;
    return attributes[attribute] || undefined;
  });

export const setConfiguration = (config) => async (dispatch, getState) => {
  let preppedConfig = config;
  if (HOOKS.onSetConfiguration) {
    const { threekit } = getState();
    preppedConfig = await HOOKS.onSetConfiguration(
      preppedConfig,
      threekit.attributes
    );
    if (!preppedConfig) return;
  }
  dispatch(setPlayerLoading(true));
  const updatedState = await window.threekit.controller.setAttributesState(
    preppedConfig
  );
  dispatch(setInternalAttributesState(updatedState));
  dispatch(setPlayerLoading(false));
};

export const stepHistory = (step) => async (dispatch) => {
  if (isNaN(step) || step === 0) return;
  const updatedState = await window.threekit.controller.stepHistoryPosition(
    step
  );
  if (updatedState) dispatch(setInternalAttributesState(updatedState));
};

export const launch = (config) => async (dispatch) => {
  await Controller.launch({
    orgId: config.orgId,
    authToken: config.authToken,
    threekitEnv: config.threekitEnv,
    assetId: config.assetId,
    language: config.language,
    additionalTools: config.additionalTools,
  });

  dispatch(setLoaded(true));
  dispatch(setPlayerLoading(false));

  dispatch(setMetadata(window.threekit.configurator.getMetadata()));

  if (config.hooks) HOOKS = Object.assign(HOOKS, config.hooks);

  if (config.middleware) {
    Object.entries(config.middleware).forEach(([key, middleware]) => {
      MIDDLEWARE[key] = middleware;
    });
  }

  if (config.language) {
    return dispatch(setLanguage(config.language));
  }

  dispatch(
    setInternalAttributesState(window.threekit.controller.getAttributesState())
  );
};

export const getAttributesArray = (arrayLabel) =>
  createSelector(getInternalAttributeState, (attributes) => {
    if (!attributes || !arrayLabel?.length) return undefined;
    const attributesRegExp = new RegExp(`${arrayLabel} [0-9]`);
    return filterAttributesArray(attributesRegExp, attributes);
  });

export const addItemToArray = (arrayLabel) => (
  assetId,
  addToIdx = undefined
) => async (dispatch, getState) => {
  if (!assetId?.length) return;
  const { threekit } = getState();

  const attributesRegExp = new RegExp(`${arrayLabel} [0-9]`);
  const arrayAttributes = filterAttributesArray(
    attributesRegExp,
    threekit.attributes
  );

  let updateAttrIdx = addToIdx;
  let attributeToUpdate;

  if (isNaN(updateAttrIdx))
    attributeToUpdate = Object.values(arrayAttributes).find((el, idx) => {
      if (!el.value.assetId?.length) {
        updateAttrIdx = idx;
        return true;
      }
    });
  else attributeToUpdate = arrayAttributes[updateAttrIdx];

  if (!attributeToUpdate) return message.warning('Max items reached');

  let error;
  const options = Object.values(arrayAttributes)[0].values.reduce(
    (output, item) => Object.assign(output, { [item.assetId]: item }),
    {}
  );
  const updatedArray = Object.values(arrayAttributes).reduce(
    (output, attr, i) => {
      if (i !== updateAttrIdx) output.push(attr);
      else output.push({ ...attr, value: { assetId } });
      return output;
    },
    []
  );

  //  Default Validator
  error = arrayValidator(options, updatedArray);
  if (error) return message.warning(error);

  //  Custom Validator
  if (MIDDLEWARE.arrayValidation?.[arrayLabel])
    error = MIDDLEWARE.arrayValidation?.[arrayLabel](options, updatedArray);
  if (error) return message.warning(error);

  dispatch(setConfiguration({ [attributeToUpdate.name]: { assetId } }));
};

export const deleteItemFromArray = (arrayLabel) => (idx) => async (
  dispatch,
  getState
) => {
  if (isNaN(idx)) return;
  const { threekit } = getState();

  const attributesRegExp = new RegExp(`${arrayLabel} [0-9]`);
  const arrayAttributes = filterAttributesArray(
    attributesRegExp,
    threekit.attributes
  );

  let error;
  const options = Object.values(arrayAttributes)[0].values.reduce(
    (output, item) => Object.assign(output, { [item.assetId]: item }),
    {}
  );
  const updatedArray = Object.values(arrayAttributes).filter(
    (_, i) => i !== idx
  );

  //  Default Validator
  error = arrayValidator(options, updatedArray);
  if (error) return message.warning(error);

  //  Custom Validator
  if (MIDDLEWARE.arrayValidation?.[arrayLabel])
    error = MIDDLEWARE.arrayValidation?.[arrayLabel](options, updatedArray);
  if (error) return message.warning(error);

  const arrayConfigurationObj = filterAttributesArray(
    attributesRegExp,
    window.threekit.configurator.getConfiguration()
  );
  const arrayConfiguration = Object.entries(arrayConfigurationObj);
  const updatedConfiguration = arrayConfiguration.reduce(
    (output, [attributeName], i) => {
      if (i < idx) return output;
      if (!arrayConfiguration[i + 1])
        return Object.assign(output, { [attributeName]: { assetId: '' } });

      return Object.assign(output, {
        [attributeName]: arrayConfiguration[i + 1][1],
      });
    },
    {}
  );

  dispatch(setConfiguration(updatedConfiguration));
};

export const moveItemWithinArray = (arrayLabel) => (
  fromIdx,
  toIdx,
  config
) => async (dispatch, getState) => {
  if (isNaN(fromIdx) || isNaN(fromIdx)) return;
  const { threekit } = getState();

  const { method } = Object.assign({ method: 'move' }, config);

  const attributesRegExp =
    typeof arrayLabel === 'string'
      ? new RegExp(`${arrayLabel} [0-9]`)
      : arrayLabel;
  const arrayAttributes = filterAttributesArray(
    attributesRegExp,
    threekit.attributes
  );

  let error;
  const options = Object.values(arrayAttributes)[0].values.reduce(
    (output, item) => Object.assign(output, { [item.assetId]: item }),
    {}
  );

  let updatedArray;
  switch (method) {
    case 'move':
      updatedArray = Object.values(arrayAttributes).reduce(
        (output, attr, idx, srcArray) => {
          if (idx === fromIdx) return output;
          output.push(attr);
          if (idx === toIdx) output.push(srcArray[fromIdx]);
          return output;
        },
        []
      );
      break;
    default:
      break;
  }

  //  Default Validator
  error = arrayValidator(options, updatedArray);
  if (error) return message.warning(error);

  //  Custom Validator
  if (MIDDLEWARE.arrayValidation?.[arrayLabel])
    error = MIDDLEWARE.arrayValidation?.[arrayLabel](options, updatedArray);
  if (error) return message.warning(error);

  const arrayConfigurationObj = filterAttributesArray(
    attributesRegExp,
    window.threekit.configurator.getConfiguration()
  );
  const attributeKeys = Object.keys(arrayConfigurationObj);
  const arrayConfiguration = Object.values(arrayConfigurationObj);

  let updatedConfiguration;
  switch (method) {
    case 'move':
      updatedConfiguration = arrayConfiguration.reduce(
        (output, configuration, idx, srcArray) => {
          if (idx === fromIdx) return output;
          output = Object.assign(output, {
            [attributeKeys.shift()]: configuration,
          });
          if (idx === toIdx)
            output = Object.assign(output, {
              [attributeKeys.shift()]: srcArray[fromIdx],
            });
          return output;
        },
        {}
      );
      break;
    default:
      break;
  }
  dispatch(setConfiguration(updatedConfiguration));
};

export default reducer;
