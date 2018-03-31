import React, { Component } from "react";

export default class Join extends Component {
	render() {
		return (
			<div className="col-sm-6">
				<h1>Join a game</h1>
				<form onSubmit={this.props.handleSubmit}>
					<label>
						Enter the game ID:{" "}
						<input
							type="text"
							value={this.props.gameIdJoin}
							onChange={this.props.handleGameIdJoinChange} />
					</label>
				</form>
			</div>
		);
	}
}
