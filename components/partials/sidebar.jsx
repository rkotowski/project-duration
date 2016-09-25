import React from 'react';
import NavLink from './nav_link';

let Sidebar = React.createClass({
    render() {
        return(
            <div className="sidebar-container">
                <ul className="sidebar-nav">
                    <NavLink to='/'>
                        <i className="glyphicon glyphicon-home"></i>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to='projects'>
                        <i className="glyphicon glyphicon-check"></i>
                        <span>Projects</span>
                    </NavLink>
                    <NavLink to="settings">
                        <i className="glyphicon glyphicon-wrench"></i>
                        <span>Settings</span>
                    </NavLink>
                </ul>
            </div>
        )
    }
});

export default Sidebar;