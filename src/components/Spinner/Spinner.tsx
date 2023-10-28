import React from 'react';

import './Spinner.scss';

interface Props {
  children?: React.ReactNode
}

const Spinner: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="spinner">
      {children}
    </div>
  );
};

export default Spinner;
