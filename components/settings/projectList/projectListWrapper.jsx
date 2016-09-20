import React from 'react';
import moment from 'moment';
import { getEmployee, getClient } from '../../helper/AppHelper';

let ProjectListWrapper = React.createClass({
    propTypes: {
        // data --> obiekt z projektem
        data: React.PropTypes.object.isRequired,
        employee: React.PropTypes.array.isRequired,
        client: React.PropTypes.array.isRequired
    },

    // TODO: 'Invalid date' w 'każdym' 31 dniu miesiąca.
    // 'Każdy' 31 dzień miesiąca widziany jest jako "invalid date". Google twiedzi że to fakap releasowy momentu.
    // Możliwe, że jest na to jakiś fix, trzeba poszukać i to poprawić.
    countDaysLeft: function () {
        let endDateDayNumber = this.props.data.endDate,
            newEndDate = moment(endDateDayNumber, 'DD-MM-YYYY').format('YYYY-MM-DD').split('-').map(Number),
            curr = moment().format('YYYY-MM-DD').split('-').map(Number);

        let start = moment(curr).locale('pl'),
            end = moment(newEndDate).locale('pl');
        if(end.diff(start, 'hours') < 24) {
            return 'Zakończenie projektu';
        } else {
            return start.from(end, true);
        }
    },
    render() {
        let emplObj = new Object(getEmployee(this.props.data.employe_id, this.props.employee));
        let clientObj = new Object(getClient(this.props.data.client_id, this.props.client));
        
        return(
            <tr>
                <th>{this.props.index + 1}</th>
                <td>{emplObj.name}</td>
                <td>{clientObj.name}</td>
                <td>{this.props.data.startDate}</td>
                <td>{this.props.data.endDate}</td>
                <td>{this.countDaysLeft()}</td>
                <td className="options">
                    <a role="button" disabled="disabled" className="btn btn-default btn-xs editProject">
                        <i className="glyphicon glyphicon-wrench" />
                    </a>
                    <a role="button" onClick={this.onDeleteProject.bind(this, this.props.data)} className="btn btn-default btn-xs deleteProject">
                        <i className="glyphicon glyphicon-trash" />
                    </a>
                </td>
            </tr>
        )
    },
    onDeleteProject(project) {
        this.props.onDeleteProject(project);
    }
});

export default ProjectListWrapper;