import React from 'react';
import { ProjectList } from './project/list'

let Dashboard = React.createClass({
    render() {
        return(
            <div className="PageWrapper">
                <h3>Strona główna</h3>
                <ProjectList />
            </div>
        )
    }
});

export default Dashboard;