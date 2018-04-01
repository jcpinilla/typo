import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

if (Meteor.isClient) {
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY",
	});
}

if (Meteor.isServer) {
	Accounts.onCreateUser((options, user) => {
		if (user.profile === undefined) {
			user.profile = {};
		}
		user.profile.maxWpm = 0;
		return user;
	});

	Accounts.validateNewUser(user => {
		let maxChars = 10;
		if (user.username && user.username.length <= maxChars) {
			return true;
		} 
		throw new Meteor.Error(403, `Username must be at most ${maxChars} characters`);
	});
}
