import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Error from './PredictionError';
import Result from './PredictionResult';
import Spinner from '../../components/Spinner';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';

import './Prediction.scss';

const Prediction: React.FC = () => {
  const url = useParams();
  const { id } = url;

  const prediction = useSelector((state) => state.root.prediction);
  const fetching = useSelector((state) => state.root.fetching);
  const error = useSelector((state) => state.root.error);

  const dispatch = useDispatch();

  const onRetry = (): void => {
    dispatch(root.reset());
  };

  React.useEffect(() => {
    if (!prediction) {
      dispatch(root.getAttrition(id as string))
    }
  }, []);

  if (!fetching && !prediction) {
    // window.location.replace('/');
  }

  if (fetching) {
    return <Spinner>Searching for result...</Spinner>;
  }

  const ToForm = (
    <Link to="/">
      <Button primary onClick={onRetry} title="Test Again">
        &gt;&gt; Test Again &lt;&lt;
      </Button>
    </Link>
  );

  return (
    <div className="prediction">
      {false
        ? <Error toForm={ToForm} />
        : <Result prediction={prediction as number} toForm={ToForm} />
      }
    </div>
  );
};

export default Prediction;
