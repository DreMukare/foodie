import React from "react";
import PropTypes from "prop-types";

const ProtectedRoute = props => {
	const As = props.as;
	const component = props.allow ? props.protected : props.fallback;
	return (
		<As>
			{React.cloneElement(component, {
				...props,
				as: undefined,
				allow: undefined,
				fallback: undefined,
				protected: undefined
			})}
		</As>
	);
};

ProtectedRoute.propTypes = {
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
	allow: PropTypes.bool,
	fallback: PropTypes.node.isRequired,
	protected: PropTypes.node
};

export default ProtectedRoute;
