/* eslint-disable no-case-declarations */

import React from 'react';
import {
  Typography,
  InputNumber,
  Select
} from 'antd';

import './FormItem.scss';

enum Type {
  Number,
  Select
};

interface BaseItem<T = any> {
  id: string
  type: Type
  title: string
  value: T
  onChange: (value: T) => void
  disabled?: boolean
  style?: React.CSSProperties
  labelStyle?: React.CSSProperties
  inputStyle?: React.CSSProperties
}

interface NumberItem extends BaseItem<number> {
  min?: number
  max?: number
  step?: number
  precision?: number
}

interface SelectItem extends BaseItem<string> {
  options: Array<{
    id: string | number
    title: string
  }>
}

type Props = NumberItem | SelectItem;

const FormItem: React.FC<Props> = (props) => {
  const {
    id,
    type,
    title,
    value,
    onChange,
    disabled = false,
    style = {},
    labelStyle = {},
    inputStyle = {}
  } = props;

  const renderItem = (): React.ReactNode => {
    switch (type) {
      case Type.Number:
        const {
          min,
          max,
          step,
          precision
        } = props as NumberItem;

        const onFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
          event.target.select();
        };

        return (
          <InputNumber
            className="form-item__number"
            id={id}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            min={min}
            max={max}
            step={step}
            precision={precision}
            decimalSeparator=","
            disabled={disabled}
          />
        );

      case Type.Select:
        const {
          options
        } = props as SelectItem;

        return (
          <Select
            className="form-item__select"
            id={id}
            value={value}
            onChange={onChange}
            options={options}
            fieldNames={{ value: 'id', label: 'title' }}
            disabled={disabled}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-item" style={style}>
      <Typography.Paragraph className="form-item__title" style={labelStyle}>
        {title}
      </Typography.Paragraph>

      <div className="form-item__input" style={inputStyle}>
        {renderItem()}
      </div>
    </div>
  );
};

export {
  Type
};

export type {
  BaseItem,
  NumberItem,
  SelectItem
};

export default React.memo(FormItem);
