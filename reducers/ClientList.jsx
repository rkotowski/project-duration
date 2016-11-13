import { FETCH_CLIENT_LIST, FETCHED_CLIENT_LIST } from '../actions/clientsActions';

const ClientList = (state = {
	clientList: [],
	fetching: false,
	fetched: false
}, action) => {
	switch (action.type) {
		case FETCH_CLIENT_LIST:
			return {
				...state,
				fetching: true,
				fetched: false,
				clientList: action.payload
			};
		case FETCHED_CLIENT_LIST:
			return {
				...state,
				fetching: false,
				fetched: true
			};
		default:
			return state
	}
};

export { ClientList };