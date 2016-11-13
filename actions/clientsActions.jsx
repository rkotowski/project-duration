import firebase from 'firebase';

let ref = firebase.database().ref('clientList');

/*
 * action types
 */

export const FETCH_CLIENT_LIST = 'FETCH_CLIENT_LIST';
export const FETCHED_CLIENT_LIST = 'FETCHED_CLIENT_LIST';

/*
 * action creators
 */

export const fetchClientList = () => {
	return dispatch => {
		ref.once('value', snapshot => {
			let arr = [];
			snapshot.forEach((data) => {
				arr.push(data.val());
			});

			dispatch({
				type: FETCH_CLIENT_LIST,
				fetching: true,
				payload: arr
			})
		}).then(() => {
			dispatch({
				type: FETCHED_CLIENT_LIST,
				fetching: false,
				fetched: true
			})
		})
	}
};

export const detachClientList = () => {
	return () => ref.off('value');
};