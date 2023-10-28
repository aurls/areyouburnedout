import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import logger from 'redux-logger';

import type { TypedUseSelectorHook } from 'react-redux';

import { root, notifications } from '../slices';
import notificationMiddleware from './middlewares/notifications';

const store = configureStore({
  reducer: {
    root: root.reducer,
    notifications: notifications.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationMiddleware, logger)
});

export type State = ReturnType<typeof store.getState>;

export const useDispatch: () => typeof store.dispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<State> = _useSelector;

export default store;
