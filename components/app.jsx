import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';

import Header from './partials/header';
import Sidebar from './partials/sidebar';
// import Footer from './partials/footer';
import Dashboard from './dashboard/index';
import Settings from './settings/index';
import Projects from './projects/index';
import Tasks from './projects/tasks/index';

import { applyMiddleware, createStore } from 'redux';

const middleware = applyMiddleware(thunk, logger());
let store = createStore(rootReducer, middleware);

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
   <Provider store={store}>
	   <Router>
		   <Route path="/" component={App}>
			   <IndexRoute component={Dashboard}/>
			   <Route path="settings" component={Settings}/>
			   <Route path="projects" component={Projects}>
				   <Route path="/projects/:projectId" component={Tasks} />
			   </Route>
		   </Route>
	   </Router>
   </Provider>
), document.getElementById('app'));