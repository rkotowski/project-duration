import React from 'react';

let ProjectProgressBar = React.createClass({
    propTypes: {
        startDate: React.PropTypes.string.isRequired,
        endDate: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div>początek projektu: {this.props.startDate}</div>
        )
    }
});

export default ProjectProgressBar;