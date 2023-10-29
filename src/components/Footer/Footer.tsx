import React from 'react';
import { Typography } from 'antd';

import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <Typography.Paragraph>
        <b>Doesn&#39;t</b> store user data.
        <br />
        Made for&nbsp;research purposes by&nbsp;
        <Typography.Link href="https://t.me/x173180" target="_blank">x173180</Typography.Link>
        &nbsp;and&nbsp;
        <Typography.Link href="https://t.me/k4t4ny4" target="_blank">k4t4ny4</Typography.Link>
        , 2023
      </Typography.Paragraph>
    </div>
  );
};

export default Footer;
