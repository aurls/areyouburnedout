import React from 'react';
import cn from 'classnames';

import './Button.scss';

interface Props {
  primary?: boolean,
  title?: string,
  onClick: () => void,
  disabled?: boolean,
  children: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
  const {
    primary = false,
    title,
    onClick,
    disabled = false,
    children
  } = props;

  const className = cn(
    'button',
    { primary }
  );

  return (
    <button
      className={className}
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
