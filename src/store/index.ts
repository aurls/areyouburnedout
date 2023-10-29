import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import logger from 'redux-logger';

import type { TypedUseSelectorHook } from 'react-redux';

import { root } from '../slices';

const store = configureStore({
  reducer: {
    root: root.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type State = ReturnType<typeof store.getState>;

export const useDispatch: () => typeof store.dispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<State> = _useSelector;

export default store;
