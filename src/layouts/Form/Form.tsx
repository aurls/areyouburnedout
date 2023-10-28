import React from 'react';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';
import FormItem, { Type } from '../FormItem';
import Button from '../../components/Button';
import Prediction from '../../components/Prediction';
import Error from '../../components/Error';

import itemGroups from './items';

import './Form.scss';

const Form: React.FC = () => {
  const params = useSelector((state) => state.root.params);
  const prediction = useSelector((state) => state.root.prediction);
  const fetching = useSelector((state) => state.root.fetching);
  const error = useSelector((state) => state.root.error);

  const dispatch = useDispatch();

  const setParams = (paramsToMerge) => {
    dispatch(root.setParams({ ...params, ...paramsToMerge }));
  };

  const onReset = () => {
    if (confirm('Are you sure you want to reset? Unsaved data will be lost.')) {
      dispatch(root.reset());
    }
  };

  const onSubmit = () => {
    dispatch(root.postParams(params));
  };

  return (
    <>
      <h2 className="form__title">
        Are&nbsp;You Burning&nbsp;Out, Bro?
        <br />
        <span className="form__title-secondary">Learn&nbsp;It With&nbsp;AI&nbsp;&gt;&gt;</span>
      </h2>

      <form className="form">
        {itemGroups.map((group) => (
          <div className="form__group" key={group.id}>
            <h4 className="form__group-title">{group.title}</h4>

            {group.items.map((item) => {
              const onChange = (value: any) => {
                if ('onChange' in item) {
                  // @ts-ignore
                  item.onChange(value, setParams);
                } else {
                  setParams({ [item.id]: value });
                }
              };

              return (
                <FormItem
                  key={item.id}
                  {...item}
                  value={params[item.id]}
                  onChange={onChange}
                  disabled={fetching}
                />
              );
            })}
          </div>
        ))}
      </form>

      <div className="form__actions">
        <Button primary onClick={onSubmit} title="Ask AI" disabled={fetching}>
          &gt;&gt; Ask AI &lt;&lt;
        </Button>

        <Button onClick={onReset} title="Reset" disabled={fetching}>
          Reset
        </Button>
      </div>

      <div className="form__result">
        {prediction && <Prediction value={prediction} />}

        {error && <Error />}
      </div>
    </>
  );
};

export default Form;
