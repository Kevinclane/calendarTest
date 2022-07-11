import * as luxon from "../node_modules/luxon/build/es6/luxon.js";
import uuidv4 from "../../node_modules/uuid/dist/esm-browser/v4.js"


export default class CalendarEvent {
  Id = uuidv4();
  Name;
  Description;
  Color;
  StartTime;
  EndTime;
  Interval;
  Callback;

  constructor(name, description, color, startTime, endTime, callback) {
    this.Name = name;
    this.Description = description;
    this.Color = color;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.Interval = luxon.Interval.fromDateTimes(startTime, endTime.minus({ millisecond: 1 }))
    this.Callback = callback;
  }


}