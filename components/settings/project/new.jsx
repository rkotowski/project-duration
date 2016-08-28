import React from 'react';
import _ from 'lodash';
import ProjectDuration from '../../datepicker/index';
import { getClient } from '../../helper/AppHelper';

let idCounter = 0;
let NewProject = React.createClass({
    propTypes: {
        clientList: React.PropTypes.array.isRequired,
        employeeList: React.PropTypes.array.isRequired,
        projectList: React.PropTypes.array.isRequired
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
            return <option key={i} value={opt.name}>{opt.name}</option>
        });

        return(
            <form onSubmit={this.saveProject} className="form-horizontal col-sm-6">
                <div className="form-group">
                    <label htmlFor="inptEmplName" className="col-sm-3 control-label">Pracownik</label>
                    <div className="col-sm-9">
                        <select className="form-control" defaultValue={defaultEmployeeValue} name={this.props.name} ref="employeeOption">{employeeOptions}</select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="option" className="col-sm-3 control-label">Wybierz projekt</label>
                    <div className="col-sm-9">
                        <select className="form-control" defaultValue={defaultClientValue} name={this.props.name} ref="clientOption">{clientOptions}</select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="datePicker" className="col-sm-3 control-label">Czas realizacji</label>
                    <div className="col-sm-9">
                        <ProjectDuration ref="datePicker"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">&nbsp;</label>
                    <div className="col-sm-9">
                        <button type="submit" className="btn btn-default">Dodaj</button>
                    </div>
                </div>
            </form>
        )
    },
    saveProject: function (e) {
        e.preventDefault();

        function uniqueId() {
            let counter = idCounter;
            return ++counter;
        }

        let newProject = {
            id: uniqueId(),
            emplName: this.refs.employeeOption.value,
            client: this.refs.clientOption.value,
            startDate: this.refs.datePicker.state.startDate,
            endDate: this.refs.datePicker.state.endDate
        };

        if(newProject.emplName) {
            console.log("Dodano pracownika " + newProject.emplName + " do projektu " + getClient(newProject.client, this.props.clientList).name);
        }
        this.props.onProjectAdd(
            newProject.id,
            newProject.emplName,
            newProject.client,
            newProject.startDate,
            newProject.endDate
        );
    }
});

export { NewProject };