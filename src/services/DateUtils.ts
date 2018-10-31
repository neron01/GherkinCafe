export const DateUtils = {
    formatDigit (n: number): string {
        return ('0' + n).slice(-2);
    },
    formatDate (date: Date): string {
        return this.formatDigit(date.getDate()) + '.' + this.formatDigit(date.getMonth() + 1) +
            ' ' + this.formatDigit(date.getHours()) + ':' + this.formatDigit(date.getMinutes());
    },
    formatFull (d: string): string {
        const date = new Date(d);
        return date.getFullYear() + '-' + this.formatDigit(date.getMonth() + 1)
            + '-' + this.formatDigit(date.getDate()) +
            ' ' + this.formatDigit(date.getHours()) + ':' + this.formatDigit(date.getMinutes());
    },
    workingMinutesBetweenDates (startDate: Date, endDate: Date) {
        // Store minutes worked
        let minutesWorked = 0;

        // Validate input
        if (endDate < startDate) { return 0; }

        // Loop from your Start to End dates (by hour)
        const current = startDate;

        // Define work range
        const workHoursStart = 9;
        const workHoursEnd = 18;
        const includeWeekends = false;

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
