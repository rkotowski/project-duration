import React from 'react';
import Employees from './employees/index';

let Settings = React.createClass({
    render() {
        return (
            <section>
                <h3>Organizacja projektów</h3>
                <Employees />
            </section>
        )
    }
});

export default Settings;