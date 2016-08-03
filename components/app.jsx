import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import Header from './partials/header';
// import Footer from './partials/footer';
import Dashboard from './dashboard/index';
import Settings from './settings/index';
require('~/config/db');

let App = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header />
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
       </Route>
   </Router>
), document.getElementById('app'));