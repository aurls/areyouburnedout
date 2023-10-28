import React from 'react';

import './Prediction.scss';

interface Props {
  toForm?: React.ReactElement
}

const PredictionError: React.FC<Props> = (props) => {
  const {
    toForm
  } = props;

  return (
    <>
      <h1 className="prediction__title">
        Error Occured 😮
      </h1>

      <p className="prediction__subtitle">
        Something went wrong. Please, check connection and try again.
      </p>

      <div className="prediction__actions">
        {toForm}
      </div>
    </>
  );
};

export default PredictionError;
