/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const DAYS_IN_MONTH = 365 / 12;
const UNIX_EPOCH_START_YEAR = 1970;

const pluralize = (word, counter) => `${word}${counter === 1 ? '' : 's'}`

const prepareDate = (date) => date.split(".");

const prepareDates = (dates) => dates.map((i) => {
    const rawDate = prepareDate(i);
    return new Date([rawDate[1], rawDate[0], rawDate[2]].join('-'));
});

const getDifferences = (startDate, endDate) => {
    const ms = endDate - startDate;
    const days = Math.ceil(ms / MILLISECONDS_IN_DAY);
    const years = new Date(ms).getUTCFullYear() - UNIX_EPOCH_START_YEAR;
    const months = Math.floor(days / DAYS_IN_MONTH);

    return {
        days,
        years: years || undefined,
        months: months <= 0 ? undefined : months,
    };
}

const getResult = (days, months, years) => {
    if (!!years) {
        years = `${years} ${pluralize('year', years)}, `;
    }

    if (!!months) {
        let monthsRemainder = months;

        if (years) {
            monthsRemainder = months % 12;
        }

        if (years !== months * 12) {
            months = monthsRemainder > 0 ? `${monthsRemainder} ${pluralize('month', monthsRemainder)}, ` : '';
        }
    }

    const total = `total ${days} ${pluralize('day', days)}`;

    return`${years || ''}${months || ''}${total}`;
}

// Receive string of dates one after each other
function outputDate(dates) {
    const preparedDates = prepareDates(dates);

    const startRawDate = new Date(preparedDates[0]);
    const endRawDate = new Date(preparedDates[1]);

    const { days, months, years } = getDifferences(startRawDate, endRawDate);

    return getResult(days, months, years);
}
