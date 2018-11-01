'use strict';

import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
	state = {
		options        : [],
		selectedOption : undefined
	};

	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }));
	};

	handleDeleteOption = (optionToRemove) => {
		this.setState(prevState => ({
			options: prevState.options.filter(option => optionToRemove !== option)
		}));
	};

	handlePick = () => {
		const randomOption = Math.floor(Math.random() * this.state.options.length);
		const selectedOption = this.state.options[randomOption];

		this.setState(() => ({ selectedOption }));
	};

	handleAddOption = (option) => {
		if (!option) {
			return 'Enter a valid option';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState(prevState => ({
			options: prevState.options.concat(option)
		}));
	};

	handleCloseModal = () => {
		this.setState(() => ({ selectedOption: undefined }))	;
	};

	componentDidMount () {
		try {
			const options = JSON.parse(localStorage.getItem('options'));

			if (options) {
				this.setState(() => ({options}));
			}
		} catch (e) {
			// do nothing
		}
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}

	componentWillUnmount () {
		console.log('componentWillUnmount!');
	}

	render () {
		const subtitle = 'Decisions made for you';

		return (
			<div>
				<Header subtitle={subtitle} />
				<div className="container">
					<Action
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">
						<Options
							options={this.state.options}
							handleDeleteOptions={this.handleDeleteOptions}
							handleDeleteOption={this.handleDeleteOption}
						/>
						<AddOption
							handleAddOption={this.handleAddOption}
						/>
					</div>
				</div>
				<OptionModal
					selectedOption={this.state.selectedOption}
					handleCloseModal={this.handleCloseModal}
				/>
			</div>
		);
	}
}
