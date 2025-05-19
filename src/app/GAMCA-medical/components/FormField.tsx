import React, { ChangeEvent } from "react";
import "../styles/formStyles.scss";

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  [x: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  ...props
}) => (
  <div className="col-md-6 mb-3">
    <label className="form-label mb-1 fw-bold form-label-custom">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    <input
      type={type}
      className="form-control mt-1 form-control-custom"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    {error && <div className="error-message-custom">{error}</div>}
  </div>
);

export default FormField;
