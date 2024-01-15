import React from "react";
import "./inputs.css";

const LabeledInput = ({
  id,
  className,
  text,
  labelText,
  inputStyle,
  placeholder,
  onChange,
  onInput,
  type,
  name,
  value,
  disabled,
}) => {
  return (
    <div className={`labeledInp ${className}`}>
      <label>{labelText}</label>
      <input
        autoComplete="new-off"
        id={id}
        type={type}
        labelText={labelText}
        style={inputStyle}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        // onInput={(e) => onInput()}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default LabeledInput;
