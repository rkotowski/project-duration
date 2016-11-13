import { FETCH_EMPLOYEE_LIST, FETCHED_EMPLOYEE_LIST } from '../actions/employesActions';

const EmployeeList = (state = {
	employeeList: [],
	fetching: false,
	fetched: false
}, action) => {
	switch (action.type) {
		case FETCH_EMPLOYEE_LIST:
			return {
				...state,
				fetching: true,
				fetched: false,
				employeeList: action.payload
			};
		case FETCHED_EMPLOYEE_LIST:
			return {
				...state,
				fetching: false,
				fetched: true
			};
		default:
			return state
	}
};

export { EmployeeList };