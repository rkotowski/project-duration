import React from 'react';
import Options from './options';

let Sidebar = React.createClass({
	render() {
		return (
			<div className="TaskSidebarWrapper">
				<div className="content">
					<div className="pageComponentTitle">Projekty
						<Options />
					</div>
					<div className="pageComponentContent"></div>
				</div>
			</div>
		)
	}
});

export default Sidebar;