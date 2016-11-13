import firebase from 'firebase';

let ref = firebase.database().ref('projectList');

/*
 * action types
 */

export const FETCH_PROJECT_LIST = 'FETCH_PROJECT_LIST';
export const FETCHED_PROJECT_LIST = 'FETCHED_PROJECT_LIST';


/*
 * action creators
 */

export const fetchProjectList = () => {
	return dispatch => {
		ref.once('value', snapshot => {
			let arr = [];
			snapshot.forEach((data) => {
				arr.push(data.val());
			});

			dispatch({
				type: FETCH_PROJECT_LIST,
				fetching: true,
				payload: arr
			})
		}).then(() => {
			dispatch({
				type: FETCHED_PROJECT_LIST,
				fetching: false,
				fetched: true
			})
		})
	};
};

export const detachProjectList = () => {
	return () => ref.off('value');
};