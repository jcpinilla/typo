import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CurrentGame from "./CurrentGame.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";
import CreateJoin from "./CreateJoin.js"

export default class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<AccountsUIWrapper />
					<Switch>
						<Route exact path="/" component={CreateJoin} />
						<Route path="/:gameId" component={CurrentGame} />
					</Switch>
				</div>
			</Router>
		);
	}
}
