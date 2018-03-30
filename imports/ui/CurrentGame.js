import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import { Games } from "../api/games.js";

import OtherPlayer from "./OtherPlayer.js";
import CurrentPlayer from "./CurrentPlayer.js";
import Ranking from "./Ranking.js";

class CurrentGame extends Component {
	constructor(props) {
		super(props);
		this.startGame = this.startGame.bind(this);
	}

	startGame() {
		let gameId = this.props.gameId;
		Meteor.call("games.setTimeRemaining", gameId, 60, () => {
			this.gameInterval = setInterval(() => {
				let timeRemaining = this.props.timeRemaining;
				timeRemaining--;
				Meteor.call("games.setTimeRemaining", gameId, timeRemaining, () => {
					if (!timeRemaining) {
						clearInterval(this.gameInterval);
					}
				});
			}, 1000);
		});
	}

	render() {
		let gameId = this.props.gameId;
		let timeRemaining = this.props.timeRemaining;
		let host = this.props.host;
		let text = this.props.text;
		let currentUsername = this.props.currentUsername;

		let players = this.props.players;
		let position;
		let upPlayer;
		let downPlayer;
		let wpm;
		for (let i = 0; i < players.length; i++) {
			let currentPlayer = players[i];
			if (currentPlayer.username === currentUsername) {
				position = i + 1;
				wpm = currentPlayer.wpm;
				upPlayer = players[i - 1];
				downPlayer = players[i + 1];
				break;
			}
		}
		return (
			<div>
				<br />
				{currentUsername === host &&
					<button
						onClick={this.startGame}
						disabled={timeRemaining !== 0}>
						Start
					</button>
				}
				<h3>{timeRemaining}</h3>
				<OtherPlayer
					player={upPlayer}
					position={position - 1} />
				<hr />
				<CurrentPlayer
					gameId={gameId}
					text={text}
					position={position}
					wpm={wpm}
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
		gameId,
		host,
		text,
		timeRemaining,
		currentUsername,
		players
	};
})(CurrentGame);