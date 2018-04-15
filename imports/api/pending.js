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
		let player = Pending.findOne({username});
		if (player) return;
		Pending.insert({username});
	}
});