import React, { Component } from "react";

export default class OtherPlayer extends Component {
	render() {
		let player = this.props.player;
		if (player === undefined) {
			return null;
		}
		let position = this.props.position;
		let username = player.username;
		let wpm = player.wpm;
		let current = player.current;

		let currentArray = current.split(" ");
		let amount = 5;
		current = currentArray
			.slice(-amount)
			.join(" ");
		return (
			<div>
				{position} - {username} ({wpm} wpm): {current}
			</div>
		);
	}
}
