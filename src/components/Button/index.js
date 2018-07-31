import React from "react";
import PropTypes from "prop-types";

const Button = ({ id, label, onClick }) =>
	React.createElement(
		"button",
		{
			[id && "id"]: id,
			onClick
		},
		label
	);

Button.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string,
	onClick: PropTypes.func
};

export default Button;
