import React from 'react';
import Project from './project';
import * as _ from 'lodash';

let EmployeesListElement = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        projectList: React.PropTypes.array.isRequired,
        employeeList: React.PropTypes.array.isRequired
    },
    
    getProjectIndex: function (index) {
        if (index != 0) {
            return <div className="col-sm-2"></div>;
        } 
    },
    findAllProjects: function () {
        let wantedProjects = [];
        let projectList = this.props.projectList;
        let currentEmployeId = this.props.data.id;

        _.forEach(projectList, function (project) {
            if (project.employe_id == currentEmployeId) {
                wantedProjects.push(project);
            }
        });

        return (
            <div>
                <div className="col-sm-2 emplName">{this.props.data.name}</div>
                {wantedProjects.map((project, index) => {
                    return <Project key={project.id} index={index} data={project} namePlaceholder={this.getProjectIndex(index)} />
                })}
            </div>
        )
    },
    render() {
        return <div className="listElement"> {this.findAllProjects()} </div>
    }
});


export default EmployeesListElement;