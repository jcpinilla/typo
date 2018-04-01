import React, { Component } from "react";
import { Link } from "react-router-dom";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

export default class GameHeader extends Component {
	render() {
		let gameId = this.props.match.params.gameId;
		return (
			<div>
				<div className="row text-center">
					<div className="col-sm-3">
						<h1 className="display-1">
							<Link to="/">TYPO</Link>
						</h1>
					</div>
					<div className="col-sm-6 header-message">
						Game ID: <span className="bigger-header-message">{gameId}</span>
					</div>
					<div className="col-sm-3">
						<AccountsUIWrapper />
					</div>
				</div>
				<hr />
			</div>
		);
	}
}
