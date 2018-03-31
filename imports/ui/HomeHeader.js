import React, { Component } from "react";
import { Link } from "react-router-dom";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

export default class HomeHeader extends Component {
	render() {
		return (
			<div id="home-header">
				<div className="text-center">
					<h1 className="display-1">
						<Link to="/">TYPO</Link>
					</h1>
					<AccountsUIWrapper />
				</div>
			</div>
		);
	}
}
