import React, { Component } from "react";
import { Link } from "react-router-dom";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<ul className="navbar-nav">
					<li className="navbar-item">
						<Link className="navbar-brand" to="/">TYPO</Link>
					</li>
					<li className="navbar-item">
						<span className="nav-link"><AccountsUIWrapper /></span>
					</li>
				</ul>
			</nav>
		);
	}
}
