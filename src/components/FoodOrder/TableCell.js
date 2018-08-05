import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const TableCell = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.price}</td>
    <td>
      {props.quantity}{" "}
      <Button onClick={props.onClick} id={props.id} label="-" />
    </td>
  </tr>
);

TableCell.propTypes = {
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default TableCell;
