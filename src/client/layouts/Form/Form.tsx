import React from 'react';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';
import FormItem, { Type } from '../FormItem';
import Button from '../../components/Button';

import './Form.scss';

const Form: React.FC = () => {
  const value = useSelector((state) => state.root.value);
  const prediction = useSelector((state) => state.root.prediction);
  const fetching = useSelector((state) => state.root.fetching);
  const error = useSelector((state) => state.root.error);

  const dispatch = useDispatch();

  const setValue = (valueToMerge) => {
    dispatch(root.setValue({ ...value, ...valueToMerge }));
  };

  const onReset = () => {
    if (confirm('Are you sure you want to reset? Unsaved data will be lost.')) {
      dispatch(root.resetValue());
    }
  };

  const onSubmit = () => {
    dispatch(root.postParams(value));
  };

  const formItems = [
    {
      type: Type.Number,
      id: 'age',
      title: 'Your age:',
      min: 18,
      max: 99,
      onChange: (age) => {
        setValue({ age });
      }
    },

    {
      type: Type.Select,
      id: 'gender',
      title: 'Your gender:',
      placeholder: 'Select gender',
      options: [
        { id: 'Male', title: 'Male' },
        { id: 'Female', title: 'Female' }
      ],
      onChange: (gender) => {
        setValue({ gender });
      }
    },

    {
      type: Type.Select,
      id: 'maritalStatus',
      title: 'Marital status:',
      placeholder: 'Select marital status',
      options: [
        { id: 'Single', title: 'Single' },
        { id: 'Married', title: 'Married' },
        { id: 'Divorced', title: 'Divorced' }
      ],
      onChange: (maritalStatus) => {
        setValue({ maritalStatus });
      }
    }
  ];

  return (
    <>
      <h1 className="form__title">
        Are You <span className="form__title-accent">Burned Out</span>?
        <br />
        <span className="form__title-secondary">Learn It With AI &gt;&gt;</span>
      </h1>

      <form className="form">
        {formItems.map((item) => (
          <FormItem
            key={item.id}
            {...item}
            value={value[item.id]}
            disabled={fetching}
          />
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
    </>
  );
};

export default Form;
