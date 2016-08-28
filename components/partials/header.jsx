import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

let Header = React.createClass({
   render() {
       return(
           <header className="header">
               <nav className="navbar navbar-default">
                   <div className="navbar-header">
                       <div className="navbar-brand">Frontend disposition</div>
                       <a className="dropdown-toggle mobile-menu" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                           Menu <span className="caret"></span>
                       </a>
                       <ul className="dropdown-menu">
                           <li className="btn-default btn-link"><Link to="/">Home</Link></li>
                           <li className="btn-default btn-link"><Link to="/settings">Settings</Link></li>
                       </ul>
                  </div>
                  <div className="collapse navbar-collapse" id="navigation">
                      <ul className="nav navbar-nav">
                          <li className="btn-default btn-link"><Link to="/">Home</Link></li>
                          <li className="btn-default btn-link"><Link to="/settings">Settings</Link></li>
                      </ul>
                  </div>
               </nav>
           </header>
       )
   }
});

export default Header;