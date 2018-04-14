import React, { Component } from "react";

import classnames from "classnames";

export default class InvitedPlayer extends Component {
	render() {
		let player = this.props.player;
		let username = player.username;
		let joined = player.joined;
		let joinedClass = joined ? "badge-primary" : "badge-secondary";
		let className = classnames(
			"invited-player badge badge-pill",
			{[joinedClass]: true}
		);
		return (
			<div className={className}>
				{username}
			</div>
		);
	}
}
