import React from "react";
import PropTypes from "prop-types";

const Input = ({
  name,
  type,
  placeHolder,
  required,
  value,
  onChange,
  onClick
}) =>
  React.createElement("input", {
    name,
    type,
    placeholder: placeHolder,
    [value && "value"]: value,
    [required && "required"]: required,
    [onChange && "onChange"]: onChange,
    [onClick && "onClick"]: onClick
  });

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default Input;
