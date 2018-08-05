import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";

const FormGroup = ({ name, type, required, placeHolder, value, onChange }) => {
  return (
    <div className="form_group">
      <label>{name}</label>
      <Input
        name={name}
        type={type}
        value={value}
        required={required}
        placeHolder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};

FormGroup.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default FormGroup;
