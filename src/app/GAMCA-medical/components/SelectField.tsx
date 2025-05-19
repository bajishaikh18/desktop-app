import React, { ChangeEvent } from "react";
import { SelectOption } from "../types/formTypes";
import "../styles/formStyles.scss";

interface SelectFieldProps {
  label: string;
  required?: boolean;
  options: SelectOption[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  required = false,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => (
  <div className="col-md-6 mb-3">
    <label className="form-label mb-1 fw-bold form-label-custom">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    <select
      className="form-select mt-1 form-select-custom"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
