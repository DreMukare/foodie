import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, navigate } from "@reach/router";
import "./styles.css";
import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu";
import RestockForm from "../RestockForm";

const adminMenuConfig = [
	{
		label: "Restock",
		onClick: dispatch => e => {
			navigate("/restock-form");
		}
	},
	{
		label: "Log out",
		onClick: dispatch => e => {
			dispatch({ type: "LOG_OUT" });
		}
	}
];

class AdminPanel extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		dispatch: PropTypes.func
	};

	render() {
		const isAdmin = this.props.isLoggedIn;
		return (
			<aside className="navbar">
				<div className="title">
					<h2>Admin</h2>
				</div>
				<ul>
					<Router primary={false}>
						{isAdmin ? (
							<AdminMenu
								dispatch={this.props.dispatch}
								config={adminMenuConfig}
								path="/"
							/>
						) : (
							<AdminLogin default />
						)}
						<RestockForm path="restock-form" dispatch={this.props.dispatch} />
					</Router>
				</ul>
			</aside>
		);
	}
}

export default AdminPanel;
