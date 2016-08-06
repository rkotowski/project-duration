import React from 'react';
import moment from 'moment';

let ProjectListWrapper = React.createClass({
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
        return(
            <tr>
                <th>{this.props.index + 1}</th>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.client}</td>
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