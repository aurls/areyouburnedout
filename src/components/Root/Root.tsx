import React from 'react';
import { useSelector } from '../../store';

import Form from '../Form';
import Prediction from '../Prediction';
import Fetching from '../Fetching';
import Error from '../Error';

import './Root.scss';

const Root: React.FC = () => {
  const error = useSelector((state) => state.root.error);
  const fetching = useSelector((state) => state.root.fetching);
  const prediction = useSelector((state) => state.root.prediction);

  if (error) {
    return <Error />
  }

  if (fetching) {
    return <Fetching />
  }

  if (prediction) {
    return <Prediction />
  }

  return (
    <div className="root">
      <Form />
    </div>
  );
};

export default Root;
