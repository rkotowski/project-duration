import firebase from 'firebase';

let ref = firebase.database().ref('employeeList');

/*
 * action types
 */

export const FETCH_EMPLOYEE_LIST = 'FETCH_EMPLOYEE_LIST';
export const FETCHED_EMPLOYEE_LIST = 'FETCHED_EMPLOYEE_LIST';

/*
 * action creators
 */

export const fetchEmployeeList = () => {
	return dispatch => {
		ref.once('value', snapshot => {
			let arr = [];
			snapshot.forEach((data) => {
				arr.push(data.val());
			});

			dispatch({
				type: FETCH_EMPLOYEE_LIST,
				fetching: true,
				payload: arr
			});
		}).then(() => {
			dispatch({
				type: FETCHED_EMPLOYEE_LIST,
				fetching: false,
				fetched: true
			});
		})
	}
};

export const detachEmployeeList = () => {
	return () => ref.off('value');
};