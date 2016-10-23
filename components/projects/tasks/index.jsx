import React from 'react';
import * as _ from 'lodash';
import firebase from 'firebase';
import TaskList from './list';
import TaskForm from './new';

let taskStatusList = [
	{"id": 1,"name": "Ważne", "color": "red"},
	{"id": 2,"name": "Poprawa", "color": "yellow"},
	{"id": 3,"name": "Nowa funkcjonalność", "color": "blue"}
];

let Tasks = React.createClass({
	propTypes: {
		clientList: React.PropTypes.array,
		params: React.PropTypes.object.isRequired
	},
	
	getInitialState: function () {
		return {
			taskList: []
		}
	},
	
	componentWillMount: function () {
		let that = this;
		firebase.database().ref('taskList').on('value', function (snapshot) {
			let taskList = [];
			snapshot.forEach(function (data) {
				let task = {
					id: data.val().id,
					title: data.val().title,
					description: data.val().description,
					status: data.val().status,
					clientId: data.val().clientId,
					date: data.val().date
				};
				taskList.push(task);
				that.setState({taskList: taskList});
			});
		});
	},
	
	componentWillUnmount: function () {
		firebase.database().ref('taskList').off('value');
	},
	
	getClient: function () {
		const clientId = parseInt(this.props.params.projectId);
		return new Object(_.find(this.props.clientList, { 'id': clientId }));
	},

	render() {
		if (this.props.params.projectId) {
			let projectId = parseInt(this.props.params.projectId);
			return (
				<div className="TaskWrapper">
					<div className="content">
						<div className="pageComponentTitle"><span>Projekt:&nbsp;</span><b>{this.getClient().name}</b></div>
						<div className="pageComponentContent">
							<TaskList taskList={this.state.taskList} projectId={projectId} taskStatusList={taskStatusList}/>
							<TaskForm onTaskAdd={this.handleTaskAdd} projectId={projectId} taskList={this.state.taskList} taskStatusList={taskStatusList}/>
						</div>
					</div>
				</div>
			)
		} else return(
			<div></div>
		)
	},

	handleTaskAdd: function (id, title, desc, status, client, date) {
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
});

export default Tasks;