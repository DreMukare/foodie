import React, { Component } from "react";
import Bcrypt from "bcryptjs";
import { dal } from "../../database";
import { Form } from "../../components";
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
    dal
      .findOne("admins", { key: "username", value: user.username || "" })
      .then(data => {
        if (data.length > 0) {
          Bcrypt.compare(user.password, data[0].password).then(success => {
            if (!success) {
              return setState({ invalidFormData: true });
            }
            this.props.dispatch({ type: "SET_ADMIN" });
          });
        }
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
