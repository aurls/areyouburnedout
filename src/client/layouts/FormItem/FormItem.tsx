import React from 'react';

import './FormItem.scss';

enum Type {
  Number,
  Select
}

interface BaseItem<T = any> {
  id: string,
  type: Type,
  title: string,
  value?: T,
  onChange: (value: T) => void,
  required?: boolean,
  style?: React.CSSProperties
}

interface NumberItem extends BaseItem<number> {
  min?: number,
  max?: number,
  step?: number
}

interface SelectItem extends BaseItem<string> {
  options: { id: string, title: string }[]
}

type Props = NumberItem | SelectItem;

const FormItem: React.FC<Props> = (props) => {
  const {
    id,
    type,
    title,
    value,
    onChange,
    required = true,
    style = {}
  } = props;

  const renderItem = (): React.ReactNode => {
    switch (type) {
      case Type.Number:
        const {
          min = -Infinity,
          max = Infinity,
          step = 1,
        } = props as NumberItem;

        const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(Number(event.target.value));
        };

        const onBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
          const nextValue = Number(event.target.value);

          if (nextValue < min) {
            onChange(min);
          } else if (nextValue > max) {
            onChange(max);
          } else {
            onChange(nextValue);
          }
        };

        return (
          <input
            className="form-item__number"
            type="number"
            id={id}
            name={id}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onNumberChange}
            onBlur={onBlur}
            required={required}
          />
        );

      case Type.Select:
        const {
          options,
        } = props as SelectItem;

        const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(event.target.value);
        };

        return (
          <select
            className="form-item__select"
            id={id}
            name={id}
            value={value}
            onChange={onSelectChange}
            required={required}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-item" style={style}>
      <label className="form-item__title" htmlFor={id}>
        {title}
      </label>

      <div className="form-item__input">
        {renderItem()}
      </div>
    </div>
  );
};

export {
  Type,
  BaseItem,
  NumberItem,
  SelectItem
};

export default React.memo(FormItem);
