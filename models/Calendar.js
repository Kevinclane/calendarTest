//3rd party
import * as luxon from "../node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

//internal
import {
    millFromSeconds,
    millFromMinutes,
    millFromHours,
    millFromDays,
    millFromWeeks,
} from "../calculators/MillisecondCalculator.js";

export default class Calendar {
    
    PrimaryDate; //Luxon DateTime
    TitleCells;
    BodyCells;
    Events;

    constructor(primaryDate, events) {
        this.PrimaryDate = primaryDate; //This will likely need to go through another function to properly generate the date given a variety of date formats
        this.Events = events;
        //Cells will likely need to be set via another function call
        //this.Cells = cells;
    };

    //Is this redundant?
    addCells(cells) {
        this.BodyCells.push(cells);
    };

    getMonthStartDate() {

    }

    getWeekStartDate() {
        let startOfWeek = DateTime.fromISO(primaryEventDate)
        .startOf("week")
        .minus(dayMilliseconds);
    }
    

}