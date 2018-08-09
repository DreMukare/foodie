import React from "react";
import PropTypes from "prop-types";

const Input = ({
	name,
	type,
	placeHolder,
	required,
	value,
	min,
	max,
	onChange,
	onClick
}) =>
	React.createElement("input", {
		name,
		type,
		placeholder: placeHolder,
		[value && "value"]: value,
		[required && "required"]: required,
		[min && "min"]: min,
		[max && "max"]: max,
		[onChange && "onChange"]: onChange,
		[onClick && "onClick"]: onClick
	});

Input.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string.isRequired,
	placeHolder: PropTypes.string,
	required: PropTypes.bool,
	min: PropTypes.string,
	max: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func
};

export default Input;
