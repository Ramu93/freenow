import React, { FC } from "react";

type SelectProps = {
  options: Option[];
  onChange: Function;
};

export interface Option {
  label: string;
  value: any;
}

const Select: FC<SelectProps> = ({ options, onChange }) => {
  return (
    <select
      data-testid="select-component"
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option: Option) => (
        <option
          data-testid="select-option"
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
