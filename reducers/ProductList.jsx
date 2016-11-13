import { FETCH_PROJECT_LIST, FETCHED_PROJECT_LIST } from '../actions/projectsActions';

const ProjectList = (state = {
	projectList: [],
	fetching: false,
	fetched: false
}, action) => {
	switch (action.type) {
		case FETCH_PROJECT_LIST:
			return {
				...state,
				fetching: true,
				fetched: false,
				projectList: action.payload
			};
		case FETCHED_PROJECT_LIST:
			return {
				...state,
				fetching: false,
				fetched: true
			};
		default:
			return state
	}
};

export { ProjectList };