import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import MapArray from "../MapArray";

const MenuItem = props => (
	<li className="nav_button">
		<Button label={props.label} onClick={props.onClick} />
	</li>
);

const AdminMenu = props => {
	const configWithBoundOnClickHandlers = props.config.map(
		cfg =>
			Object.prototype.hasOwnProperty.call(cfg, "onClick")
				? { ...cfg, onClick: cfg.onClick(props.dispatch) }
				: cfg
	);
	return (
		<MapArray from={configWithBoundOnClickHandlers}>
			<MenuItem />
		</MapArray>
	);
};

AdminMenu.propTypes = {
	config: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			onClick: PropTypes.func
		})
	),
	dispatch: PropTypes.func
};

export default AdminMenu;
