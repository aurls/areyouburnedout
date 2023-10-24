import React from 'react';

import './Button.scss';

interface Props {
  title?: string,
  onClick: () => void,
  children: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
  const {
    title,
    onClick,
    children
  } = props;

  return (
    <button
      className="button"
      type="button"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
