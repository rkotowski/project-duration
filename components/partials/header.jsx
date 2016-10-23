import React from 'react';
import moment from 'moment';

let Header = React.createClass({
   getInitialState: function () {
        return {
            time: moment().locale('pl').format("DD MMMM YYYY, [godzina] HH:mm:ss")
        }
   },
   componentDidMount: function () {
       setInterval(function() {
           this.setState({
               time: moment().locale('pl').format("DD MMMM YYYY, [godzina] HH:mm:ss")
           });
       }.bind(this), 1000);
   },
   render() {
       return(
           <header className="header">
               <nav className="navbar navbar-default">
                   <div className="navbar-header">
                       <div className="navbar-brand">Frontend <span className="burger">&nbsp;</span></div>
                   </div>
                   <div className="date-info">
                       <div className="date-wrapper">
                           <i className="fa fa-calendar"/> Dzisiaj mamy: {this.state.time}
                       </div>
                   </div>
               </nav>
           </header>
       )
   }
});

export default Header;