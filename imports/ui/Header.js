import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

import HomeHeaderUser from "./HomeHeaderUser.js";
import GameHeader from "./GameHeader.js";

export default class Header extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={HomeHeaderUser} />
				<Route path="/:gameId" component={GameHeader} />
			</Switch>
		);
	}
}
