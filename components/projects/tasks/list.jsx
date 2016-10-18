import React from 'react';

let TaskList = React.createClass({
	render() {
		return(
			<div className="TaskList col-md-5">
				<ul>
					<li>Task 1</li>
					<li>Task 2</li>
					<li>Task 3</li>
					<li>Task 4</li>
				</ul>
			</div>
		)
	}
});

export default TaskList;