import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Pending = new Mongo.Collection("pending");

if (Meteor.isServer) {
	Meteor.publish("pending", function pendingPublication() {
		return Pending.find();
	});
}

Meteor.methods({
	"pending.insert"(gameId) {
		let username = Meteor.user().username;
		if (Pending.findOne({username})) return;
		let pendingPlayer = {
			username,
			gameId
		};
		Pending.insert(pendingPlayer);
	}
});