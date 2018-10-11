export default {
    formatDigit (number) {
        return ('0' + number).slice(-2);
    },
    formatDate (date) {
        return this.formatDigit(date.getDate()) + '.' + this.formatDigit(date.getMonth() + 1) +
            ' ' + this.formatDigit(date.getHours()) + ':' + this.formatDigit(date.getMinutes());
    },
    formatFull (d) {
        const date = new Date(d);
        return date.getFullYear() + '-' + this.formatDigit(date.getMonth() + 1) + '-' + this.formatDigit(date.getDate()) +
            ' ' + this.formatDigit(date.getHours()) + ':' + this.formatDigit(date.getMinutes());
    },
    workingMinutesBetweenDates (startDate, endDate) {
        // Store minutes worked
        let minutesWorked = 0;

        // Validate input
        if (endDate < startDate) { return 0; }

        // Loop from your Start to End dates (by hour)
        let current = startDate;

        // Define work range
        let workHoursStart = 9;
        let workHoursEnd = 18;
        let includeWeekends = false;

        // Loop while currentDate is less than end Date (by minutes)
        while (current.getTime() <= endDate.getTime()) {
            // Is the current time within a work day (and if it
            // occurs on a weekend or not)
            if (current.getHours() >= workHoursStart &&
                current.getHours() < workHoursEnd &&
                (includeWeekends ? current.getDay() !== 0 && current.getDay() !== 6 : true)) {
                minutesWorked++;
            }

            // Increment current time
            current.setTime(current.getTime() + 1000 * 60);
        }

        // Return the number of hours
        return minutesWorked;
    }
};
