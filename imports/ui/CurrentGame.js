import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { Games } from "../api/games.js";

import OtherPlayer from "./OtherPlayer.js";
import CurrentPlayer from "./CurrentPlayer.js";
import Ranking from "./Ranking.js";

class CurrentGame extends Component {
	render() {
		let timeRemaining = this.props.timeRemaining;
		let host = this.props.host;
		let text = this.props.text;
		let currentUsername = this.props.currentUsername;

		let players = this.props.players;
		let position;
		let upPlayer;
		let downPlayer;
		for (let i = 0; i < players.length; i++) {
			let currentPlayer = players[i];
			if (currentPlayer.username === currentUsername) {
				position = i + 1;
				upPlayer = players[i - 1];
				downPlayer = players[i + 1];
				break;
			}
		}
		return (
			<div>
				{currentUsername === host &&
					<button disabled={timeRemaining !== 0}>
						Start
					</button>
				}
				<h3>{timeRemaining}</h3>
				<OtherPlayer
					player={upPlayer}
					position={position - 1} />
				<hr />
				<CurrentPlayer
					text={text}
					position={position}
					timeElapsed={60 - timeRemaining} />
				<hr />
				<OtherPlayer
					player={downPlayer}
					position={position + 1} />
				<Ranking
					players={players} />
			</div>
		);
	}
}

export default withTracker(({match}) => {
	let gameId = match.params.gameId;
	let game = Games.findOne({_id: gameId});
	let host = game.host;
	let text = game.text;
	let timeRemaining = game.timeRemaining;
	let players = game.players.sort((p1, p2) => p2.wpm - p1.wpm);
	let currentUsername = Meteor.user().username;
	return {
		host,
		text,
		timeRemaining,
		currentUsername,
		players
	};
})(CurrentGame);