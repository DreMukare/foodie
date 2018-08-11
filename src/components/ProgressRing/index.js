import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const ProgressRing = ({
	radius,
	label,
	strokeWidth,
	progress,
	strokeColor,
	fillColor
}) => {
	const normalizeRadius = radius - strokeWidth * 2;
	const circumference = normalizeRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;
	return (
		<svg width="200px">
			<circle
				stroke={strokeColor}
				fill={fillColor}
				strokeWidth={strokeWidth}
				strokeDasharray={`${circumference} ${circumference}`}
				style={{ strokeDashoffset }}
				r={normalizeRadius}
				cx="50%"
				cy="50%"
			/>
			<text
				x="49%"
				y={label ? "44%" : "48%"}
				textAnchor="middle"
				strokeWidth="2px"
				dy=".5em"
				dx=".5em"
				fontSize="1.2rem"
			>
				{progress} %
			</text>
			<text
				x="50%"
				y="60%"
				textAnchor="middle"
				strokeWidth="2px"
				dy=".3em"
				fontSize="1rem"
			>
				{label}
			</text>
		</svg>
	);
};

ProgressRing.propTypes = {
	radius: PropTypes.number,
	strokeWidth: PropTypes.number,
	progress: PropTypes.number,
	fillColor: PropTypes.string,
	strokeColor: PropTypes.string
};

class Stateful extends React.Component {
	constructor(props) {
		super(props);
		this.intervalId = null;
		this.state = {
			progress: 0
		};
	}
	componentDidMount() {
		const delay = 10;
		const increment = this.props.progress / delay;
		this.intervalId = setInterval(() => {
			if (this.state.progress < this.props.progress) {
				this.setState({
					progress: parseFloat((this.state.progress + increment).toFixed(2))
				});
			} else {
				clearInterval(this.intervalId);
			}
		}, delay);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
		this.intervalId = null;
	}
	render() {
		const { progress, delay, ...props } = this.props;
		return <ProgressRing progress={this.state.progress} {...props} />;
	}
}

export { Stateful };
export default ProgressRing;
