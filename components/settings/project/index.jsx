import React from 'react';
import { NewProject } from './new';
import { NewClient } from '../client/new';
import { NewEmployee } from '../employe/new'
import ProjectList from '../projectList/list';
import firebase from 'firebase';

let Project = React.createClass({
    getInitialState: function () {
        return {
            projectList: [],
            clientList: [],
            employeeList: []
        }
    },
    componentWillMount: function () {
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
            });
        });
    },
    componentWillUnmount: function () {
        firebase.database().ref('clientList').off('value');
        firebase.database().ref('employeeList').off('value');
        firebase.database().ref('projectList').off('value');
    },
    render() {
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj projekt</div>
                    <div className="panel-body">
                        <NewClient clientList={this.state.clientList} onClientAdd={this.handleClientAdd} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj pracownika</div>
                    <div className="panel-body">
                        <NewEmployee employeeList={this.state.employeeList} onEmployeeAdd={this.handleEmployeeAdd} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Dodaj pracownika do projektu</div>
                    <div className="panel-body">
                        <NewProject onProjectAdd={this.handleProjectAdd} projectList={this.state.projectList} clientList={this.state.clientList} employeeList={this.state.employeeList} />
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

    handleClientAdd: function (id, name) {
        let newClient = {
            id: id,
            name: name
        };
        firebase.database().ref().child('clientList').push(newClient)
    },
    handleEmployeeAdd: function (id, name) {
        let newEmployee = {
            id: id,
            name: name
        };
        firebase.database().ref().child('employeeList').push(newEmployee)
    },
    handleProjectAdd: function (id, name, client, startDate, endDate) {

        let newProject = {
            id: id,
            name: name,
            client: client,
            startDate: startDate.locale('pl').format('DD.MM.YYYY'),
            endDate: endDate.locale('pl').format('DD.MM.YYYY')
        };
        firebase.database().ref().child('projectList').push(newProject);
    }
});

export default Project;