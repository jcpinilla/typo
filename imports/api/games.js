import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import generateWords from "./WordGenerator.js";

export const Games = new Mongo.Collection("games");

Meteor.methods({
	"games.create"(language) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let gameId = "" + (Games.find({}).count() + 1);
		let numberOfWords = 200;
		let host = Meteor.user().username;
		let text = generateWords(language, numberOfWords);
		let timeRemaining = 0;
		let players = [{
			username: host,
			wpm: 0,
			current: ""
		}];
		Games.insert({
			_id: gameId,
			host,
			text,
			timeRemaining,
			players
		});
		return gameId;
	},
	"games.join"(gameId) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let game = Games.findOne({_id: gameId});
		if (game === undefined) {
			return false;
		}

		let players = game.players;
		let exists = players
			.filter(player => player.username === Meteor.user().username)
			.length === 1;
		if (exists) {
			return true;
		}
		let newPlayer = {
			username: Meteor.user().username,
			wpm: 0,
			current: ""
		};
		players.push(newPlayer);

		Games.update({_id: gameId}, {$set: {players}});
		return true;
	},
	"games.setTimeRemaining"(gameId, timeRemaining) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Games.update(gameId, {$set: {timeRemaining}});
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
	}
});