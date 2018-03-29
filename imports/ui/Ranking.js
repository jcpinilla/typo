import React, { Component } from "react";

import RankingItem from "./RankingItem.js";

export default class Ranking extends Component {
	render() {
		let players = this.props.players;
		return (
			<div>
				<h3>Ranking:</h3>
				<ol>
					{
						players.map(player => (
							<RankingItem
								key={player.username}
								player={player} />
						))
					}
				</ol>
			</div>
		);
	}
}
