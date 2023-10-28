import React from 'react';
import NotificationItem from './Notification';
import { useSelector, useDispatch } from '../../store';
import { notifications } from '../../slices';

import './Notifications.scss';

interface Notification {
  id: string
  message: string
}

const Notifications: React.FC = () => {
  const notificationItems = useSelector((state) => state.notifications.items);

  const dispatch = useDispatch();

  return (
    <div className="notifications">
      {notificationItems.map((notification) => {
        const onClose = (): void => {
          dispatch(notifications.remove(notification.id));
        };

        return (
          <NotificationItem key={notification.id} onClick={onClose}>
            {notification.message}
          </NotificationItem>
        );
      })}
    </div>
  );
};

export type {
  Notification
};

export default Notifications;
