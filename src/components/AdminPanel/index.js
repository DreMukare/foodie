import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, navigate } from "@reach/router";
import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu";
import RestockForm from "../RestockForm";
import ProtectedRoute from "../ProtectedRoute";
import "./styles.css";

const adminMenuConfig = [
	{
		label: "Restock",
		onClick: dispatch => e => {
			navigate("/restock-form");
		}
	},
	{
		label: "Sales Report",
		onClick: dispatch => e => {
			navigate("/sales-report");
		}
	},
	{
		label: "Log out",
		onClick: dispatch => e => {
			sessionStorage.removeItem("logged-in-admin");
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
		const { dispatch, isLoggedIn } = this.props;
		return (
			<aside className="navbar">
				<div className="title">
					<h2>Admin</h2>
				</div>
				<Router primary={false} className="form_admin">
					<ProtectedRoute
						as="ul"
						allow={isLoggedIn}
						path="/"
						protected={
							<AdminMenu dispatch={dispatch} config={adminMenuConfig} />
						}
						fallback={<AdminLogin />}
					/>
					<ProtectedRoute
						as={isLoggedIn ? props => <React.Fragment {...props} /> : "ul"}
						allow={isLoggedIn}
						path="restock-form"
						protected={<RestockForm dispatch={dispatch} />}
						fallback={<AdminLogin />}
					/>
				</Router>
			</aside>
		);
	}
}

export default AdminPanel;
