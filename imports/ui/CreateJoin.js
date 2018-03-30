import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { Redirect } from "react-router-dom";

export default class CreateJoin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameId: null,
			value: ""
		};
		this.handleCreate = this.handleCreate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCreate() {
		let language = "es";
		Meteor.call("games.create",
			language, 
			(err, res) => {
				let gameId = res;
				this.setState({
					gameId
				});
			});
	}

	handleChange(e) {
		let value = e.target.value;
		this.setState({
			value
		});
	}

	handleSubmit(e) {
		let gameId = this.state.value;
		Meteor.call("games.join", gameId, (err, res) => {
			if (res) {
				this.setState({
					gameId
				});
			} else {
				alert(`The game with id ${gameId} doesn't exist.`);
			}
		});
		e.preventDefault();
	}

	render() {
		let gameId = this.state.gameId;
		return (
			<div>
				{gameId ?
					<Redirect to={`/${gameId}`} /> :
					<div>
						<button onClick={this.handleCreate}>Create</button>
						<br />
						<form onSubmit={this.handleSubmit}>
							<label>
								Join:{" "}
								<input
									type="text"
									value={this.state.value}
									onChange={this.handleChange} />
							</label>
						</form>
					</div>
				}
			</div>
		);
	}
}