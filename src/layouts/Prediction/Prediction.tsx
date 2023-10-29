import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { message, Result, Button, Spin } from 'antd';
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

  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      message.info('Link copied to clipboard');
    } catch {
      console.error('Could not copy href');
    }
  };

  React.useEffect(() => {
    dispatch(root.getAttrition(id as string));
  }, []);

  const ToForm = (
    <Link key="form" to="/">
      <Button type="primary" onClick={onRetry} title="Test Again">
        &gt;&gt; Test Again &lt;&lt;
      </Button>
    </Link>
  );

  if (fetching) {
    return (
      <div className="prediction">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="prediction">
      {error
        ? (
          <Result
            status="error"
            title="Error Occured"
            subTitle="Please, check connection and try again"
            extra={[ToForm]}
          />
          )
        : (
          <Result
            status="info"
            title={`AI supposes, that you have burned out at ${prediction}%, bro`}
            subTitle="Place for recommendation"
            extra={[
              ToForm,
              <Button key="copy" onClick={onCopy as () => void} title="Copy Link">
                Copy Link
              </Button>
            ]}
          />
          )
      }
    </div>
  );
};

export default Prediction;
