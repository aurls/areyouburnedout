import { createListenerMiddleware } from '@reduxjs/toolkit';
import { notifications } from '../../slices'

const notificationsListener = createListenerMiddleware();

const TIMEOUT = 3000;

notificationsListener.startListening({
  actionCreator: notifications.info,
  effect: (action, listenerApi) => {
    setTimeout(() => {
      listenerApi.dispatch(notifications.remove(action.payload.id));
    }, TIMEOUT);
  }
});

export default notificationsListener.middleware;
