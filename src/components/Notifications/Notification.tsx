import React from 'react';

import './Notifications.scss';

interface Props {
  onClick: () => void
  children: React.ReactNode
}

const Notification: React.FC<Props> = (props) => {
  const {
    onClick,
    children
  } = props;

  return (
    <div className="notification" onClick={onClick}>
      {children}
    </div>
  );
};

export default Notification;
