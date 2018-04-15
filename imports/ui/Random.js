import React, { Component } from "react";

import classnames from "classnames";

export default class Random extends Component {
	constructor(props) {
		super(props);
		this.state = {
			waiting: false
		};
	}

	render() {
		let waiting = this.state.waiting;
		let title = waiting ?
			"Waiting for a player with similar level..." :
			"Play with a random player";

		let iconStyle = waiting ? "fa-remove" : "fa-play";
		let className = classnames(
			"fa",
			{[iconStyle]: true}
		);
		let spinner = null;
		if (waiting) {
			spinner = <i className="fa fa-spinner fa-spin"></i>;
		}
		let button = (
			<button
				type="button"
				className="btn btn-primary">
				<i className={className}></i>
			</button>
		);
		return (
			<div>
				<h1>{title}</h1>
				{button}
				{spinner}
			</div>
		);
	}
}
