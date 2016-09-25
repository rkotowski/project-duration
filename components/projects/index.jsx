import React from 'react';
import Sidebar from './sidebar/index';
import Tasks from './tasks/index';

let Projects = React.createClass({
  getInitialState: function () {
    return {
      loaderStyle: ''
    }
  },
  componentWillMount: function () {
    let that = this;
    firebase.database().ref('employeeList').once('value', function() {
      that.setState({loaderStyle: 'none'})
    });
  },
  render() {
    let loaderStyle = {
      display: this.state.loaderStyle
    };
    return (
      <div className="PageWrapper">
        <h3 className="pageHeading">Projekty</h3>
        <Sidebar />
        <Tasks />

        <div className="overlay" style={loaderStyle}></div>
        <div className="loader" style={loaderStyle}>
          <div className="wrap">
            <div className="loading outer">
              <div className="loading inner"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Projects;