import React from 'react';
import { useSelector, useDispatch } from '../../store';
import { root } from '../../slices';
import FormItem, { Type } from '../FormItem';

import './Form.scss';

const Form: React.FC = () => {
  const value = useSelector((state) => state.root.value);

  const dispatch = useDispatch();

  const setValue = (valueToMerge) => {
    dispatch(root.setValue({ ...value, ...valueToMerge }));
  };

  const formItems = [
    {
      type: Type.Number,
      id: 'age',
      title: 'Age:',
      min: 18,
      max: 99,
      onChange: (age) => {
        setValue({ age });
      },
      style: { width: '50%' }
    },
    {
      type: Type.Select,
      id: 'gender',
      title: 'Gender:',
      placeholder: 'Select gender',
      options: [
        { id: 'Male', title: 'Male' },
        { id: 'Female', title: 'Female' }
      ],
      onChange: (gender) => {
        setValue({ gender });
      },
      style: { width: '50%' }
    }
  ];

  return (
    <>
      <h1 className="form__title">
        Are You Burned Out?? Learn It With AI
      </h1>

      <form className="form">
        {formItems.map((item) => (
          <FormItem key={item.id} {...item} value={value[item.id]} />
        ))}
      </form>
    </>
  );
};

export default Form;
