import React from 'react';

let TaskListElement = React.createClass({
	propTypes: {
		task: React.PropTypes.object.isRequired,
		taskStatus: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			active: ''
		}
	},
	// TODO: Archiwizacja zadań. Po kliknięciu "usunąć" zadanie z listy zadań i przenieść do "archiwum"
	// Może trzeba będzie dodać zakładki nad listą zadań podzieloną na "Aktywne" i "Zakończone".
	// Umożliwi to prowadzenie historii z prac nad danym projektem.
	render() {
		let task = this.props.task;
		let taskStatus = this.props.taskStatus;
		return(
			<li className={'listElement ' + taskStatus.color}>
				<div className="title">
					{task.title}
					<span className="manage">
						<i className="fa fa-cog" onClick={this.dropOptions}/>
						<div className={"archive " + this.state.active}>
							<ul>
								<li>Archiwizuj zadanie</li>
								<li>Edytuj zadanie</li>
							</ul>
						</div>
					</span>
				</div>
				<div className="description">{task.description}</div>
				<div className="publishDate">
					<span className="date"><i className="fa fa-calendar"/>{task.date}</span>
					<span className="badge badge-roundless">{this.props.taskStatus.name}</span>
				</div>
			</li>
		)
	},
	dropOptions: function () {
		if (this.state.active == '') {
			this.setState({active: 'on'})
		} else {
			this.setState({active: ''})
		}
	}
});

export default TaskListElement;