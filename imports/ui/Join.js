import React, { Component } from "react";

export default class Join extends Component {
	render() {
		let errorMessage = this.props.errorMessage;
		return (
			<div className="col-sm-6">
				<h1>Join a game</h1>
				<form onSubmit={this.props.handleJoin}>
					<label>
						Enter the game ID:{" "}
						<input
							autoFocus
							type="text"
							value={this.props.gameIdJoin}
							onChange={this.props.handleGameIdJoinChange} />
					</label>
				</form>
				{errorMessage &&
					<div id="join-error-alert">
						<div className="alert alert-danger alert-dismissible">
							<button
								onClick={this.props.dismissErrorMessage}
								type="button"
								className="close alert-close"
								data-dismiss="alert">
								&times;
							</button>
							{errorMessage}
						</div>
					</div>
				}
			</div>
		);
	}
}
