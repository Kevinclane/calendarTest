//3rd party
import * as luxon from "../node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

import * as CalendarBuilder from "../builders/CalendarBuilder.js";
import { toOneArray } from "../utilities/HelpfulFunctions.js";

export default class Calendar {

    PrimaryDate; //Luxon DateTime
    TitleCells;
    BodyCellRows;
    BodyCellColumns;
    Events;
    DaysOfTheWeek;
    YAxisLabelNames;

    constructor(primaryDate, events, hourDividend) {
        this.PrimaryDate = primaryDate; //This will likely need to go through another function to properly generate the date given a variety of date formats
        this.Events = events;

        this.DaysOfTheWeek = CalendarBuilder.setDaysOfWeek(primaryDate);

        this.TitleCells = CalendarBuilder.generateTitleCells(this.DaysOfTheWeek, events);

        this.YAxisLabelNames = CalendarBuilder.generateYAxisLabelNames(hourDividend);

        this.BodyCellRows = CalendarBuilder.generateBodyCellRows(events, this.YAxisLabelNames, this.TitleCells);
        this.BodyCellColumns = CalendarBuilder.generateBodyCellColumns(events, this.YAxisLabelNames, this.DaysOfTheWeek);
    };

    getMonthStartDate() {

    };

    getWeekStartDate() {
        // let startOfWeek = DateTime.fromISO(primaryEventDate)
        //     .startOf("week")
        //     .minus(dayMilliseconds);
    };

    buildWeekCalendarToId(id) {
        let template = `<div class="calendar-container">`;

        let i = 0;
        while (i < this.TitleCells.length) {
            template += this.TitleCells[i].BuildCell();
            i++;
        };

        i = 0;
        while (i < this.BodyCellRows.length) {
            let evenOdd = i % 2;
            let row = this.BodyCellRows[i];
            let x = 0;
            while (x < row.length) {
                template += row[x].BuildCell(evenOdd);
                x++;
            };
            i++;
        };

        document.getElementById(id).innerHTML = template + "</div>";

        let oneArrayOfBodyCells = toOneArray(this.BodyCellRows);
        CalendarBuilder.setCallbacks(oneArrayOfBodyCells);
    }

}