import React from 'react';
import * as _ from 'lodash';
import TaskList from './list';
import TaskForm from './new';
import { connect } from 'react-redux';

import { fetchTaskList } from '../../../actions/taskActions';

let taskStatusList = [
	{"id": 1,"name": "Ważne", "color": "red"},
	{"id": 2,"name": "Poprawa", "color": "yellow"},
	{"id": 3,"name": "Nowa funkcjonalność", "color": "blue"}
];

@connect((store) => {
	return {
		taskList: store.TaskList.taskList
	}
})

class Tasks extends React.Component {
	propTypes: {
		clientList: React.PropTypes.array,
		params: React.PropTypes.object.isRequired
	};
	
	componentWillMount() {
		this.props.dispatch(fetchTaskList());
	}
	
	componentWillUnmount() {

	}
	
	getClient() {
		const clientId = parseInt(this.props.params.projectId);
		return new Object(_.find(this.props.clientList, { 'id': clientId }));
	}

	render() {
		const { taskList, params } = this.props;

		if (params.projectId) {
			let projectId = parseInt(params.projectId);
			return (
				<div className="TaskWrapper">
					<div className="content">
						<div className="pageComponentTitle"><span>Projekt:&nbsp;</span><b>{this.getClient().name}</b></div>
						<div className="pageComponentContent">
							<TaskList taskList={taskList} projectId={projectId} taskStatusList={taskStatusList}/>
							<TaskForm onTaskAdd={this.handleTaskAdd} projectId={projectId} taskList={taskList} taskStatusList={taskStatusList}/>
						</div>
					</div>
				</div>
			)
		} else return (
			<div></div>
		)
	}

	handleTaskAdd(id, title, desc, status, client, date) {
		let newTask = {
			id: id,
			title: title,
			description: desc,
			status: parseInt(status),
			clientId: client,
			date: date
		};

		firebase.database().ref().child('taskList').push(newTask);
	}
}

export default Tasks;