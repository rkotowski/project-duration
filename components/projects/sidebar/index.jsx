import React from 'react';
import Options from './options';
import ProjectList from './projectList';

let Sidebar = React.createClass({
	propTypes: {
		clientList: React.PropTypes.array.isRequired
	},

	render() {
		return (
			<div className="TaskSidebarWrapper">
				<div className="content">
					<div className="pageComponentTitle"><b>Projekty</b>
						<Options />
					</div>
					<div className="pageComponentContent">
						<ProjectList clientList={this.props.clientList} />
					</div>
				</div>
			</div>
		)
	}
});

export default Sidebar;