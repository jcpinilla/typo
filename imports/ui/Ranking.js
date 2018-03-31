import React, { Component } from "react";

import RankingItem from "./RankingItem.js";

export default class Ranking extends Component {
	render() {
		let players = this.props.players;
		return (
			<div className="text-center">
				<h1 id="ranking-title">Ranking</h1>
				<table className="table">
					<thead>
						<tr>
							<th>Position</th>
							<th>Username</th>
							<th>Speed (wpm)</th>
							<th>Max ever (wpm)</th>
						</tr>
					</thead>
					<tbody>
						{
							players.map((player, index) => (
								<RankingItem
									key={player.username}
									position={index + 1}
									player={player} />
							))
						}
					</tbody>
				</table>
			</div>
		);
	}
}
