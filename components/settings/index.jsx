import React from 'react';
import Project from './project/index';

let Settings = React.createClass({
    render() {
        return (
            <div className="PageWrapper">
                <h3 className="pageHeading">Organizacja projektów</h3>
                <Project />
            </div>
        )
    }
});

export default Settings;