import React, { Component } from "react";

export default class RankingItem extends Component {
	render() {
		let player = this.props.player;
		let username = player.username;
		let wpm = player.wpm;
		return (
			<li>{username} ({wpm} wpm)</li>
		);
	}
}
