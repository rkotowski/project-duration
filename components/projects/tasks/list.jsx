import React from 'react';
import * as _ from 'lodash';
import TaskListElement from './list_element';

let TaskList = React.createClass({
	propTypes: {
		taskList: React.PropTypes.array.isRequired,
		projectId: React.PropTypes.number.isRequired,
		taskStatusList: React.PropTypes.array.isRequired
	},

	getTaskListForProject: function () {
		let filterTaskList = _.filter(this.props.taskList, { 'clientId': this.props.projectId});

		return filterTaskList.map((task, index) => {
			return <TaskListElement taskStatus={this.getTaskStatusOption(task.status)} task={task} key={index} />
		});
	},

	getTaskStatusOption: function (id) {
		return _.find(this.props.taskStatusList, { 'id': id });
	},
	
	render() {
		return(
			<div className="TaskList col-md-5">
				<ul>{this.getTaskListForProject()}</ul>
			</div>
		)
	}
});

export default TaskList;