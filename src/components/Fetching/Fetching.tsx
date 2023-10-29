import React from 'react';
import { Typography, Spin } from 'antd';

import './Fetching.scss';

const Fetching: React.FC = () => {
  return (
    <div className="fetching">
      <Spin size="large" />

      <Typography.Title level={4}>
        AI is&nbsp;running...
      </Typography.Title>
    </div>
  );
};

export default Fetching;
