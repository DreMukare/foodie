import React, { Component } from "react";
import { Form } from "../../components";
import { loginThunk } from "../../thunk";
import "./styles.css";

const formConfig = [
	{
		name: "username",
		type: "text",
		required: true
	},
	{
		name: "password",
		type: "password",
		required: true
	}
];

class LoginPage extends Component {
	handleSubmit = (state, setState) => e => {
		e.preventDefault();
		const user = state.formData;
		if (Object.keys(user).length < 1) {
			return setState({ invalidFormData: true });
		}
		loginThunk(this.props.dispatch, user)
			.then(success => {
				if (success) {
					this.props.navigate("/");
				}
				setState({ invalidFormData: true });
			})
			.catch(error => {
				setState({ invalidFormData: true });
			});
	};

	render() {
		return (
			<div className="login_form">
				<Form
					config={formConfig}
					handleSubmit={this.handleSubmit}
					cta="Login"
				/>
			</div>
		);
	}
}

export default LoginPage;
