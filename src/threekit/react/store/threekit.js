import { Controller } from '../../api';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  loaded: false,
  state: undefined,
  language: undefined,
};

const { actions, reducer } = createSlice({
  name: 'threekit',
  initialState,
  reducers: {
    setLoaded: (state, _) => {
      state.loaded = true;
    },
    setInternalAttributesState: (state, action) => {
      state.attributes = Object.assign({}, state.attributes, action.payload);
    },
    updateLanguageState: (state, action) => {
      state.language = action.payload;
    },
  },
});

const { setInternalAttributesState, updateLanguageState } = actions;
export const { setLoaded } = actions;

const getInternalAttributeState = (state) => {
  if (!state.threekit.loaded) return undefined;
  return state.threekit.attributes;
};

export const isPlayerLoaded = (state) => state.threekit.loaded;

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
    return attribute && attributes[attribute]
      ? attributes[attribute]
      : attributes;
  });

export const setConfiguration = (config) => async (dispatch) => {
  const updatedState = await window.threekit.controller.setAttributesState(
    config
  );
  dispatch(setInternalAttributesState(updatedState));
};

export const stepHistory = (step) => async (dispatch) => {
  if (typeof step !== 'number' || step === 0) return;
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
    language: 'EN',
  });

  dispatch(setLoaded(true));
  dispatch(
    setInternalAttributesState(window.threekit.controller.getAttributesState())
  );
};

export default reducer;
