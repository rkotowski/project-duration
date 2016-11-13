import React from 'react';
import Sidebar from './sidebar/index';
import Tasks from './tasks/index';
import { connect } from 'react-redux';

import { fetchClientList } from '../../actions/clientsActions';

@connect((store) => {
	return {
		clientList: store.ClientList.clientList,
		loader: store.ClientList.fetched
	}
})

class Projects extends React.Component {
	propTypes: {
		params: React.PropTypes.object.isRequired
	};

  componentWillMount() {
	  this.props.dispatch(fetchClientList());
  }
	
	componentWillUnmount() {
		
	}

  render() {
	  const { clientList, loader, params } = this.props;
	  let styles = {
		  display: loader == false ? 'block' : 'none'
	  };

    return (
      <div className="PageWrapper">
        <h3 className="pageHeading">Projekty</h3>
        <Sidebar clientList={clientList} />
        <Tasks clientList={clientList} params={params} />

        <div className="overlay" style={styles}></div>
        <div className="loader" style={styles}>
          <div className="wrap">
            <div className="loading outer">
              <div className="loading inner"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Projects;