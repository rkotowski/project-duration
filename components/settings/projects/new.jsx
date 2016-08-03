import React from 'react';

let NewProject = React.createClass({
    render() {
        return(
            <form onSubmit={this.saveProject} className="form-horizontal col-sm-6">
                <div className="form-group">
                    <label htmlFor="inptNewProject" className="col-sm-3 control-label">Projekt</label>
                    <div className="col-sm-9">
                        <input required type="text" ref="projectInpt" className="form-control" id="inptNewProject" placeholder="Projekt"/>
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

    saveProject: function(e) {
        e.preventDefault();
        let tx = this.refs.projectInpt.value.trim();

        if(!tx) {
            console.log("Wpisz cos")
        } else {
            console.log("Dodano projekt : " + tx);
        }
        this.props.onProjectAdd(tx);
        this.refs.projectInpt.value = '';
    }
});

export { NewProject };