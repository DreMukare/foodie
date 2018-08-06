import React from "react";
import PropTypes from "prop-types";
import { FoodMenu, FoodOrder, AdminPanel } from "../../components";

const Home = props => (
  <React.Fragment>
    <FoodMenu stockData={props.stockData} dispatch={props.dispatch} />
    <FoodOrder orderData={props.orderData} dispatch={props.dispatch} />
    <AdminPanel />
  </React.Fragment>
);

Home.propTypes = {
  stockData: PropTypes.array,
  orderData: PropTypes.array,
  dispatch: PropTypes.func
};

export default Home;
