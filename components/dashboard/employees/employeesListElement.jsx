import React from 'react';

let EmployeesListElement = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },
    render() {
        return(
            <div className="wrapper col-sm-12">
                <div className="employee col-sm-3">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Pracownik</th>
                                <th>id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.data.name}</td>
                                <td>{this.props.data.id}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});

export default EmployeesListElement;