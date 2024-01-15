import React from "react";
// import "./components.css";

const RadioButton = ({
  id,
  className,
  text,
  buttonStyle,
  placeholder,
  onClick,
  onInput,
  value,
  type,
  label,
  name,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "60vw",
        height: "30px",
        fontSize: "16px",
        textTransform: "capitalize",
        gap: 20,
        marginBlock: "12px",
      }}
    >
      <input
        autoComplete="new-off"
        id={id}
        className={`${className}`}
        type={"radio"}
        style={buttonStyle}
        placeholder={placeholder}
        checked={value}
        name={name}
        onClick={(e) => onClick(e)}
        value={value}
      />
      <label>{label}</label>
    </div>
  );
};

export default RadioButton;
