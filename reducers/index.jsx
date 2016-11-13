import React from 'react';
import { combineReducers } from 'redux';
import * as db from '../config/db';
import { ProjectList } from './ProductList';
import { EmployeeList } from './EmployeeList';
import { ClientList } from './ClientList';
import { TaskList } from './Task';

const rootReducer = combineReducers({
	db,
	ProjectList,
	EmployeeList,
	ClientList,
	TaskList
});

export default rootReducer;