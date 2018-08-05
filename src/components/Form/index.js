import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import MapArray from "../MapArray";
import FormGroup from "./FormGroup";

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    cta: PropTypes.string.isRequired,
    config: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool
      })
    ).isRequired
  };

  state = { formData: {}, invalidFormData: false };

  handleSubmit = e => {
    this.props.handleSubmit(this.state, this.setState.bind(this))(e);
  };

  handleChange = e => {
    if (this.state.invalidFormData) {
      this.setState({ invalidFormData: false });
    }
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };
  render() {
    return (
      <form>
        <MapArray from={this.props.config}>
          <FormGroup onChange={this.handleChange} />
        </MapArray>
        {this.state.invalidFormData && (
          <p style={{ margin: "1rem 0", color: "red" }}>
            Invalid{" "}
            {Object.keys(this.state.formData).join(" or ") ||
              "or missing input"}.
          </p>
        )}
        <div className="form_group">
          <Input
            type="submit"
            onClick={this.handleSubmit}
            value={this.props.cta}
          />
        </div>
      </form>
    );
  }
}

export default Form;
