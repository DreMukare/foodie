import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./styles.css";
import Button from "../Button";

class AdminPanel extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    dispatch: PropTypes.func
  };
  handleLogout = e => {
    this.props.dispatch({ type: "LOG_OUT" });
  };
  render() {
    const isAdmin = this.props.isLoggedIn;
    return (
      <aside className="navbar">
        <div className="title">
          <h2>Admin</h2>
        </div>
        <ul>
          {!isAdmin && (
            <li>
              <Link to="login">Log In</Link>
            </li>
          )}
          {isAdmin && (
            <React.Fragment>
              <li className="nav_button">
                <Button label="Restock" />
              </li>
              <li className="nav_button">
                <Button label="Log Out" onClick={this.handleLogout} />
              </li>
            </React.Fragment>
          )}
        </ul>
      </aside>
    );
  }
}

export default AdminPanel;
