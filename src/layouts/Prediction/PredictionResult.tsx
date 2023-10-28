import React from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../../components/Button';
import { useDispatch } from '../../store';
import { notifications } from '../../slices';

import './Prediction.scss';

interface Props {
  prediction: number
  toForm: React.ReactElement
}

const PredictionResult: React.FC<Props> = (props) => {
  const {
    prediction,
    toForm
  } = props;

  const dispatch = useDispatch();

  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      dispatch(notifications.info({ id: uuid(), message: 'Link copied to clipboard' }));
    } catch {
      console.error('Could not copy href');
    }
  };

  return (
    <>
      <h1 className="prediction__title">
        {prediction}% 😰
      </h1>

      <p className="prediction__subtitle">
        subtitlr
      </p>

      <p className="prediction__description">
        descurptin
      </p>

      <div className="prediction__actions">
        {toForm}

        <Button onClick={onCopy as () => void} title="Copy Link">
          Copy Link
        </Button>
      </div>
    </>
  );
};

export default PredictionResult;
