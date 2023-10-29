import React from 'react';
import { Result, Button } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useDispatch } from '../../store';
import { root } from '../../slices';

import './Error.scss';

const Error: React.FC = () => {
  const dispatch = useDispatch();

  const onRetry = (): void => {
    dispatch(root.setError(false));
  };

  return (
    <div className="error">
      <Result
        status="error"
        title="Error Occured"
        subTitle="Something went wrong. Please, check connection and try again."
        extra={[
          <Button
            key="retry"
            type="primary"
            onClick={onRetry}
            title="Test Again"
            size="large"
          >
            <DoubleRightOutlined />Test Again<DoubleLeftOutlined />
          </Button>
        ]}
      />
    </div>
  );
};

export default Error;
