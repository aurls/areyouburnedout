import React from 'react';
import { v4 as uuid } from 'uuid';
import { Typography, Card, Button, Popconfirm } from 'antd';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';
import FormItem from '../FormItem';

import type { Params } from '../../types';

import itemGroups from './items';

import './Form.scss';

const Form: React.FC = () => {
  const params = useSelector((state) => state.root.params);
  const fetching = useSelector((state) => state.root.fetching);

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

  return (
    <div className="form">
      <Typography.Title className="form__title" level={1}>
        How Burned&nbsp;Out Are&nbsp;You?, Bro?&nbsp;🤔
        <br />
        Learn&nbsp;It With&nbsp;AI&nbsp;&gt;&gt;
      </Typography.Title>

      {itemGroups.map((group) => (
        <Card title={group.title} key={group.id}>
          <div className="form__group">
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
                  disabled={fetching}
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
          loading={fetching}
        >
          &gt;&gt; Ask AI &lt;&lt;
        </Button>
      </div>
    </div>
  );
};

export default Form;
