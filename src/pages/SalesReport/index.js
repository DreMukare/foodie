import React, { Component } from "react";
import PropTypes from "prop-types";
import { StatefulProgressRing, MapArray } from "../../components";
import "./styles.css";

class SalesReportPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		salesData: PropTypes.array,
		totalStockData: PropTypes.object
	};
	render() {
		const sales = this.props.salesData;
		const stockData = Object.values(this.props.totalStockData);
		const cleanStockData = stockData.filter(data => data.quantity > 0);
		const total = sales.reduce((a, c) => a + c.total, 0);
		const percentage = amount => Math.round((amount / total) * 100);
		const totalStock = stockData.reduce((a, c) => a + c.quantity, 0);
		const percentageStock = quantity =>
			Math.round((quantity / totalStock) * 100);
		const colors = [
			"#D63230",
			"#F39237",
			"#39A9DB",
			"#6A30FF",
			"#795110",
			"#29A320",
			"#BD66C7",
			"#FFC83D",
			"#F017A6"
			// "#F9FCFB"
		];
		return (
			<div className="sales-report">
				<div className="title">
					<h2>Sales Report</h2>
				</div>
				<div className="statistics">
					<div className="progress">
						<MapArray
							from={sales}
							map={props => ({
								...props,
								label: props.name,
								progress: percentage(props.total)
							})}
						>
							<StatefulProgressRing
								radius={70}
								strokeWidth={5}
								fillColor="white"
								strokeColor="black"
							/>
						</MapArray>
					</div>
					<div className="graphs">
						<div id="stock-graph-axis">
							<MapArray
								from={cleanStockData}
								map={(props, key) => ({
									...props,
									color: colors[key] || "#FFFFFF",
									height: percentageStock(props.quantity) * 2.5 + "%"
								})}
							>
								<Bar />
							</MapArray>
						</div>
						<div id="stock-graph-key">
							<MapArray
								from={colors
									.slice(0, cleanStockData.length)
									.map(c => ({ color: c }))}
								map={(props, key) => ({
									...props,
									label: !!cleanStockData[key]
										? cleanStockData[key].name
										: undefined
								})}
							>
								<Key />
							</MapArray>
						</div>
					</div>
				</div>
				<div className="numbers">
					<label>Total Sales</label>
					<p>{total}</p>
				</div>
			</div>
		);
	}
}

const Bar = props => (
	<span
		className="bar"
		style={{ height: props.height, backgroundColor: props.color }}
	>
		{props.label}
	</span>
);

const Key = props => (
	<div className="key">
		<span style={{ backgroundColor: props.color }} />
		<p>{props.label}</p>
	</div>
);

export default SalesReportPage;
