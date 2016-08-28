import React from 'react';

let EmployeesListElement = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },
    render() {
        return(
            <div className="listElement">
                <div className="col-sm-2">Pracownik</div>
                <div className="col-sm-8">{this.props.data.name}</div>
                <div className="col-sm-2">{this.props.data.id}</div>
            </div>
        )
    }
});

export default EmployeesListElement;