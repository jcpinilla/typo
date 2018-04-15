import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Pending = new Mongo.Collection("pending");

if (Meteor.isServer) {
	Meteor.publish("pending", function pendingPublication() {
		return Pending.find();
	});
}

Meteor.methods({
	"pending.insert"() {
		let username = Meteor.user().username;
		let pendingPlayer = Pending.findOne({username});
		if (pendingPlayer) return;
		Pending.insert({username});
	}
});