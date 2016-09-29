import React from 'react';
import { Link } from 'react-router';

let Options = React.createClass({
	getInitialState: function () {
		return {
			active: ''
		}
	},
	render() {
		return (
			<div className="optionsWrapper">
				<div className="optionsButton" onClick={this.dropOptions}>
					<span className="drop-icons">
						<i className="glyphicon glyphicon-cog"></i>
						<i className="glyphicon glyphicon-menu-down"></i>
					</span>
				</div>
				<div className={'optionsList' + this.state.active}>
					<ul>
						<li><Link to="/settings">Nowy projekt</Link></li>
						<li className="divider"></li>
						<li>Oczekujące</li>
						<li>W realizacji</li>
						<li>Zakończone</li>
					</ul>
				</div>
			</div>
		)
	},
	dropOptions: function () {
		if (this.state.active == '') {
			this.setState({active: ' on'})
		} else {
			this.setState({active: ''})
		}
	}
});

export default Options;