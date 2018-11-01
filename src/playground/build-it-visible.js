'use strict';

class VisibilityToggle extends React.Component {
	constructor (props) {
		super(props);
		this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
		this.state = {
			visibility: false
		}
	}

	handleVisibilityToggle () {
		this.setState((prevState) => {
			return {
				visibility: !prevState.visibility
			}
		});
	}

	render () {
		return (
			<div>
				<h1>Visibility App</h1>
				<button onClick={this.handleVisibilityToggle}>{this.state.visibility ? 'Hide text' : 'Show text'}</button>
				{
					this.state.visibility && (
						<div>
							<p>Here is the text that was hidden!</p>
						</div>
					)
				}
			</div>
		)
	}
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

/*
const appRoot = document.getElementById('app');

let visibility = false;
const onShowDetails = () => {
	visibility = !visibility;
	render();
};

const render = () => {
	const template = (
		<div>
			<h1>Visibility App</h1>
			<button onClick={onShowDetails}>{visibility ? 'Hide text' : 'Show text'}</button>
			{visibility && (
				<div>
					<p>Here is the text that was hiding!</p>
				</div>
			)}
		</div>
	);

	ReactDOM.render(template, appRoot);
};

render();
*/