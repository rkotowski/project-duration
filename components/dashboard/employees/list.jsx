import React from 'react';
import firebase from 'firebase';
import EmployeesListElement from './employeesListElement';

let EmployeeList = React.createClass({
    getInitialState: function() {
        return {
            employeeList: [],
            projectList: [],
            clientList: []
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
            });
            that.setState({employeeList: employeeList});
        });
        firebase.database().ref('projectList').on('value', function (snapshot) {
            let projectList = [];
            snapshot.forEach(function (data) {
                let project = {
                    id: data.val().id,
                    employe_id: data.val().employe_id,
                    client_id: data.val().client_id,
                    startDate: data.val().startDate,
                    endDate: data.val().endDate
                };
                projectList.push(project);
            });
            that.setState({projectList: projectList});
        });
        firebase.database().ref('clientList').on('value', function (snapshot) {
            let clientList = [];
            snapshot.forEach(function (data) {
                let client = {
                    id: data.val().id,
                    name: data.val().name
                };
                clientList.push(client);
                that.setState({clientList: clientList});
            })
        });
    },
    componentWillUnmount: function () {
        firebase.database().ref('employeeList').off('value');
        firebase.database().ref('projectList').off('value');
        firebase.database().ref('clientList').off('value');
    },
    render() {
        return (
            <div className="employeeList col-sm-12">
                <div className="listHead">
                    <div className="col-sm-2">&nbsp;</div>
                    <div className="col-sm-8">&nbsp;</div>
                    <div className="col-sm-2">&nbsp;</div>
                </div>
                <div className="employerWrapper">
                    {this.state.employeeList.map((empl, index) => {
                        return <EmployeesListElement key={empl.id}
                                 index={index}
                                 projectList={this.state.projectList}
                                 employeeList={this.state.employeeList}
                                 clientList={this.state.clientList}
                                 data={empl}
                        />
                    })}
                </div>
            </div>
        )
    }
});

export { EmployeeList }