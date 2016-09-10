import React from 'react';
import firebase from 'firebase';
import ProjectListWrapper from './projectListWrapper';

let ProjectList = React.createClass({
    propTypes: {
      projectList: React.PropTypes.array.isRequired,
      clientList: React.PropTypes.array.isRequired,
      employeeList: React.PropTypes.array.isRequired
    },
    render() {
        return(
           <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pracownik</th>
                        <th>Projekt</th>
                        <th>Czas rozpoczęcia wdrożenia</th>
                        <th>Czas zakończenia wdrożenia</th>
                        <th>Do końca</th>
                        <th>Zarządzaj</th>
                    </tr>
                </thead>
               <tbody>
                    {this.props.projectList.map((project, index) => {
                        return <ProjectListWrapper key={project.id} index={index} employee={this.props.employeeList} client={this.props.clientList} data={project} onDeleteProject={this.handleProjectDelete} />;
                    })}
               </tbody>
           </table>
        )
    },
    handleProjectDelete: function(project) {
        // TODO: Po usunięciu kolumny trzeba zaktualizować cały obiekt z danymi (firebase ma metode "child_updated")
        let projectList = this.props.projectList;
        let itemID;

        // iterate on all collection objects to get collection index
        for(let proj of Object.keys(projectList)) {
            if(projectList[proj].id == project.id) {
                itemID = proj;
                break;
            }
        }

        if(itemID) {
            // remove whole element from local array
            projectList.splice(itemID, 1);

            // get all ref children keys and put it into array
            let collectionKeys = [];
            firebase.database().ref('projectList').orderByKey().on('child_added', function (snapshot) {
                collectionKeys.push(snapshot.key);
            });

            // remove ref child that we want from database and local array
            let elemToDelete = collectionKeys[itemID];
            firebase.database().ref('projectList').child(elemToDelete).remove();
            collectionKeys.splice(itemID, 1);

            this.setState({ projectList: projectList });
        }
    }
});

export default ProjectList;