import React from 'react';
import { NewEmployee } from './new';
import { NewProject } from '../projects/new';
import EmployeeList from './list';
import firebase from 'firebase';

let Employees = React.createClass({
    getInitialState: function () {
        return{
            employeeList: [],
            projectList: []
        }
    },
    componentWillMount: function () {
        let that = this;
        firebase.database().ref('projectList').on('value', function (snapshot) {
            let projectList = [];
            snapshot.forEach(function (data) {
                let project = {
                    id: data.val().id,
                    name: data.val().name
                };
                projectList.push(project);
                that.setState({projectList: projectList});
            })
        });
        firebase.database().ref('employeeList').on('value', function (snapshot) {
            let employeeList = [];
            snapshot.forEach(function (data) {
                let employe = {
                    id: data.val().id,
                    name: data.val().name,
                    project: data.val().project,
                    startDate: data.val().startDate,
                    endDate: data.val().endDate
                };
                employeeList.push(employe);
                that.setState({employeeList: employeeList});
            })
        });
    },

    render() {
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj projekt</div>
                    <div className="panel-body">
                        <NewProject onProjectAdd={this.handleProjectAdd} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj pracownika do projektu</div>
                    <div className="panel-body">
                        <NewEmployee onEmplAdd={this.handleEmplAdd} projectList={this.state.projectList}/>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Zarządzaj pracownikami</div>
                    <div className="panel-body">
                        <EmployeeList employeeList={this.state.employeeList} />
                    </div>
                </div>
            </div>
        )
    },
    handleProjectAdd: function (name) {
        let newProject = {
            id: this.state.projectList.length + 1,
            name: name
        };
        firebase.database().ref().child('projectList').push(newProject)
    },
    handleEmplAdd: function (name, project, startDate, endDate) {
        // TODO: Po dodaniu nowej kolumny w kolekcji trzeba zaktualizować cały obiekt z danymi (firebase ma metode "child_updated")
        let newEmpl = {
            id: this.state.employeeList.length + 1,
            name: name,
            project: project,
            startDate: startDate.locale('pl').format('DD.MM.YYYY'),
            endDate: endDate.locale('pl').format('DD.MM.YYYY')
        };
        firebase.database().ref().child('employeeList').push(newEmpl);
    }
});

export default Employees;