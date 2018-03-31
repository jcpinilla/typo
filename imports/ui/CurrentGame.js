import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import { Games } from "../api/games.js";

import OtherPlayer from "./OtherPlayer.js";
import CurrentPlayer from "./CurrentPlayer.js";
import Ranking from "./Ranking.js";
import Timer from "./Timer.js";

class CurrentGame extends Component {
	constructor(props) {
		super(props);
		this.startGame = this.startGame.bind(this);
		this.prepareGame = this.prepareGame.bind(this);
	}

	prepareGame() {
		let gameId = this.props.gameId;
		let amount = 5;
		Meteor.call("games.setPrepareTime", gameId, amount, () => {
			this.prepareInterval = setInterval(() => {
				let prepareTime = this.props.prepareTime;
				prepareTime--;
				if (!prepareTime) {
					clearInterval(this.prepareInterval);
					this.startGame();
				} else {
					Meteor.call("games.setPrepareTime", gameId, prepareTime);
				}
			}, 1000);
		});
	}

	startGame() {
		let gameId = this.props.gameId;
		let amount = 60;
		Meteor.call("games.setTimeRemaining", gameId, amount, () => {
			Meteor.call("games.setPrepareTime", gameId, 0);
			this.gameInterval = setInterval(() => {
				let timeRemaining = this.props.timeRemaining;
				timeRemaining--;
				if (!timeRemaining) {
					clearInterval(this.gameInterval);
				}
				Meteor.call("games.setTimeRemaining", gameId, timeRemaining);
			}, 1000);
		});
	}

	render() {
		let gameId = this.props.gameId;
		let host = this.props.host;
		let text = this.props.text;
		let prepareTime = this.props.prepareTime;
		let timeRemaining = this.props.timeRemaining;
		let currentUsername = this.props.currentUsername;
		let isHost = currentUsername === host;

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
		let up = (
			<div className="card-header" style={{padding: "0px"}}>
				<div className="simulated-padding">
					<OtherPlayer
						isFirst={true}
						player={upPlayer}
						position={position - 1} />
				</div>
			</div>
		);
		let down = (
			<div className="card-footer" style={{padding: "0px"}}>
				<div className="simulated-padding">
					<OtherPlayer
						isFirst={false}
						player={downPlayer}
						position={position + 1} />
				</div>
			</div>
		);
		if (upPlayer === undefined && downPlayer === undefined) {
			up = null;
			down = null;
		}
		return (
			<div id="current-game" className="row">
				<div className="col-sm-3">
					<Ranking
						players={players} />
				</div>
				<div className="col-sm-9">
					<Timer
						prepareTime={prepareTime}
						timeRemaining={timeRemaining}
						isHost={isHost}
						prepareGame={this.prepareGame} />
					<div className="card">
						{up}
						<div className="card-body" style={{padding: "0px"}}>
							<div className="simulated-padding">
								<CurrentPlayer
									gameId={gameId}
									text={text}
									position={position}
									wpm={wpm}
									timeElapsed={60 - timeRemaining} />
							</div>
						</div>
						{down}
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker(({match}) => {
	let gameId = match.params.gameId;
	let game = Games.findOne({_id: gameId});
	let host = game.host;
	let text = game.text;
	let prepareTime = game.prepareTime;
	let timeRemaining = game.timeRemaining;
	let players = game.players.sort((p1, p2) => p2.wpm - p1.wpm);
	let currentUsername = Meteor.user().username;
	return {
		gameId,
		host,
		text,
		prepareTime,
		timeRemaining,
		currentUsername,
		players
	};
})(CurrentGame);