import React from "react";
import PropTypes from "prop-types";
import { FoodMenu, FoodOrder, AdminPanel } from "../../components";

const Home = ({ stockData, orderData, isLoggedIn, dispatch }) => (
	<React.Fragment>
		<FoodMenu stockData={stockData} dispatch={dispatch} />
		<FoodOrder orderData={orderData} dispatch={dispatch} />
		<AdminPanel isLoggedIn={isLoggedIn} dispatch={dispatch} />
	</React.Fragment>
);

Home.propTypes = {
	stockData: PropTypes.array,
	orderData: PropTypes.array,
	dispatch: PropTypes.func,
	isLoggedIn: PropTypes.bool
};

export default Home;
