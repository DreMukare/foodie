import React, { Component } from "react";
import PropTypes from "prop-types";
import TableCell from "./TableCell";
import MapArray from "../MapArray";
import "./styles.css";
import Button from "../Button";
import { saveOrderThunk, fetchMealsThunk, totalSalesThunk } from "../../thunk";

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

	handlePrintReceipt = e => {
		const { dispatch, orderData } = this.props;
		if (Object.keys(orderData).length > 0) {
			saveOrderThunk(dispatch, orderData).then(success => {
				// WARNING: HERE BE DRAGONS
				if (success) {
					const delay = 20;
					let timeoutId = setTimeout(() => {
						fetchMealsThunk(dispatch);
						totalSalesThunk(dispatch);
					}, delay);
					let intervalId = setInterval(() => {
						clearTimeout(timeoutId);
						timeoutId = null;
						clearInterval(intervalId);
					}, delay);
				}
				//////////////////////////////////////////
			});
		}
	};

	render() {
		const order = this.props.orderData;
		return (
			<div className="order">
				<div className="title">
					<h2>Food Order</h2>
				</div>
				<div className="table">
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
						</tbody>
					</table>
				</div>
				<div className="total">
					<p>Total </p>
					<span>
						{order.reduce((totalPrice, food) => totalPrice + food.price, 0)}
					</span>
				</div>
				<div className="print">
					<Button label="Print Receipt" onClick={this.handlePrintReceipt} />
				</div>
			</div>
		);
	}
}

export default FoodOrder;
