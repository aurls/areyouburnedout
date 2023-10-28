import React from 'react';

import './Prediction.scss';

interface Props {
  value: number
}

const getRecommendation = (value) => {
  if (value < 67) {
    return 'You are fresh and full of energy. Get back to work!';
  }

  // if (value < 50) {
  //   return '';
  // }

  // if (value < 65) {
  //   return '';
  // }

  // if (value < 75) {
  //   return '';
  // }

  return 'You are so burned that all that remains is ashes.';
};

const Prediction: React.FC<Props> = (props) => {
  const {
    value
  } = props;

  const recomendation = getRecommendation(value);

  return (
    <div className="prediction">
      <h1 className="prediction__value">
        {value}%
      </h1>

      <p className="prediction__transcript">
        That's how BURNED OUT you are.
        <br />
        {recomendation}
      </p>
    </div>
  );
};

export default Prediction;
