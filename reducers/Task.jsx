import { FETCH_TASK_LIST, FETCHED_TASK_LIST } from '../actions/taskActions';

const TaskList = (state = {
	taskList: [],
	fetching: false,
	fetched: false
}, action) => {
	switch (action.type) {
		case FETCH_TASK_LIST:
			return {
				...state,
				fetching: true,
				fetched: false,
				taskList: action.payload
			};
		case FETCHED_TASK_LIST:
			return {
				...state,
				fetching: false,
				fetched: true
			};
		default:
			return state
	}
};

export { TaskList };