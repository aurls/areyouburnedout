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
  style?: React.CSSProperties,
  labelStyle?: React.CSSProperties,
  inputStyle?: React.CSSProperties
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
    style = {},
    labelStyle = {},
    inputStyle = {}
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
          // @ts-ignore
          onChange(Number(event.target.value));
        };

        const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
          const nextValue = Number(event.target.value);

          if (nextValue < min) {
            // @ts-ignore
            onChange(min);
          } else if (nextValue > max) {
            // @ts-ignore
            onChange(max);
          } else {
            // @ts-ignore
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
          // @ts-ignore
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
      <label className="form-item__title" htmlFor={id} style={labelStyle}>
        {title}
      </label>

      <div className="form-item__input" style={inputStyle}>
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
