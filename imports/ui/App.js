import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import CurrentGame from "./CurrentGame.js";
import CreateJoin from "./CreateJoin.js";
import Header from "./Header.js";

class App extends Component {
	render() {
		let user = this.props.currentUser;
		let content = (
			user ?
				<Switch>
					<Route exact path="/" component={CreateJoin} />
					<Route path="/:gameId" component={CurrentGame} />
				</Switch> :
				<Redirect to="/" />
		);
		return (
			<Router>
				<div className="container-fluid">
					<header>
						<Header />
					</header>
					<main>
						{content}
					</main>
				</div>
			</Router>
		);
	}
}

export default withTracker(() => {
	// let currentUser = Meteor.user();
	// if (currentUser !== null) {
	// 	Meteor.call("players.tryCreateProfile");
	// }
	return {
		currentUser: Meteor.user()
	};
})(App);