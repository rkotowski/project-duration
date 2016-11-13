import firebase from 'firebase';

let ref = firebase.database().ref('taskList');

/*
 * action types
 */

export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const FETCHED_TASK_LIST = 'FETCHED_TASK_LIST';


/*
 * action creators
 */

export const fetchTaskList = () => {
	return dispatch => {
		ref.once('value', snapshot => {
			let arr = [];
			snapshot.forEach((data) => {
				arr.push(data.val());
			});

			dispatch({
				type: FETCH_TASK_LIST,
				fetching: true,
				payload: arr
			})
		}).then(() => {
			dispatch({
				type: FETCHED_TASK_LIST,
				fetching: false,
				fetched: true
			})
		})
	};
};