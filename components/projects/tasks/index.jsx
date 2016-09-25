import React from 'react';

let Tasks = React.createClass({
	render() {
		return (
			<div className="TaskWrapper">
				<div className="content">
					<div className="pageComponentTitle"><span>Projekt:&nbsp;</span>[nazwa projektu]</div>
					<div className="pageComponentContent"></div>
				</div>
			</div>
		)
	}
});

export default Tasks;