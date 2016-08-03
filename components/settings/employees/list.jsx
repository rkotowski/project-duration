import React from 'react';
import moment from 'moment';
import firebase from 'firebase';

let EmployeeListWrapper = React.createClass({
    countDaysLeft: function () {
        let endDateDayNumber = this.props.data.endDate,
            newEndDate = moment(endDateDayNumber, 'DD-MM-YYYY').format('YYYY-MM-DD').split('-').map(Number),
            curr = moment().format('YYYY-MM-DD').split('-').map(Number);

        let start = moment(curr).locale('pl'),
            end = moment(newEndDate).locale('pl');
        if(end.diff(start, 'hours') < 24) {
            return 'Zakończenie projektu';
        } else {
            return start.from(end, true);
        }
    },
   render() {
       return(
           //={this.disabledClass()}
           <tr className>
               <th>{this.props.index + 1}</th>
               <td>{this.props.data.name}</td>
               <td>{this.props.data.project}</td>
               <td>{this.props.data.startDate}</td>
               <td>{this.props.data.endDate}</td>
               <td>{this.countDaysLeft()}</td>
               <td className="options">
                   <a role="button" disabled="disabled" className="btn btn-default btn-xs editProject">
                       <i className="glyphicon glyphicon-wrench"></i>
                   </a>
                   <a role="button" onClick={this.onDeleteProject.bind(this, this.props.data)} className="btn btn-default btn-xs deleteProject">
                       <i className="glyphicon glyphicon-trash"></i>
                   </a>
               </td>
           </tr>
       )
   },
    onDeleteProject(empl) {
        this.props.onDeleteProject(empl);
    }
});

let EmployeeList = React.createClass({
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
                    {this.props.employeeList.map((empl, index) => {
                        return <EmployeeListWrapper key={empl.id} index={index} data={empl} onDeleteProject={this.handleProjectDelete} />;
                    })}
               </tbody>
           </table>
        )
    },
    handleProjectDelete: function(empl) {
        // TODO: Po usunięciu kolumny trzeba zaktualizować cały obiekt z danymi (firebase ma metode "child_updated")
        let employeeList = this.props.employeeList;
        let itemID;

        // iterate on all collection objects to get collection index
        for(let emp of Object.keys(employeeList)) {
            if(employeeList[emp].id == empl.id) {
                itemID = emp;
                break;
            }
        }

        if(itemID) {
            // remove whole element from local array
            employeeList.splice(itemID, 1);

            // get all ref children keys and put it into array
            let collectionKeys = [];
            firebase.database().ref('employeeList').orderByKey().on('child_added', function (snapshot) {
                collectionKeys.push(snapshot.key);
            });

            // remove ref child that we want from database and local array
            let elemToDelete = collectionKeys[itemID];
            firebase.database().ref('employeeList').child(elemToDelete).remove();
            collectionKeys.splice(itemID, 1);
        }

        this.setState({ employeeList: employeeList });
    }
});

export default EmployeeList;