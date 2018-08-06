import React from "react";
import PropTypes from "prop-types";
import { FoodMenu, FoodOrder, AdminPanel } from "../../components";

const Home = props => (
  <React.Fragment>
    <FoodMenu stockData={props.stockData} dispatch={props.dispatch} />
    <FoodOrder orderData={props.orderData} dispatch={props.dispatch} />
    <AdminPanel isLoggedIn={props.isLoggedIn} dispatch={props.dispatch} />
  </React.Fragment>
);

Home.propTypes = {
  stockData: PropTypes.array,
  orderData: PropTypes.array,
  dispatch: PropTypes.func,
  isLoggedIn: PropTypes.bool
};

export default Home;
