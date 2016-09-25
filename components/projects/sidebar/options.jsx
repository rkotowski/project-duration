import React from 'react';

let Options = React.createClass({
	render() {
		return (
			<div className="options">
				<span className="drop-icons">
					<i className="glyphicon glyphicon-cog"></i>
					<i className="glyphicon glyphicon-menu-down"></i>
				</span>
				<div className="optionsWrapper">
					<ul>
						<li>Nowy projekt</li>
					</ul>
					<ul>
						<li>Oczekujące</li>
						<li>W realizacji</li>
						<li>Zakończone</li>
					</ul>
				</div>
			</div>
		)
	}
});

export default Options;