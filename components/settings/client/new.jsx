import React from 'react';
import _ from 'lodash';

let idCounter = 0;
let NewClient = React.createClass({
    propTypes: {
        clientList: React.PropTypes.array.isRequired
    },
    render() {
        // check for array length; if elements not exists initial count value will be set to 0
        if (this.props.clientList.length) {
            let lastEl = _.last(this.props.clientList);
            idCounter = lastEl.id;
        }
        return(
            <form onSubmit={this.saveClient} className="form-horizontal col-sm-6">
                <div className="form-group">
                    <label htmlFor="inptNewClient" className="col-sm-4 control-label">Projekt</label>
                    <div className="col-sm-8">
                        <input required type="text" ref="clientNameInpt" className="form-control" id="inptNewClient" placeholder="Projekt"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-4 control-label">&nbsp;</label>
                    <div className="col-sm-8">
                        <button type="submit" className="btn btn-default">Dodaj</button>
                    </div>
                </div>
            </form>
        )
    },

    saveClient: function(e) {
        e.preventDefault();
        let name = this.refs.clientNameInpt.value.trim();

        function uniqueId() {
            let counter = idCounter;
            return ++counter;
        }
        
        let newClient = {
            id: uniqueId(),
            name: name
        };
        
        this.props.onClientAdd(
            newClient.id,
            newClient.name
        );

        this.refs.clientNameInpt.value = '';
    }
});

export { NewClient };