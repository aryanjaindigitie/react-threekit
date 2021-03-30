import threekit from '../../api';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  loaded: false,
  state: undefined,
  locale: undefined,
};

const { actions, reducer } = createSlice({
  name: 'threekit',
  initialState,
  reducers: {
    setLoaded: (state, _) => {
      state.loaded = true;
    },
    setInternalState: (state, action) => {
      state.state = action.payload;
    },
    updateLocaleState: (state, action) => {
      state.locale = action.payload;
    },
  },
});

const { setInternalState, updateLocaleState } = actions;
export const { setLoaded } = actions;

const getInternalState = (state) => {
  if (!state.threekit.loaded) return undefined;
  return state.threekit.state;
};

export const isPlayerLoaded = (state) => state.threekit.loaded;

//  Locale and Translations
export const getLocale = (state) => state.threekit.locale;

export const getLocaleOptions = () => threekit.player.LOCALE_OPTIONS;

export const setLocale = (locale) => async (dispatch) => {
  if (!locale) return;
  dispatch(updateLocaleState(locale));
  const state = await threekit.player.getState({
    locale,
  });
  dispatch(setInternalState(state));
};

//  Attribute + Configuration state
export const getState = (attribute) =>
  createSelector(getInternalState, (state) => {
    if (!state) return undefined;
    return attribute && state[attribute] ? state[attribute] : state;
  });

export const setState = (config) => async (dispatch, getState) => {
  const state = getState();
  await threekit.player.setState(config);
  const updatedState = await threekit.player.getState({
    locale: state.threekit.locale,
  });
  dispatch(setInternalState(updatedState));
};

export const stepBackward = (step = 1) => async (dispatch, getState) => {
  const state = getState();
  const updatedState = await threekit.player.stepBackward(step, {
    locale: state.threekit.locale,
  });
  dispatch(setInternalState(updatedState));
};

export const stepForward = (step = 1) => async (dispatch, getState) => {
  const state = getState();
  const updatedState = await threekit.player.stepForward(step, {
    locale: state.threekit.locale,
  });
  dispatch(setInternalState(updatedState));
};

export const launch = (config) => async (dispatch) => {
  threekit.connect({
    orgId: config.orgId,
    authToken: config.authToken,
    threekitEnv: config.threekitEnv,
  });

  await threekit.player.launch(config.assetId);

  if (config.locale) dispatch(setLocale(config.locale));
  const stateOptions = Object.assign(
    {},
    config.locale ? { locale: config.locale } : undefined
  );
  const state = await threekit.player.getState(stateOptions);

  dispatch(setLoaded(true));
  dispatch(setInternalState(state));
};

export default reducer;
