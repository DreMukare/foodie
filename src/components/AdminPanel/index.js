import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./styles.css";

class AdminPanel extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };
  render() {
    return (
      <aside className="navbar">
        <ul>
          <li>
            <Link to="login">Log In</Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default AdminPanel;
