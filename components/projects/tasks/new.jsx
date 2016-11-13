import React from 'react';
import * as _ from 'lodash';
import moment from 'moment';

let idCounter = 0;

let NewTask = React.createClass({
	propTypes: {
		taskList: React.PropTypes.array.isRequired,
		projectId: React.PropTypes.number.isRequired,
		onTaskAdd: React.PropTypes.func.isRequired,
		taskStatusList: React.PropTypes.array.isRequired
	},

	render() {
		const { taskStatusList, taskList } = this.props;
		let taskStatusOptions = taskStatusList.map((opt, i) => {
			return <option key={i} value={opt.id} >{opt.name}</option>
		}, this);

		if (taskList.length) {
			let lastEl = _.last(taskList);
			idCounter = lastEl.id;
		}

		return(
			<div className="NewTask col-md-7">
				<form onSubmit={this.addTask} className="form-horizontal">
					<div className="form-group">
						<div className="col-md-12">
							<input required type="text" ref="taskNameInpt" className="form-control" placeholder="Tytuł" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-12">
							<textarea required ref="taskDescription" className="form-control" rows="8" placeholder="Opis" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-12">
							<select className="form-control" ref="taskStatusOptions">{taskStatusOptions}</select>
						</div>
					</div>
					<div className="form-group buttons">
						<div className="col-md-12">
							<button type="submit" className="btn btn-default">Dodaj</button>
							<button type="reset" className="btn btn-default">Anuluj</button>
						</div>
					</div>
				</form>
			</div>
		)
	},

	addTask: function (e) {
		e.preventDefault();

		function uniqueId() {
			let counter = idCounter;
			return ++counter;
		}

		let newTask = {
			id: uniqueId(),
			title: this.refs.taskNameInpt.value,
			description: this.refs.taskDescription.value,
			status: this.refs.taskStatusOptions.value,
			client: this.props.projectId,
			date: moment().locale('pl').format('D MMM YYYY')
		};

		this.props.onTaskAdd(
			newTask.id,
			newTask.title,
			newTask.description,
			newTask.status,
			newTask.client,
			newTask.date
		);

		this.refs.taskNameInpt.value = '';
		this.refs.taskDescription.value = '';
	}

});

export default NewTask;