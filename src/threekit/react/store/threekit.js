import Controller from '../../controller';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let HOOKS = {
  onSetConfiguration: undefined,
};

const initialState = {
  loaded: false,
  state: undefined,
  language: undefined,
  isPlayerLoading: false,
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
  },
});

const {
  setInternalAttributesState,
  updateLanguageState,
  setPlayerLoading,
} = actions;
export const { setLoaded } = actions;

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

//  Attribute + Configuration state
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

  if (config.hooks) HOOKS = Object.assign(HOOKS, config.hooks);

  if (config.language) {
    return dispatch(setLanguage(config.language));
  }

  dispatch(
    setInternalAttributesState(window.threekit.controller.getAttributesState())
  );
};

export default reducer;
