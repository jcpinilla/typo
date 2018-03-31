import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Redirect } from "react-router-dom";

import Create from "./Create.js";
import Join from "./Join.js";

export default class CreateJoin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameId: null,
			gameIdJoin: "",
			language: "es",
			errorMessage: null
		};
		this.handleCreate = this.handleCreate.bind(this);
		this.handleGameIdJoinChange = this.handleGameIdJoinChange.bind(this);
		this.handleLanguageChange = this.handleLanguageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissErrorMessage = this.dismissErrorMessage.bind(this);
	}

	dismissErrorMessage() {
		this.setState({
			errorMessage: null
		});
	}

	handleCreate() {
		let language = this.state.language;
		Meteor.call("games.create",
			language, 
			(err, res) => {
				let gameId = res;
				this.setState({
					gameId
				});
			});
	}

	handleGameIdJoinChange(e) {
		let gameIdJoin = e.target.value;
		this.setState({
			gameIdJoin
		});
	}

	handleLanguageChange(e) {
		let language = e.target.value;
		this.setState({
			language
		});
	}

	handleSubmit(e) {
		let gameId = this.state.gameIdJoin;
		Meteor.call("games.join", gameId, (err, res) => {
			if (res) {
				this.setState({
					gameId
				});
			} else {
				let errorMessage = `The game with ID ${gameId} doesn't exist.`;
				this.setState({
					errorMessage
				});
			}
		});
		e.preventDefault();
	}

	render() {
		let gameId = this.state.gameId;
		if (gameId) {
			return <Redirect to={`/${gameId}`} />;
		}
		return (
			<div id="create-join" className="row">						
				<Create
					language={this.state.language}
					handleLanguageChange={this.handleLanguageChange}
					handleCreate={this.handleCreate} />
				<Join
					errorMessage={this.state.errorMessage}
					dismissErrorMessage={this.dismissErrorMessage}
					handleSubmit={this.handleSubmit}
					gameIdJoin={this.state.gameIdJoin}
					handleGameIdJoinChange={this.handleGameIdJoinChange} />
			</div>
		);
	}
}