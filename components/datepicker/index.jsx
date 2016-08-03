import React from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

let ProjectDuration = React.createClass({
    displayName: 'ProjectDuration',

    getInitialState: function() {
        return {
            startDate: Moment(),
            endDate: Moment()
        };
    },

    handleChangeStartDate: function(date) {
        this.setState({
            startDate: date
        });
    },

    handleChangeEndDate: function(date) {
        this.setState({
            endDate: date
        });
    },

    render: function() {
        return(
            <div>
                <div className="dateWrapper col-sm-5">
                    <DatePicker
                        selected={this.state.startDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStartDate}
                        dateFormat="DD.MM.YYYY"
                        placeholderText="Data początkowa"
                        className="form-control"
                        locale='pl' />
                </div>
                <span className="dash col-sm-2">&ndash;</span>
                <div className="dateWrapper col-sm-5">
                    <DatePicker
                        selected={this.state.endDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        onChange={this.handleChangeEndDate}
                        dateFormat="DD.MM.YYYY"
                        placeholderText="Data końcowa"
                        className="form-control"
                        locale='pl' />
                </div>
            </div>
        )
    }
});

export default ProjectDuration;