import React from 'react';
import ProjectLink from './project_link';

let ProjectList = React.createClass({
	propTypes: {
		clientList: React.PropTypes.array.isRequired
	},

	render() {
		const { clientList } = this.props;
		return(
			<ul>
				{clientList.map((client) => {
					return <ProjectLink to={`/projects/${client.id}`} key={client.id}>
						{client.name}
					</ProjectLink>
				})}
			</ul>
		)
	}
});

export default ProjectList;