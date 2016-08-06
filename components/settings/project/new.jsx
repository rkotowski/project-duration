import React from 'react';
import ProjectDuration from '../../datepicker/index';

let NewProject = React.createClass({
    render() {
        let defaultClientValue, defaultEmployeeValue;
        let clientOptions = this.props.clientList.map((opt,i) => {
           if (opt.selected === 'selected') {
               defaultClientValue = opt.value;
           }
            return <option key={i} value={opt.name}>{opt.name}</option>
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

        let newProjectArr = {
            emplName: this.refs.employeeOption.value,
            client: this.refs.clientOption.value,
            startDate: this.refs.datePicker.state.startDate,
            endDate: this.refs.datePicker.state.endDate
        };

        if(newProjectArr.emplName) {
            console.log("Dodano pracownika " + newProjectArr.emplName + " do projektu " + newProjectArr.client);
        }
        this.props.onProjectAdd(
            newProjectArr.emplName,
            newProjectArr.client,
            newProjectArr.startDate,
            newProjectArr.endDate
        );
    }
});

export { NewProject };