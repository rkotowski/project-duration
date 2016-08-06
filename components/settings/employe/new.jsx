import React from 'react';

let NewEmployee = React.createClass({
    render() {
        return(
            <form onSubmit={this.saveEmployee} className="form-horizontal col-sm-6">
               <div className="form-group">
                   <label htmlFor="inptNewEmployee" className="col-sm-3 control-label">Imię i nazwisko</label>
                   <div className="col-sm-9">
                       <input required type="text" ref="employeeNameInpt" className="form-control" id="inptNewEmployee" placeholder="Pracownik" />
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
        let name = this.refs.employeeNameInpt.value.trim();
        if (name) {
            console.log("Dodano pracownika :" + name);
        }
        this.props.onEmployeeAdd(name);
        this.refs.employeeNameInpt.value = '';
    }
});

export { NewEmployee };