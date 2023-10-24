import React from 'react';

import './Error.scss';

const Error: React.FC = () => {
  return (
    <div className="error">
      <h1 className="error__title">
        Error Occured!
      </h1>

      <p className="error__transcript">
        Please check your connection and try again.
      </p>
    </div>
  );
};

export default Error;
