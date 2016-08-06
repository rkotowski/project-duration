import React from 'react';
import Project from './project/index';

let Settings = React.createClass({
    render() {
        return (
            <section>
                <h3>Organizacja projektów</h3>
                <Project />
            </section>
        )
    }
});

export default Settings;