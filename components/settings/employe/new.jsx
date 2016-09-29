import React from 'react';
import _ from 'lodash';

let idCounter = 0;
let NewEmployee = React.createClass({
    propTypes: {
        employeeList: React.PropTypes.array.isRequired
    },
    render() {
        // check for array length; if elements not exists initial count value will be set to 0
        if (this.props.employeeList.length) {
            let lastEl = _.last(this.props.employeeList);
            idCounter = lastEl.id;
        }
        return(
            <form onSubmit={this.saveEmployee} className="form-horizontal col-sm-6">
               <div className="form-group">
                   <label htmlFor="inptNewEmployee" className="col-sm-4 control-label">Imię i nazwisko</label>
                   <div className="col-sm-8">
                       <input required type="text" ref="employeeNameInpt" className="form-control" id="inptNewEmployee" placeholder="Pracownik" />
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

    saveEmployee: function (e) {
        e.preventDefault();
        let name = this.refs.employeeNameInpt.value.trim();

        function uniqueId() {
            let counter = idCounter;
            return ++counter;
        }

        let newEmployee = {
            id: uniqueId(),
            name: name
        };

        this.props.onEmployeeAdd(
            newEmployee.id,
            newEmployee.name
        );

        this.refs.employeeNameInpt.value = '';
    }
});

export { NewEmployee };