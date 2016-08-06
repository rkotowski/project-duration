import React from 'react';

let NewClient = React.createClass({
    render() {
        return(
            <form onSubmit={this.saveClient} className="form-horizontal col-sm-6">
                <div className="form-group">
                    <label htmlFor="inptNewClient" className="col-sm-3 control-label">Projekt</label>
                    <div className="col-sm-9">
                        <input required type="text" ref="clientNameInpt" className="form-control" id="inptNewClient" placeholder="Projekt"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">&nbsp;</label>
                    <div className="col-sm-9">
                        <button type="submit" className="btn btn-default">Dodaj</button>
                    </div>
                </div>
            </form>
        )
    },

    saveClient: function(e) {
        e.preventDefault();
        let name = this.refs.clientNameInpt.value.trim();

        if (name) {
            console.log("Dodano projekt : " + name);
        }
        this.props.onClientAdd(name);
        this.refs.clientNameInpt.value = '';
    }
});

export { NewClient };