import React from 'react';
import EmployeesListElement from './employeesListElement';
import { connect } from 'react-redux';

import { fetchProjectList } from '../../../actions/projectsActions';
import { fetchEmployeeList } from '../../../actions/employesActions';
import { fetchClientList } from '../../../actions/clientsActions';

@connect((store) => {
	return {
		employeeList: store.EmployeeList.employeeList,
		projectList: store.ProjectList.projectList,
		clientList: store.ClientList.clientList,
		loader: store.EmployeeList.fetched
	}
})

class EmployeeList extends React.Component {
	componentWillMount() {
		this.props.dispatch(fetchEmployeeList());
		this.props.dispatch(fetchProjectList());
		this.props.dispatch(fetchClientList());
  }

  componentWillUnmount(){

  }

  render() {
	  const { employeeList, projectList, clientList, loader } = this.props;
	  let styles = {
		  display: loader == false ? 'block' : 'none'
	  };
	  
    return (
      <div className="employeeList col-sm-12">
        <div className="listHead">
          <div className="col-sm-2">&nbsp;</div>
          <div className="col-sm-8">&nbsp;</div>
          <div className="col-sm-2">&nbsp;</div>
        </div>
        <div className="employerWrapper">
	        {employeeList.map((empl, index) => {
            return <EmployeesListElement key={empl.id}
                     index={index}
                     projectList={projectList}
                     employeeList={employeeList}
                     clientList={clientList}
                     data={empl}
            />
          })}
        </div>
	      <div className="overlay" style={styles}>
	        <div className="loader">
	          <div className="wrap">
	            <div className="loading outer">
		            <div className="loading inner"></div>
	            </div>
	          </div>
	        </div>
	      </div>
      </div>
    )
  }
}

export { EmployeeList }