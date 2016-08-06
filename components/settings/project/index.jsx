import React from 'react';
import { NewProject } from './new';
import { NewClient } from '../client/new';
import { NewEmployee } from '../employe/new'
import ProjectList from '../projectList/list';
import firebase from 'firebase';

let Project = React.createClass({
    getInitialState: function () {
        return{
            projectList: [],
            clientList: [],
            employeeList: []
        }
    },
    componentDidMount: function () {
        let that = this;
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
        firebase.database().ref('projectList').on('value', function (snapshot) {
            let projectList = [];
            snapshot.forEach(function (data) {
                let project = {
                    id: data.val().id,
                    name: data.val().name,
                    client: data.val().client,
                    startDate: data.val().startDate,
                    endDate: data.val().endDate
                };
                projectList.push(project);
                that.setState({projectList: projectList});
            })
        });
    },
    render() {
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj projekt</div>
                    <div className="panel-body">
                        <NewClient onClientAdd={this.handleClientAdd} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj pracownika</div>
                    <div className="panel-body">
                        <NewEmployee onEmployeeAdd={this.handleEmployeeAdd} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj pracownika do projektu</div>
                    <div className="panel-body">
                        <NewProject onProjectAdd={this.handleProjectAdd} clientList={this.state.clientList} employeeList={this.state.employeeList} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Zarządzaj projektami</div>
                    <div className="panel-body">
                        <ProjectList projectList={this.state.projectList} />
                    </div>
                </div>
            </div>
        )
    },

    handleClientAdd: function (name) {
        let newClient = {
            id: this.state.clientList.length + 1,
            name: name
        };
        firebase.database().ref().child('clientList').push(newClient)
    },
    handleEmployeeAdd: function (name) {
        let newEmployee = {
            id: this.state.employeeList.length + 1,
            name: name
        };
        firebase.database().ref().child('employeeList').push(newEmployee)
    },
    handleProjectAdd: function (name, client, startDate, endDate) {
        // TODO: Po dodaniu nowej kolumny w kolekcji trzeba zaktualizować cały obiekt z danymi (firebase ma metode "child_updated")
        let newProject = {
            id: this.state.projectList.length + 1,
            name: name,
            client: client,
            startDate: startDate.locale('pl').format('DD.MM.YYYY'),
            endDate: endDate.locale('pl').format('DD.MM.YYYY')
        };
        firebase.database().ref().child('projectList').push(newProject);
    }
});

export default Project;