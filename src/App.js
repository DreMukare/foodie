import React, { Component } from "react";
import { FoodMenu, FoodOrder } from "./components";
import { MockDB, normalize } from "./utils";
import reducer from "./reducer";

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

  dispatch = action => {
    this.setState(prevState => reducer(prevState, action));
  };

  render() {
    const stock = Object.values(this.state.stock);
    const order = Object.values(this.state.order);
    return (
      <div className="app">
        <FoodMenu stockData={stock} dispatch={this.dispatch} />
        <FoodOrder orderData={order} dispatch={this.dispatch} />
      </div>
    );
  }
}

export default App;
