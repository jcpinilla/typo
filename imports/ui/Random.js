import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import classnames from "classnames";

export default class Random extends Component {
	constructor(props) {
		super(props);
		this.state = {
			waiting: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let waiting = this.state.waiting;
		if (!waiting) {
			Meteor.call("games.insert");
			this.setState({
				waiting: !waiting
			});
		}
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
			spinner = <i id="waiting-spinner" className="fa fa-spinner fa-spin"></i>;
		}
		let button = (
			<button
				type="button"
				className="btn btn-primary"
				onClick={this.handleClick}>
				<i className={className}></i>
			</button>
		);
		return (
			<div>
				<h2 id="waiting-title">{title}</h2>
				{button}
				<br />
				{spinner}
			</div>
		);
	}
}
