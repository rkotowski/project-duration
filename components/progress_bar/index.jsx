import React from 'react';
import moment from 'moment';
import * as _ from 'lodash';

let ProjectProgressBar = React.createClass({
    propTypes: {
        startDate: React.PropTypes.string.isRequired,
        endDate: React.PropTypes.string.isRequired
    },
    dateDiff: function () {
        let startDate = this.props.startDate;
        let endDate = this.props.endDate;

        // tf ~ timeformat
        let tfStartDate = () => {
            let startDateTs = moment(startDate, "DD.MM.YYYY").format('YYYY-MM-DD');
            let arr = _.split(startDateTs, '-');
            return moment(arr);
        };

        let tfEndDate = () => {
            let endDateTs = moment(endDate, "DD.MM.YYYY").format('YYYY-MM-DD');
            let arr = _.split(endDateTs, '-');
            return moment(arr);
        };

        let currentDate = () => {
            let currentDate = moment().format('YYYY-MM-DD');
            let arr = _.split(currentDate, '-');
            return moment(arr);
        };

        let isProjectFinished = () => {
            let endDateTs = moment(endDate, "DD.MM.YYYY").format('YYYY-MM-DD');
            let currentDate = moment().format('YYYY-MM-DD');

            return moment(endDateTs).isSameOrBefore(currentDate, 'day');
        };

        if (tfEndDate().diff(tfStartDate(), 'days') == 0) {
            return 100;
        } else {
            let wholeTimeDiff = tfEndDate().diff(tfStartDate(), 'days');
            let toEnd = tfEndDate().diff(currentDate(), 'days');
            if (wholeTimeDiff < toEnd) {
                return 0;
            } else if (isProjectFinished()) {
                return 100;
            } else {
                return 100 - Math.floor(toEnd*100/wholeTimeDiff);
            }
        }
    },

    render() {
        let progressBarStyles = {
            width: this.dateDiff() + '%'
        };
        let isProjectFinished = () => {
            if (this.dateDiff() == 100) {
                return ' - projekt ukończony';
            } else if (this.dateDiff() == 0) {
                progressBarStyles.width = "100%";
                progressBarStyles.color = '#8a6d3b';
                progressBarStyles.backgroundColor = "#fcf8e3";
                progressBarStyles.borderColor = "#faebcc";
                return ' - wdrożenie jeszcze nie rozpoczęte';
            }
        };
        return (
            <div className="progress">
                <div className="progress-bar" style={progressBarStyles} role="progressbar" aria-valuenow={this.dateDiff()} aria-valuemin="0" aria-valuemax="100">{this.dateDiff()}%{isProjectFinished()}</div>
            </div>
        )
    }
});

export default ProjectProgressBar;