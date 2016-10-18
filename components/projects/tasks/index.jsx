import React from 'react';
import * as _ from 'lodash';
import TaskList from './list';
import TaskForm from './form';

let Tasks = React.createClass({
	propTypes: {
		clientList: React.PropTypes.array,
		params: React.PropTypes.object.isRequired
	},
	
	getClient: function () {
		const clientId = parseInt(this.props.params.projectId);
		return new Object(_.find(this.props.clientList, { 'id': clientId }));
	},

	render() {
		if (this.props.params.projectId) {
			return (
				<div className="TaskWrapper">
					<div className="content">
						<div className="pageComponentTitle"><span>Projekt:&nbsp;</span>{this.getClient().name}</div>
						<div className="pageComponentContent">
							<TaskList />
							<TaskForm />
						</div>
					</div>
				</div>
			)
		} else return(
			<div></div>
		)
	}
});

export default Tasks;