import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import threekitReducer from './threekit';

const store = configureStore({
  reducer: {
    threekit: threekitReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});

export default store;
