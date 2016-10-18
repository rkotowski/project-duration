// simple helper functions for datepicker
import containedPeriodicValues from 'contained-periodic-values';

module.exports = {
	weekDays(startMoment, endMoment) {
		let start, end;
		let reverse = endMoment.isBefore(startMoment);
		if (reverse) {
			start = endMoment;
			end = startMoment;
		} else {
			start = startMoment;
			end = endMoment;
		}

		const startDay = start.day();
		const totalDays = Math.abs(end.diff(start, 'days'));
		const containedSundays = containedPeriodicValues(startDay, totalDays + startDay, 0, 7);
		const containedSaturdays = containedPeriodicValues(startDay, totalDays + startDay, 6, 7);
		const coefficient = reverse ? -1 : 1;

		return coefficient * (totalDays - (containedSaturdays + containedSundays));
	},

	weekendDays(startMoment, endMoment) {
		const totalDaysDiff = endMoment.diff(startMoment, 'days');
		const weekDays = this.weekDays(startMoment, endMoment);

		return totalDaysDiff - weekDays;
	}

};