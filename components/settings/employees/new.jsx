import React from 'react';
import ProjectDuration from '../../datepicker/index';

let NewEmployee = React.createClass({
    render() {
        let defaultValue;
        let options = this.props.projectList.map((opt,i) => {
           if(opt.selected === 'selected') {
               defaultValue = opt.value;
           }
            return <option key={i} value={opt.name}>{opt.name}</option>
        }, this);

        return(
            <form onSubmit={this.saveEmployee} className="form-horizontal col-sm-6">
                <div className="form-group">
                    <label htmlFor="inptEmplName" className="col-sm-3 control-label">Imie i nazwisko</label>
                    <div className="col-sm-9">
                        <input type="text" required ref="inptEmplName" className="form-control" id="inptEmplName" placeholder="Imie" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inptLastName" className="col-sm-3 control-label">Wybierz projekt</label>
                    <div className="col-sm-9">
                        <select className="form-control" defaultValue={defaultValue} name={this.props.name} ref="option">{options}</select>
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
    saveEmployee: function (e) {
        e.preventDefault();

        let emplArr = {
            emplName: this.refs.inptEmplName.value,
            emplProj: this.refs.option.value,
            startDate: this.refs.datePicker.state.startDate,
            endDate: this.refs.datePicker.state.endDate
        };

        if(!emplArr.emplName) {
            console.log("Wpisz imie i nazwisko")
        } else {
            console.log("Dodano pracownika " + emplArr.emplName + " do projektu " + emplArr.emplProj);
        }
        this.props.onEmplAdd(
            emplArr.emplName,
            emplArr.emplProj,
            emplArr.startDate,
            emplArr.endDate,
            emplArr.isFinished
        );

        this.refs.inptEmplName.value = '';
    }
});

export { NewEmployee };