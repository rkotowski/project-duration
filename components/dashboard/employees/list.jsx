import React from 'react';
import firebase from 'firebase';
import EmployeesListElement from './employeesListElement';

let EmployeeList = React.createClass({
    getInitialState: function() {
        return {
            employeeList: []
        }
    },
    componentWillMount: function () {
        let that = this;
        firebase.database().ref('employeeList').on('value', function (snapshot) {
            let employeeList = [];
            snapshot.forEach(function (data) {
                let employee = {
                    id: data.val().id,
                    name: data.val().name
                };
                employeeList.push(employee);
                that.setState({employeeList: employeeList});
            })
        });
    },
    componentWillUnmount: function () {
        firebase.database().ref('employeeList').off('value');
    },
    render() {
        return (
            <div className="employeeList">
                {this.state.employeeList.map((empl, index) => {
                    return <EmployeesListElement key={empl.id} index={index} data={empl} />
                })}
            </div>
        )
    }
});

export { EmployeeList }