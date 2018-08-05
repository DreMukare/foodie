import React, { Component } from "react";
import PropTypes from "prop-types";

class MapArray extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    from: PropTypes.array.isRequired,
    map: PropTypes.func
  };

  static defaultProps = {
    map: e => e
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.from !== this.props.from;
  }

  render() {
    const { children, from, map } = this.props;
    const child = React.Children.only(children);
    const mapped = from.map((childProps, index) =>
      React.cloneElement(child, {
        key: childProps.id || index,
        ...map(childProps, childProps.id || index)
      })
    );
    return mapped;
  }
}

export default MapArray;
