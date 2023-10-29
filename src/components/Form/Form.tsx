import React from 'react';
import { Typography, Card, Button, Popconfirm } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';
import FormItem from '../FormItem';
import Footer from '../Footer';

import type { Params } from '../../types';

import itemGroups from './items';

import localStorage from '../../services/localStorage';

import './Form.scss';

const Form: React.FC = () => {
  const params = useSelector((state) => state.root.params);

  const dispatch = useDispatch();

  const setParams = (paramsToMerge: Partial<Params>): void => {
    dispatch(root.setParams({ ...params, ...paramsToMerge }));
  };

  const onReset = (): void => {
    dispatch(root.reset());
  };

  const onSubmit = (): void => {
    dispatch(root.postParams(params));
  };

  React.useEffect(() => {
    const prevParams = localStorage.get('alyaska/params');

    if (prevParams) {
      setParams(prevParams);
    }
  }, []);

  return (
    <div className="form">
      <Card>
        <Typography.Title className="form__title" level={1}>
          <mark>How Much Burned&nbsp;Out</mark> Are&nbsp;You At&nbsp;Work, Bro?

          <br />

          <span className="form__title-secondary">
            Test&nbsp;It With&nbsp;AI&nbsp;<DoubleRightOutlined />
          </span>
        </Typography.Title>
      </Card>

      {itemGroups.map((group) => (
        <Card key={group.id} className="form__group" bodyStyle={{ padding: 0 }}>
          <Typography.Title className="form__group-title" level={4}>
            {group.title}
          </Typography.Title>

          <div className="form__group-items">
            {group.items.map((item) => {
              const value = (params as Record<string, any>)[item.id];

              const onChange = (value: any): void => {
                if ('onChange' in item) {
                  (item.onChange as (v: typeof value, s: typeof setParams) => void)(value, setParams);
                } else {
                  setParams({ [item.id]: value });
                }
              };

              return (
                <FormItem
                  key={item.id}
                  {...item}
                  value={value}
                  onChange={onChange}
                />
              );
            })}
          </div>
        </Card>
      ))}

      <div className="form__actions">
        <Popconfirm
          title="Are you sure you want to reset?"
          description="Unsaved data will be lost."
          onConfirm={onReset}
          okText="Yes"
          cancelText="No"
        >
          <Button
            title="Reset"
            size="large"
            danger
          >
            Reset
          </Button>
        </Popconfirm>

        <Button
          type="primary"
          onClick={onSubmit}
          title="Ask AI"
          size="large"
        >
          <DoubleRightOutlined />Ask AI<DoubleLeftOutlined />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Form;
