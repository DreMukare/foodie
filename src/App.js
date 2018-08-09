import React, { Component } from "react";
import { Router } from "@reach/router";
import reducer from "./reducer";
import { fetchMealsThunk } from "./thunk";
import { HomePage, LoginPage } from "./pages";

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
		async: {
			fetching: false,
			success: false,
			error: false
		}
	};

	componentDidMount() {
		fetchMealsThunk(this.dispatch);
		const sessionKey = sessionStorage.getItem("logged-in-admin");
		if (Boolean(sessionKey)) {
			const isAdmin = atob(sessionKey) === "admin"; // FORGIVE ME FATHER FOR I HAVE SINNED.
			this.setState(prevState => ({ ...prevState, isAdmin }));
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
			</Router>
		);
	}
}

export default App;
