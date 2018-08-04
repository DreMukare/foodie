import React, { Component } from "react";
import { Button, MapArray } from "./components";
import { MockDB, normalize } from "./utils";
import reducer from "./reducer";

const buttonMap = props => ({
  ...props,
  label: `${props.name} ${props.quantity}`,
  [props.quantity < 1 && "disabled"]: true
});

// Localized components because I only need them here
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

const OrderTableCell = props => (
  <MapArray from={props.order} map={props.map}>
    <TableCell onClick={props.onClick} />
  </MapArray>
);

class App extends Component {
  state = {
    stock: {},
    order: {}
  };

  componentDidMount() {
    const db = new MockDB();
    db.table("foods")
      .select()
      .then(data => {
        const normalizedData = normalize(data);
        this.setState({ stock: normalizedData });
      });
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  handleClick = e => {
    const foodId = e.target.id;
    this.dispatch({ type: "ADD_ORDER", payload: { id: foodId } });
  };

  handleUnorder = e => {
    const foodId = e.target.id;
    this.dispatch({ type: "REMOVE_ORDER", payload: { id: foodId } });
  };

  render() {
    const stock = Object.values(this.state.stock);
    const order = Object.values(this.state.order);
    return (
      <div className="app">
        <div className="menu">
          <div className="title">
            <h2>Menu</h2>
          </div>
          <div className="menu_button-group">
            <MapArray from={stock} map={buttonMap}>
              <Button onClick={this.handleClick} />
            </MapArray>
          </div>
        </div>
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
              <OrderTableCell order={order} onClick={this.handleUnorder} />
              <tr>
                <td>Total</td>
                <td>
                  {order.reduce(
                    (totalPrice, food) => totalPrice + food.price,
                    0
                  )}
                </td>
                <td>
                  {order.reduce(
                    (totalPrice, food) => totalPrice + food.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
