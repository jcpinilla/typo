import React, { Component } from "react";

import { Meteor } from "meteor/meteor";

import ShownText from "./ShownText.js";

export default class CurrentPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
		this.handleChange = this.handleChange.bind(this);
	}

	initialState() {
		let gameId = this.props.gameId;
		let initialCurrent = "";
		let initialWpm = 0;
		Meteor.call("games.setCurrent", gameId, initialCurrent);
		Meteor.call("games.setWpm", gameId, initialWpm);
		return {
			index: 0,
			wordIndex: 0,
			shownIndex: 0,
			amount: 10,
			counter: 0,
			value: ""
		};
	}

	updateWpm() {
		let gameId = this.props.gameId;
		let timeElapsed = this.props.timeElapsed;

		let wordIndex = this.state.wordIndex;
		let counter = this.state.counter;

		let totalWords = wordIndex + counter;
		let wpm = timeElapsed !== 0 ? 
			(totalWords / timeElapsed) * 60
			: 0;
		wpm = Math.round(wpm);
		Meteor.call("games.setWpm", gameId, wpm);
	}

	addChar(char) {
		let gameId = this.props.gameId;
		Meteor.call("games.addChar", gameId, char);
	}

	handleChange(e) {
		let index = this.state.index;
		let inputText = e.target.value;
		let inputChar = inputText[inputText.length - 1];
		if (
			(inputChar !== " " || inputText !== " ")
			&& inputChar === this.props.text[index]
		) {
			this.addChar(inputChar);
			this.setState(state => {
				index = state.index;
				let shownIndex = state.shownIndex;
				shownIndex++;
				index++;
				let wordIndex = state.wordIndex;
				let counter = state.counter;
				let amount = state.amount;
				if (inputChar === " ") {
					inputText = "";
					counter++;
					if (counter === amount) {
						wordIndex += amount;
						counter = 0;
						shownIndex = 0;
					}
				}
				this.updateWpm();
				return {
					value: inputText,
					shownIndex,
					index,
					counter,
					wordIndex,
					amount
				};
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			let timeElapsed = nextProps.timeElapsed;
			if (timeElapsed === 0) {
				this.setState(this.initialState());
			} else if (timeElapsed === 60) {
				this.setState({value: ""});
			}
		}
	}

	render() {
		let shownIndex = this.state.shownIndex;
		let wordIndex = this.state.wordIndex;
		let amount = this.state.amount;

		let textArray = this.props.text
			.split(" ");
		let shownText = textArray
			.slice(wordIndex, wordIndex + amount)
			.join(" ");
		let nextText = textArray
			.slice(wordIndex + amount, wordIndex + 2 * amount)
			.join(" ");

		let position = this.props.position;
		let timeElapsed = this.props.timeElapsed;
		let wpm = this.props.wpm;
		return (
			<div>
				<div>{position} ({wpm} wpm)</div>
				{
					timeElapsed !== 60 &&
						<div>
							<ShownText
								text={shownText}
								index={shownIndex} />
							<div>{nextText}</div>
						</div>
				}
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleChange} />
			</div>
		);
	}
}