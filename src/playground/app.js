'use strict';

class IndecisionApp extends React.Component {
	constructor (props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);

		this.state = {
			options: []
		};
	}

	handleDeleteOptions () {
		this.setState(() => ({ options: [] }));
	}

	handleDeleteOption (optionToRemove) {
		this.setState(prevState => ({
			options: prevState.options.filter(option => optionToRemove !== option)
		}));
	}

	handlePick () {
		const randomOption = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomOption];
		alert(`Option ${option} was randomly selected!`);
	}

	handleAddOption (option) {
		if (!option) {
			return 'Enter a valid option';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState(prevState => ({
			options: prevState.options.concat(option)
		}));
	}

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
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
			</div>
		);
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{ props.subtitle && <h2>{props.subtitle}</h2> }
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

const Action = (props) => {
	return (
		<div>
			<button
				disabled={!props.hasOptions}
				onClick={props.handlePick}
			>
				What should I do?
			</button>
		</div>
	);
};

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{ props.options.length === 0 && <p>Please add an option to get started!</p> }
			<ul>
				{
					props.options.map(option => (
						<Option
							key={option}
							optionText={option}
							handleDeleteOption={props.handleDeleteOption}
						/>
					))
				}
			</ul>
		</div>
	);
};

const Option = (props) => {
	return (
		<li>
			{props.optionText}
			<button
				onClick={(e) => {
					props.handleDeleteOption(props.optionText);
				}}
			>
				remove
			</button>
		</li>
	);
};

class AddOption extends React.Component {
	constructor (props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);

		this.state = {
			error: undefined
		};
	}

	handleFormSubmit (e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => ({ error }));

		if (!error) {
			e.target.elements.option.value = '';
		}
	}

	render () {
		return (
			<div>
				{ this.state.error &&  <p>{this.state.error}</p> }
				<form onSubmit={this.handleFormSubmit}>
					<input type="text" name="option" />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
