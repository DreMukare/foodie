import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";

const FormGroup = props => {
	return (
		<div className="form_group">
			<label>{props.name[0].toUpperCase() + props.name.slice(1)}</label>
			<Input {...props} />
		</div>
	);
};

FormGroup.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	placeHolder: PropTypes.string,
	max: PropTypes.string,
	min: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func
};

export default FormGroup;
