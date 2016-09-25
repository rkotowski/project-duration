import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import Header from './partials/header';
import Sidebar from './partials/sidebar';
// import Footer from './partials/footer';
import Dashboard from './dashboard/index';
import Settings from './settings/index';
import Projects from './projects/index';

require('../config/db');

let App = React.createClass({
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="sidebar-wrapper">
                    <Sidebar />
                </div>
                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

render((
   <Router>
       <Route path="/" component={App}>
           <IndexRoute component={Dashboard}/>
           <Route path="settings" component={Settings}/>
           <Route path="projects" component={Projects}/>
       </Route>
   </Router>
), document.getElementById('app'));