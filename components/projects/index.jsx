import React from 'react';
import Sidebar from './sidebar/index';
import Tasks from './tasks/index';
import firebase from 'firebase';

let Projects = React.createClass({
  getInitialState: function () {
    return {
      loaderStyle: '',
      clientList: []
    }
  },
  componentWillMount: function () {
    let that = this;
    firebase.database().ref('employeeList').once('value', function() {
      that.setState({loaderStyle: 'none'})
    });

	  firebase.database().ref('clientList').on('value', function (snapshot) {
		  let clientList = [];
		  snapshot.forEach(function (data) {
			  let client = {
				  id: data.val().id,
				  name: data.val().name
			  };
			  clientList.push(client);
			  that.setState({clientList: clientList});
		  })
	  });
  },

	componentWillUnmount: function () {
		firebase.database().ref('employeeList').off('value');
		firebase.database().ref('clientList').off('value');
	},

  render() {
    let loaderStyle = {
      display: this.state.loaderStyle
    };
    return (
      <div className="PageWrapper">
        <h3 className="pageHeading">Projekty</h3>
        <Sidebar clientList={this.state.clientList} />
        <Tasks clientList={this.state.clientList} params={this.props.params} />

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