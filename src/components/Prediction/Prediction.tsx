import React from 'react';
import { Typography, Result, Button } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';

import descriptors from './descriptors';
import type { Descriptor } from './descriptors';

import './Prediction.scss';

const Prediction: React.FC = () => {
  const prediction = useSelector((state) => state.root.prediction as number);

  const dispatch = useDispatch();

  const onRetry = (): void => {
    dispatch(root.reset());
  };

  const getIconAndSubtitle = (descriptors: Descriptor[]): [React.ReactNode, React.ReactNode] => {
    const descriptor = (
      descriptors.find((d) => (d.min <= prediction) && (d.max >= prediction)) ?? descriptors[0]
    ) as Descriptor;

    return [
      <Typography.Title className="prediction__icon" key="icon" level={1}>
        {descriptor.icon}
      </Typography.Title>,
      <Typography.Title key="subtitle" level={5}>
        {descriptor.description}
      </Typography.Title>
    ];
  };

  const Title = (
    <Typography.Title className="prediction__title" level={3}>
      AI&nbsp;says you&#39;re <mark>{(prediction * 100).toFixed(2)}%&nbsp;burnt&nbsp;out</mark>
    </Typography.Title>
  );

  const [Icon, Subtitle] = getIconAndSubtitle(descriptors);

  return (
    <div className="prediction">
      <Result
        status="info"
        icon={Icon}
        title={Title}
        subTitle={Subtitle}
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

export default Prediction;
