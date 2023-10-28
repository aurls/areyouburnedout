import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '../components/Notifications';

import { root } from '../slices';

interface State {
  items: Notification[]
}

const initialState: State = {
  items: []
};

const MAX_COUNT = 4;

const removeNotification = (id: string, state: State): void => {
  state.items = state.items.filter((i) => i.id !== id);
};

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    info: (state, action: PayloadAction<{ id: string, message: string }>) => {
      while (state.items.length >= MAX_COUNT) {
        const id = state.items[0]?.id;

        if (id) {
          removeNotification(id, state);
        }
      }

      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      removeNotification(action.payload, state);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(root.reset, () => initialState);
  }
});

export default {
  ...notifications.actions,
  reducer: notifications.reducer
};
