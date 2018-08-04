import React, { Component } from "react";
import { Button, MapArray } from "./components";
import { MockDB, normalize } from "./utils";

const buttonMap = props => ({
  ...props,
  label: `${props.name} ${props.quantity}`,
  [props.quantity < 1 && "disabled"]: true
});

const reduceStock = foodData => ({
  ...foodData,
  quantity: foodData.quantity - 1
});

const updateOrder = orderData => ({ id, name, price }) => ({
  ...orderData,
  [id]: {
    id,
    name,
    quantity: (id in orderData ? orderData[id].quantity : 0) + 1,
    get price() {
      return this.quantity * price;
    }
  }
});

// Localized components because I only need them here
const TableCell = props => {
  if ("name" in props) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>{props.quantity}</td>
      </tr>
    );
  }
};

const OrderTableCell = props => (
  <MapArray from={props.order} map={props.map}>
    <TableCell />
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
  handleClick = e => {
    const foodId = e.target.id;
    const { stock, order } = this.state;
    const food = reduceStock(stock[foodId]);
    const updatedOrder = updateOrder(order)(food);
    this.setState(({ stock, order }) => ({
      stock: { ...stock, [foodId]: { ...food } },
      order: { ...order, ...updatedOrder }
    }));
  };
  render() {
    const stock = Object.values(this.state.stock);
    const order = Object.values(this.state.order);
    return (
      <div>
        <h2>Menu</h2>
        <MapArray from={stock} map={buttonMap}>
          <Button onClick={this.handleClick} />
        </MapArray>
        <h2>Order</h2>
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <OrderTableCell order={order} />
            <tr>
              <td>Total</td>
              <td>
                {order.reduce((totalPrice, food) => totalPrice + food.price, 0)}
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
    );
  }
}

export default App;
