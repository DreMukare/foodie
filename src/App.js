import React, { Component } from "react";
import { Router } from "@reach/router";
import reducer from "./reducer";
import { fetchMealsThunk, totalSalesThunk } from "./thunk";
import { HomePage, LoginPage } from "./pages";
import SalesReportPage from "./pages/SalesReport";
import { ProtectedRoute } from "./components";

const placeholderStock = Array(6)
	.fill({ name: "Loading...", quantity: "" })
	.reduce((a, c, i) => {
		a[i + 1] = c;
		return a;
	}, {});

class App extends Component {
	state = {
		stock: {},
		order: {},
		sales: {},
		async: {
			fetching: false,
			success: false,
			error: false
		}
	};

	componentDidMount() {
		fetchMealsThunk(this.dispatch);
		totalSalesThunk(this.dispatch);
		if (!("isAdmin" in this.state)) {
			const sessionKey = sessionStorage.getItem("logged-in-admin");
			if (Boolean(sessionKey)) {
				const isAdmin = atob(sessionKey) === "admin"; // FORGIVE ME FATHER FOR I HAVE SINNED.
				if (isAdmin) {
					this.dispatch({ type: "SET_ADMIN" });
				}
			}
		}
	}

	dispatch = action => {
		this.setState(prevState => reducer(prevState, action));
	};

	render() {
		const { fetching } = this.state.async;
		const stockData = fetching ? placeholderStock : this.state.stock;
		const stock = Object.values(stockData);
		const order = Object.values(this.state.order);
		const sales = Object.values(this.state.sales);
		const totalStock = stock.reduce((a, c) => {
			a[c.name] = { name: c.name, quantity: c.quantity };
			return a;
		}, {});

		return (
			<Router>
				<HomePage
					path="/*"
					orderData={order}
					stockData={stock}
					isLoggedIn={this.state.isAdmin || false}
					dispatch={this.dispatch}
				/>
				<LoginPage path="login" dispatch={this.dispatch} />
				<ProtectedRoute
					as={props => <React.Fragment {...props} />}
					allow={this.state.isAdmin || false}
					path="sales-report"
					protected={
						<SalesReportPage
							salesData={sales}
							totalStockData={totalStock}
							dispatch={this.dispatch}
							isLoggedIn={this.state.isAdmin || false}
						/>
					}
					fallback={<LoginPage dispatch={this.dispatch} />}
				/>
			</Router>
		);
	}
}

export default App;
