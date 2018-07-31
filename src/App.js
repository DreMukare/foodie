import React, { Component } from "react";
import { Button, MapArray } from "./components";
import { MockDB, normalize } from "./utils";

const buttonMap = props => ({
	...props,
	label: `${props.name} ${props.quantity}`
});

class App extends Component {
	state = {
		data: {}
	};
	componentDidMount() {
		const db = new MockDB();
		db.table("foods")
			.select()
			.then(data => {
				const normalizedData = normalize(data);
				this.setState({ data: normalizedData });
			});
	}
	handleClick = e => {
		const foodId = e.target.id;
		const data = this.state.data;
		data[foodId].quantity = data[foodId].quantity - 1;
		this.setState({ data: { ...data } });
	};
	render() {
		const values = Object.values(this.state.data);
		return (
			<div>
				<MapArray from={values} map={buttonMap}>
					<Button onClick={this.handleClick} />
				</MapArray>
			</div>
		);
	}
}

export default App;
