import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import generateWords from "./WordGenerator.js";

export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
	Meteor.publish("games", function gamesPublication(gameId) {
		return Games.find(gameId);
	});
}

Meteor.methods({
	"games.create"(language, privateGame) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let gameId = "" + (Games.find({}).count() + 1);
		let numberOfWords = 200;
		let host = Meteor.user().username;
		let text = generateWords(language, numberOfWords);
		let prepareTime = 0;
		let timeRemaining = 0;
		let players = [{
			username: host,
			wpm: 0,
			current: ""
		}];
		let newGame = {
			_id: gameId,
			host,
			text,
			prepareTime,
			timeRemaining,
			players
		};
		if (privateGame) {
			newGame.privateGame = true;
			newGame.invited = [];
		}
		Games.insert(newGame);
		return gameId;
	},
	"games.removePlayer"(gameId) {
		let game = Games.findOne(gameId);
		let players = game
			.players
			.filter(p => p.username !== Meteor.user().username);
		Games.update(gameId, {$set: {players}});
	},
	"games.join"(gameId) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let game = Games.findOne({_id: gameId});
		if (game === undefined) {
			return {
				errorMessage: `The game with ID ${gameId} doesn't exist.`
			};
		}
		let privateGame = game.privateGame;
		if (privateGame) {
			let isInvited = game
				.invited
				.filter(invitedPlayer => invitedPlayer === Meteor.user().username)
				.length == 1;
			console.log(Meteor.user());
			let isHost = game.host === Meteor.user().username;
			if (!isHost && !isInvited) {
				return {
					errorMessage: "This game is private and you haven't been invited."
				};
			}
		}
		let newPlayer = {
			username: Meteor.user().username,
			wpm: 0,
			current: ""
		};

		Games.update(gameId, {$push: {players: newPlayer}});
		return {ok: true};
	},
	"games.setTimeRemaining"(gameId, timeRemaining) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Games.update(gameId, {$set: {timeRemaining}});
	},
	"games.setPrepareTime"(gameId, prepareTime) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Games.update(gameId, {$set: {prepareTime}});
	},
	"games.addChar"(gameId, char) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		let players = game.players;
		let player;
		for (let p of players) {
			if (p.username === Meteor.user().username) {
				player = p;
				break;
			}
		}
		let current = player.current;
		current += char;
		player.current = current;
		Games.update(gameId, {$set: {players}});
	},
	"games.setWpm"(gameId, wpm) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		let players = game.players;
		let player;
		for (let p of players) {
			if (p.username === Meteor.user().username) {
				player = p;
				break;
			}
		}
		player.wpm = wpm;
		Games.update(gameId, {$set: {players}});
	},
	"games.setCurrent"(gameId, current) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		let players = game.players;
		let player;
		for (let p of players) {
			if (p.username === Meteor.user().username) {
				player = p;
				break;
			}
		}
		player.current = current;
		Games.update(gameId, {$set: {players}});
	},
	"games.invitePlayer"(gameId, username) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		if (!game.privateGame) {
			throw new Meteor.Error("operation not supported on public games");
		}
		let exists = Meteor.users.find({username}).count() === 1;
		if (!exists) {
			return false;
		}
		let invited = game.invited;
		let alreadyInvited = invited
			.filter(invitedUsername => invitedUsername === username)
			.length === 1;
		if (username !== game.host && !alreadyInvited) {
			Games.update(gameId, {$push: {invited: username}});
		}
		return true;
	}
});