import React from 'react';
import * as _ from 'lodash';
import ProjectDuration from '../../datepicker/index';
import DatepickerHelper from '../../datepicker/helper';
import Moment from 'moment';

let idCounter = 0;
let NewProject = React.createClass({
    propTypes: {
        clientList: React.PropTypes.array.isRequired,
        employeeList: React.PropTypes.array.isRequired,
        projectList: React.PropTypes.array.isRequired
    },
		getInitialState: function () {
				return {
					endDateByHours: 0
				}
		},
    render() {
        let defaultClientValue, defaultEmployeeValue;

        // check for array length; if elements not exists initial count value will be set to 0
        if (this.props.projectList.length) {
            let lastEl = _.last(this.props.projectList);
            idCounter = lastEl.id;
        }

        let clientOptions = this.props.clientList.map((opt,i) => {
           if (opt.selected === 'selected') {
               defaultClientValue = opt.value;
           }
            return <option key={i} value={opt.id}>{opt.name}</option>
        }, this);
        
        let employeeOptions = this.props.employeeList.map((opt, i) => {
           if (opt.selected === 'selected') {
               defaultEmployeeValue = opt.value;
           }
            return <option key={i} value={opt.id}>{opt.name}</option>
        });

        return(
            <form onSubmit={this.saveProject} className="form-horizontal col-sm-6">
                <div className="form-group">
                    <label htmlFor="inptEmplName" className="col-sm-4 control-label">Pracownik</label>
                    <div className="col-sm-8">
                        <select className="form-control" defaultValue={defaultEmployeeValue} name={this.props.name} ref="employeeOption">{employeeOptions}</select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="option" className="col-sm-4 control-label">Wybierz projekt</label>
                    <div className="col-sm-8">
                        <select className="form-control" defaultValue={defaultClientValue} name={this.props.name} ref="clientOption">{clientOptions}</select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="datePicker" className="col-sm-4 control-label">Rozpoczęcie projektu</label>
                    <div className="col-sm-8">
                        <ProjectDuration ref="datePicker"/>
                    </div>
                </div>
                <div className="form-group">
									<label htmlFor="timeInHour" className="col-sm-4 control-label">Szacunkowy czas wdrożenia</label>
	                <div className="col-sm-8">
		                <div className="col-sm-5 inputNumber">
			                <input onChange={this.getHours} type="number" min="0" value={this.state.endDateByHours} id="timeInHour" className="form-control" required />
		                </div>
	                </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-4 control-label">&nbsp;</label>
                    <div className="col-sm-8">
                        <button type="submit" className="btn btn-default">Dodaj</button>
                    </div>
                </div>
            </form>
        )
    },
		getHours: function (event) {
				let availableHours = event.target.value;
				const oneDay = 7.5;
				let approxDays = Math.ceil(availableHours / oneDay);
				let startDate = this.refs.datePicker.state.startDate;
				// end date must take start date ref to start correctly
				let endDate = this.refs.datePicker.state.startDate;

				this.setState({
					endDateByHours: event.target.value
				});

				endDate = Moment(endDate).add(approxDays, 'days');
				let weekendDaysCount = DatepickerHelper.weekendDays(startDate, endDate);
			console.log(endDate)
				if (weekendDaysCount > 0) {
					let newNumber = approxDays + (weekendDaysCount - 1);
					endDate = Moment(endDate).add(newNumber, 'days');
					console.log(newNumber);
					console.log(endDate)
				}
			console.log(endDate)
		},
    saveProject: function (e) {
        e.preventDefault();

        function uniqueId() {
            let counter = idCounter;
            return ++counter;
        }

        let newProject = {
            id: uniqueId(),
            employe_id: this.refs.employeeOption.value,
            client: this.refs.clientOption.value,
            startDate: this.refs.datePicker.state.startDate,
            endDate: this.refs.datePicker.state.endDate
        };

        this.props.onProjectAdd(
            newProject.id,
            newProject.employe_id,
            newProject.client,
            newProject.startDate,
            newProject.endDate
        );
    }
});

export { NewProject };