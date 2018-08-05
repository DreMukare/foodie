import React, { Component } from "react";
import PropTypes from "prop-types";
import TableCell from "./TableCell";
import MapArray from "../MapArray";
import "./styles.css";

// Localized component because I only need it here
const OrderTableCell = props => (
  <MapArray from={props.order} map={props.map}>
    <TableCell onClick={props.onClick} />
  </MapArray>
);

class FoodOrder extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    orderData: PropTypes.array
  };

  handleClick = e => {
    const foodId = e.target.id;
    this.props.dispatch({ type: "REMOVE_ORDER", payload: { id: foodId } });
  };

  render() {
    const order = this.props.orderData;
    return (
      <div className="order">
        <div className="title">
          <h2>Order</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <OrderTableCell order={order} onClick={this.handleClick} />
            <tr>
              <td>Total</td>
              <td>
                {order.reduce((totalPrice, food) => totalPrice + food.price, 0)}
              </td>
              <td>
                {order.reduce(
                  (totalQuantity, food) => totalQuantity + food.quantity,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoodOrder;
